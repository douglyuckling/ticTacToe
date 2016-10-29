import React, { PropTypes } from 'react';

class Gamepiece extends React.Component {
    render() {
        const { value, draggable, isDragging, enableDragSource } = this.props;
        return (
            <div className={`gamepiece ${draggable ? 'draggable' :''} ${isDragging ? 'isDragging' : ''}`}>
                {value}
            </div>
        )
    }
}

Gamepiece.propTypes = {
    value: PropTypes.string.isRequired
};

export default Gamepiece;
