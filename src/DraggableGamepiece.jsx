import React, { PropTypes } from 'react';
import Gamepiece from './Gamepiece';
import { DragSource } from 'react-dnd';

export const DRAG_TYPE = 'GAMEPIECE';

const gamepieceSource = {
    canDrag(props) {
        return props.draggable;
    },

    beginDrag(props) {
        return {
            value: props.value
        };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

class DraggableGamepiece extends Gamepiece {
    render() {
        return this.props.connectDragSource(super.render())
    }
}

export default DragSource(DRAG_TYPE, gamepieceSource, collect)(DraggableGamepiece);
