import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import _get from 'lodash/get';
import _map from 'lodash/map';
import _keyBy from 'lodash/keyBy';

import { streamCreatorActions } from './components/streamCreator';
import Stream, { streamActions }   from './components/stream';

import './dashboard.css';

const DEFAULT_STATE = {
  streamsById: {},
  cardsById: {},
  streamOrder: [],
}

const STREAM_CONFIGS = [{ id: 'planned', label: 'Planned'}, { id: 'started', label: 'Started'},{ id: 'done', label: 'Done'}];

const Dashboard = props => {
  const { state: initialState, updateState }  = props;
  const [ state, setState ] = useState(initialState);

  useEffect(() => {
    updateState(state);
  }, [state, updateState]);

  const handleAction = useCallback(action => {
    const { type, payload } = action;
    switch (type) {
      case streamActions.ON_CARDS_CHANGE: {
        setState(prevState => {
          const { streamId, cards } = payload;
          const cardIds = _map(cards, 'id');
          const cardsById = _keyBy(cards, 'id');
          return {
            ...prevState,
            streamsById: {
              ..._get(prevState, 'streamsById'),
              [streamId]: {
                ..._get(prevState, `streamsById.${streamId}`),
                cardIds,
              }
            },
            cardsById: {
              ..._get(prevState, 'cardsById'),
              ...cardsById,
            }
          }
        });
        break;
      }
      case streamCreatorActions.ADD_STREAM: {
        const { name } =payload;
        const id = uniqid();
        setState( prevState => ({
          ...prevState,
          streamsById: {
            ..._get(prevState, 'streamsById'),
            [id]: { id, name,  cardsById: {} },
          },
          streamOrder: [..._get(prevState, 'streamOrder',[]), id],
        }));
        break;
      }
    }
  }, []);

  const streams = _map(state.streamOrder,streamId => {
    const stream = _get(state, `streamsById.${streamId}`, {});
    const cards = _map(stream.cardIds, cardId => _get(state,`cardsById.${cardId}`));
    return  <Stream key={stream.id} stream={stream} cards={cards} onAction={handleAction}/>
  });
  return <div className="dashboard">
    {streams}
  </div>
};

Dashboard.propTypes = {
  state: PropTypes.object,
  updateState: PropTypes.func,
}
Dashboard.defaultProps = {
  state: DEFAULT_STATE,
}

export default Dashboard;