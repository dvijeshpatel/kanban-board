import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import _map from 'lodash/map';

import Card   from './components/card';
import CardCreator from './components/cardCreator';

import './stream.css';


const Stream = props => {
  const { stream, cards, onAction } = props;
  const { id : streamId , name  } = stream;

  const handleAction = useCallback(action => {
    const { type, payload } = action;
    switch(type) {
      case 'OPEN_CARD_MODAL': {
        onAction({ type, payload: { ...payload, card: { streamId }}});
        break;
      }
    };
  }, [streamId, cards, onAction]);

  const cardsNode = _map(cards, (card, index) => <Card card={card} key={index} onAction={handleAction}/>);

  return (<div className="stream">
    <div className='streamHeader'> <div className="streamHeaderContent">{name}</div></div>
      {cardsNode}
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


export default Stream;