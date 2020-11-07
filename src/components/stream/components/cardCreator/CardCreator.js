import React, { useCallback } from "react";
import PropTypes from 'prop-types';
import AddIcon from "@material-ui/icons/Add";

import './cardCreator.css';

const CardCreator = props => {
  const { onAction } = props;
  const handleOpenCardCreator = useCallback(() => {
    onAction({ type: 'OPEN_CARD_MODAL', mode: 'CREATE' });
  },[])

  return (<div className="cardCreator" onClick={handleOpenCardCreator}>
    <AddIcon fontSize="large"/>
    <div className="cardCreator__label">Add another card</div>
  </div>);
};

CardCreator.propTypes = {
  onAction: PropTypes.func,
}

export default CardCreator;