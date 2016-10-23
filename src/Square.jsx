import React from 'react'

function Square(props) {
    const classes = ['square'];
    if (props.winningIndex >= 0) {
        classes.push('partOfWin');
    }
    return (
        <button className={classes.join(' ')} onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

export default Square;
