import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _reduce from 'lodash/reduce';

import DroppableWrapper from '../../baseComponents/DroppableWrapper';
import DraggableWrapper from '../../baseComponents/DraggableItemWrapper';
import Card, { cardActions }  from './components/card';
import CardCreator, { cardCreatorActions } from './components/cardCreator';

import './stream.css';

const streamActions = {
  ON_CARDS_CHANGE: 'ON_CARDS_CHANGE',
}

const Stream = props => {
  const { stream, cards, onAction } = props;
  const { id : streamId , name  } = stream;

  const handleAction = useCallback(action => {
    const { type, payload } = action;
    switch(type) {
      case cardCreatorActions.ADD_CARD: {
        const id = uniqid();
        const newCards = [...cards,  { id,  content: payload.content }]
        onAction({ type: streamActions.ON_CARDS_CHANGE, payload: { streamId, cards: newCards }});
        break;
      };
      case cardActions.ON_CHANGE_CARD: {
        const { id } = payload;
        const newCards = _reduce(cards, (accum, card) => {
            if(card.id ===id) {
              accum.push(payload);
              return accum;
            }
            accum.push(card);
            return accum;
          },[])
        onAction({ type: streamActions.ON_CARDS_CHANGE, payload: { streamId, cards: newCards }});
        break;
      }
      case cardActions.ON_DELETE_CARD: {
        const { id } = payload;
        const newCards = _filter(cards, card => card.id!== id);
        onAction({ type: streamActions.ON_CARDS_CHANGE, payload: { streamId, cards: newCards }});
        break;
      };
    };
  }, [streamId, cards, onAction]);

  const cardsNode = _map(cards, (card, index) => <DraggableWrapper draggableId={card.id} index={index} key={card.id}><Card {...card} onAction={handleAction}/></DraggableWrapper>);

  return (<div className="stream">
    <div className='streamHeader'> <div className="streamHeaderContent">{name}</div></div>
    <DroppableWrapper droppableId={streamId} className="streamContent">
      {cardsNode}
    </DroppableWrapper>
    <CardCreator onAction={handleAction}/>
  </div>);
}

Stream.propTypes = {
  stream: PropTypes.object,
  cards: PropTypes.array,
  onAction: PropTypes.func,
};

Stream.defaultProps = {
  stream: {},
  cards: [],
};

export { streamActions };

export default Stream;