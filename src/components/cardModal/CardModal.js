import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import Modal from '@material-ui/core/Modal';

import _noop from 'lodash/noop';
import _map from 'lodash/map';

import './cardModal.css';
import CloseIcon from "@material-ui/icons/Close";

import { STREAM_CONFIGS, MEMBERS } from '../../constants';


export const MODES = {
    CREATE: 'CREATE',
    EDIT: 'EDIT',
};

export const cardCreatorDialogActions = {
    CLOSE_CARD_CREATOR: 'CLOSE_CARD_CREATOR',
    ON_SUBMIT: 'ON_SUBMIT',
};

const CardModal = props => {
    const { open, mode, card, onAction } = props;


    const [state, updateState] = useState({
        id: card.id,
        description:card.description,
        date: card.date,
        streamId: card.streamId ||  STREAM_CONFIGS?.[0]?.id,
        assignee: card.assignee || MEMBERS?.[0]?.id,
    });

    const  { description, date, streamId, assignee } = state;

    const updateDescription = useCallback(event => {
        const newDescription = event.currentTarget.value;
        updateState(prevState => ({ ...prevState, description: newDescription}));
    },[])

    const updateDate = useCallback(event => {
        const newDate = event.currentTarget.value;
        updateState(prevState => ({ ...prevState, date: newDate}));
    },[])

    const updateStatus = useCallback(event => {
        const newStatus= event.currentTarget.value;
        updateState(prevState => ({ ...prevState, streamId: newStatus}));
    },[]);

    const updateAssignee= useCallback(event => {
        const newStatus= event.currentTarget.value;
        updateState(prevState => ({ ...prevState, assignee: newStatus}));
    },[]);

    const handleCloseCardCreator = useCallback(() => {
        onAction({ type: cardCreatorDialogActions.CLOSE_CARD_CREATOR});
    },[onAction]);

    const handleSubmit = useCallback(() => {
        onAction({ type: cardCreatorDialogActions.CLOSE_CARD_CREATOR});
        onAction({ type: cardCreatorDialogActions.ON_SUBMIT, payload: { card: mode === MODES.CREATE ? {...state, id: uniqid() }:state , mode }});
    }, [mode, state, onAction]);


    return (<Modal
        open={true}
        onClose={_noop}
        className="modalContainer"
    >
        <div className="cardContainer">
            <div className="cardCreatorDialog">
                <textarea className="cardCreatorDialog__content" placeholder="Please Enter Description.."  value={description} onChange={updateDescription}/>
                <input type="date" className="cardCreatorDialog__dateInput" value={date} onChange={updateDate}/>
                <div>Status: <select className="cardCreatorDialog__statusInput" value={streamId} onChange={updateStatus}>
                    {_map(STREAM_CONFIGS, stream => <option key={stream.id} value={stream.id}>{stream.name}</option>)}
                </select>
                </div>
                <div>Assignee: <select className="cardCreatorDialog__assigneeInput" value={assignee} onChange={updateAssignee}>
                    {_map(MEMBERS, member => <option key={member.id} value={member.id}>{member.name}</option>)}
                </select>
                </div>

                <div className="cardCreatorDialog__footer">
                    <button className="cardCreatorDialog__submit" onClick={handleSubmit} > {'Save'}</button>
                    <CloseIcon className="cardCreatorDialog__close" fontSize="large" onClick={handleCloseCardCreator}/>
                </div>
            </div>
        </div>
    </Modal>);
}

CardModal.propTypes = {
    open: PropTypes.bool,
    mode: PropTypes.string,
    card: PropTypes.shape({ id: PropTypes.string,description: PropTypes.string,streamId: PropTypes.string, assignee: PropTypes.string, }),
    onAction: PropTypes.func,
};

CardModal.defaultProps = {
    open: false,
    mode: MODES.CREATE,
    card: {},
}

export default CardModal;
