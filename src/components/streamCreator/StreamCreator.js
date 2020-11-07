import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import AddIcon from "@material-ui/icons/Add";

import './streamCreator.css';

import StreamCreatorDialog, { streamCreatorDialogActions } from './StreamCreatorDialog';

const streamCreatorActions = {
  OPEN_STREAM_CREATOR: 'OPEN_STREAM_CREATOR',
  ADD_STREAM: 'ADD_STREAM',
}

const StreamCreator = props => {
  const { onAction } = props;

  const [isStreamCreatorDialogOpen, setIsStreamCreatorDialogOpen] = useState(false);

  const handleAction = useCallback(action => {
    const { type, payload } = action;
    switch(type) {
      case streamCreatorDialogActions.CLOSE_STREAM_CREATOR: {
        setIsStreamCreatorDialogOpen(false);
        break;
      }
      case streamCreatorDialogActions.ADD_STREAM: {
        onAction({ type: streamCreatorActions.ADD_STREAM, payload: { name: payload.name }});
        break;
      }
      case streamCreatorActions.OPEN_STREAM_CREATOR: {
        setIsStreamCreatorDialogOpen(true);
        break;
      }
    }

  },[onAction]);

  const handleOpenStreamCreator = useCallback(() => {
    handleAction({ type: streamCreatorActions.OPEN_STREAM_CREATOR });
  },[])

  if(isStreamCreatorDialogOpen) {
    return <StreamCreatorDialog onAction={handleAction}/>
  }

  return   <div className="streamCreator" onClick={handleOpenStreamCreator}>
    <AddIcon fontSize="large"/>
    <div className="streamCreator__label">Add another List</div>
  </div>
};

StreamCreator.propTypes = {
  onAction: PropTypes.func,
}

export { streamCreatorActions };

export default StreamCreator;