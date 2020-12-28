import React from 'react';


function Loader(props) {
    const style = {
        width: `${props.with}px`,
        height: `${props.with}px`
    }
    return (
        <div className="loading float-right ml-2" style={style}></div>
    );
}

export default Loader;
