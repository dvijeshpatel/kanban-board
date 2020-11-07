import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import CardCreatorDialog, { cardCreatorDialogActions, MODES } from '../cardCreatorDailog';
import './card.css';

const cardActions = {
  OPEN_CARD_EDITOR: 'OPEN_CARD_EDITOR',
  ON_CHANGE_CARD: 'ON_CHANGE_CARD',
  ON_DELETE_CARD: 'ON_DELETE_CARD',
}

const Card = props => {
  const { id, content, onAction } = props;
  const [ isCardEditorOpen, setIsCardEditorOpen ] = useState(false);

  const handleAction = useCallback(action => {
    const { type, payload } = action;
    switch(type) {
      case cardCreatorDialogActions.CLOSE_CARD_CREATOR: {
        setIsCardEditorOpen(false);
        break;
      }
      case cardCreatorDialogActions.ON_SUBMIT: {
        onAction({ type: cardActions.ON_CHANGE_CARD, payload: { id, content: payload.content }});
        break;
      }
      case cardActions.OPEN_CARD_EDITOR: {
        setIsCardEditorOpen(true);
        break;
      }
      case cardActions.ON_DELETE_CARD: {
        onAction({ type: cardActions.ON_DELETE_CARD, payload: { id }});
        break;
      }
    }

  },[onAction]);

  const handleOpenCardEditor = useCallback(() => {
    handleAction({ type: cardActions.OPEN_CARD_EDITOR });
  },[handleAction]);

  const handleDeleteCard = useCallback(() => {
    handleAction({ type: cardActions.ON_DELETE_CARD });
  },[handleAction]);

  if(isCardEditorOpen) {
    return <CardCreatorDialog mode={MODES.EDIT} content={content} onAction={handleAction} />;
  }
  return <div className="card">
    {content}
    <div className="cardActions">
      <EditOutlinedIcon classes={{ root: 'cardAction'}} onClick={handleOpenCardEditor}/>
      <DeleteOutlinedIcon classes={{ root: 'cardAction'}} onClick={handleDeleteCard}/>
    </div>
  </div>;
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string,
  onAction: PropTypes.func,
};

export { cardActions};

export default Card;