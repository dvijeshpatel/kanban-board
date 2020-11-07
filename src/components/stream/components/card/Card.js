import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import './card.css';

const cardActions = {
  OPEN_CARD_EDITOR: 'OPEN_CARD_EDITOR',
  ON_CHANGE_CARD: 'ON_CHANGE_CARD',
  ON_DELETE_CARD: 'ON_DELETE_CARD',
}

const Card = props => {
  const { card, onAction } = props;

  const { description, date, assignee } = card;

  const handleOpenCardEditor = useCallback(() => {
    onAction({ type: 'OPEN_CARD_MODAL', payload: { card, mode: 'EDIT' } });
  },[card, onAction]);


  return <div className="card" onDoubleClick={handleOpenCardEditor}>
    <div className="description">{description}</div>
    <div className="date">{`DueDate: ${date}`}</div>
    <div className="assignee">{`Assigne: ${assignee}`}</div>
  </div>;
};

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string,
    streamId: PropTypes.string,
    assignee: PropTypes.string,
  }),
  onAction: PropTypes.func,
};

export { cardActions};

export default Card;