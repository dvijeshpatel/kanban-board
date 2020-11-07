import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import CloseIcon from "@material-ui/icons/Close";

const streamCreatorDialogActions = {
  CLOSE_STREAM_CREATOR: 'CLOSE_STREAM_CREATOR',
  ADD_STREAM: 'ADD_STREAM',
};

const StreamCreatorDialog = props => {
  const {  onAction } = props;
  const [name, setName ] = useState('');

  const handleCloseStreamCreator = useCallback(() => {
    onAction({ type: streamCreatorDialogActions.CLOSE_STREAM_CREATOR});
  },[onAction]);

  const handleAddStream = useCallback(() => {
    onAction({ type: streamCreatorDialogActions.CLOSE_STREAM_CREATOR});
    onAction({ type: streamCreatorDialogActions.ADD_STREAM, payload: { name }});
  }, [name, onAction]);

  const handleChange = useCallback(event => {
    setName(event.currentTarget.value);
  },[]);


  return <div className="streamCreatorDialog">
    <input className="streamCreatorDialog__content" placeholder="Please Enter Name..." value={name} onChange={handleChange}/>
    <div className="streamCreatorDialog__footer">
      <button className="streamCreatorDialog__submit" onClick={handleAddStream}> Add List</button>
      <CloseIcon className="streamCreatorDialog__close" fontSize="large" onClick={handleCloseStreamCreator} />
    </div>
  </div>;
};

StreamCreatorDialog.propTypes = {
  onAction: PropTypes.func,
};

export { streamCreatorDialogActions };

export default StreamCreatorDialog;