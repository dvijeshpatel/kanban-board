import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';


const DraggableWrapper = props => {
  const { draggableId, index, className, children } = props;
  return (<Draggable draggableId={draggableId} index={index}>
    {provided => (
      <div className={className}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}>
        {children}
      </div>
    )}
  </Draggable>);
}

DraggableWrapper.propTypes = {
  draggableId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default DraggableWrapper;