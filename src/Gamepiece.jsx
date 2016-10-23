import React, { PropTypes } from 'react';
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

class Gamepiece extends React.Component {
    render() {
        const { value, connectDragSource, draggable, isDragging } = this.props;
        return connectDragSource(
            <div className={`gamepiece ${draggable ? 'draggable' :''} ${isDragging ? 'isDragging' : ''}`}>
                {value}
            </div>
        );
    }
}

Gamepiece.propTypes = {
    value: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
};

export default DragSource(DRAG_TYPE, gamepieceSource, collect)(Gamepiece);
