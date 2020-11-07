import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';

import './cardCreatorDailog.css';

const cardCreatorDialogActions = {
  CLOSE_CARD_CREATOR: 'CLOSE_CARD_CREATOR',
  ON_SUBMIT: 'ON_SUBMIT',
};

const MODES = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
};

const CardCreatorDialog = props => {
  const {  mode, content, onAction } = props;
  const [textContent, setTextContent] = useState(content);
  const handleCloseCardCreator = useCallback(() => {
    onAction({ type: cardCreatorDialogActions.CLOSE_CARD_CREATOR});
  },[onAction]);
  const handleSubmit = useCallback(() => {
    onAction({ type: cardCreatorDialogActions.CLOSE_CARD_CREATOR});
    onAction({ type: cardCreatorDialogActions.ON_SUBMIT, payload: { content: textContent }});
  }, [textContent, onAction]);

  const handleChange = useCallback(event => {
    setTextContent(event.currentTarget.value);
  },[]);

  return <div className="cardCreatorDialog">
    <textarea className="cardCreatorDialog__content" placeholder="Please Enter Description.." value={textContent} onChange={handleChange}/>
    <div className="cardCreatorDialog__footer">
      <button className="cardCreatorDialog__submit" onClick={handleSubmit}> { mode === MODES.CREATE ? 'Add Card' : 'Save'}</button>
      <CloseIcon className="cardCreatorDialog__close" fontSize="large" onClick={handleCloseCardCreator}/>
     </div>
    </div>;
};

CardCreatorDialog.propType = {
  content: PropTypes.string,
  onAction: PropTypes.func,
  mode: PropTypes.string,
};

CardCreatorDialog.defaultProps = {
  mode: MODES.CREATE,
};

export { MODES };
export { cardCreatorDialogActions };

export default CardCreatorDialog;