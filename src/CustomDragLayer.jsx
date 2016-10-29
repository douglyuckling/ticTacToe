import React, { PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import Gamepiece from './Gamepiece'

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
};

function getItemStyles(props) {
    const { currentOffset } = props;
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform: transform,
        WebkitTransform: transform
    };
}

class CustomDragLayer extends React.Component {
    render() {
        const { item, itemType, isDragging } = this.props;
        if (!isDragging) {
            return null;
        }

        return (
            <div className="custom-drag-layer" style={layerStyles}>
                <div style={getItemStyles(this.props)}>
                    <Gamepiece value={item.value} />
                </div>
            </div>
        );
    }
}

CustomDragLayer.propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    currentOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired
};

function collect(monitor) {
    return {
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    };
}

export default DragLayer(collect)(CustomDragLayer);
