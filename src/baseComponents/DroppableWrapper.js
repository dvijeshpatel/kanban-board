import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

const DroppableWrapper = props  => {
  const { droppableId, className,  children } = props;
  return <Droppable droppableId={droppableId}>
    {provided => (
      <div className={className}
        ref={provided.innerRef}
        {...provided.droppableProps}>
        {children}
      </div>
    )}
  </Droppable>
}

DroppableWrapper.className = {
  droppableId: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default DroppableWrapper