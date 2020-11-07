import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';


import _map from 'lodash/map';
import _filter from 'lodash/filter';

import Stream  from './components/stream';
import CardModal, { cardCreatorDialogActions } from './components/cardModal';

import { STREAM_CONFIGS, MEMBERS } from './constants';

import './dashboard.css';

const DEFAULT_STATE = { cards: []};


const getCardsFromStream = (cards, stream) => {
  return _filter(cards, card => card.streamId === stream.id);
}

const Dashboard = props => {
  const { state: initialState, updateState }  = props;
  const [cardModalState, setCardModalState] = useState({ isOpen: false, card: {}});
  const [ state, setState ] = useState(initialState);

  const { cards } = state;

  useEffect(() => {
    updateState(state);
  }, [state, updateState]);

  const handleAction = useCallback(action => {
    const { type, payload } = action;
    switch (type) {
      case cardCreatorDialogActions.CLOSE_CARD_CREATOR: {
        setCardModalState({ ...cardModalState, isOpen: false, card: {}});
        break;
      };
      case cardCreatorDialogActions.ON_SUBMIT: {
        const { card, mode } = payload;
        if(mode === 'CREATE') {
          setState(prevState => {
            return ({
              ...prevState,
              cards: [...prevState?.cards, card],
            })
          })
          break;
        }
        if(mode === 'EDIT') {
          setState(prevState => {
            const newCards = _map(prevState?.cards, prevCard => {
              if(prevCard?.id === card.id) {
                return card;
              }
              return prevCard;
            });
            return ({
              ...prevState,
              cards: newCards,
            })
          })
          break;
        }
      };
      case 'OPEN_CARD_MODAL': {
        setCardModalState({ isOpen: true, card: payload?.card, mode: payload?.mode })
      }

    }
  }, []);


  const streams = _map(STREAM_CONFIGS,stream => <Stream key={stream.id} stream={stream} cards={getCardsFromStream(cards, stream)} onAction={handleAction}/>);

  return <div className="dashboard">
    <div className="dashboardHeader">
      <div className="headerTitle">Task Board</div>
      <div className="memberList">{`Members: ${MEMBERS.map(member => member.name).join(', ')}`}</div>
    </div>
    <div className="streamWorkspace">{streams}</div>
    {cardModalState.isOpen ? <CardModal mode={cardModalState.mode} card={cardModalState.card} onAction={handleAction} open/> : null }
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