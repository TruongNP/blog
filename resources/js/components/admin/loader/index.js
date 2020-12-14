import React from 'react';


function Loader(props) {
    
    return (
        <img src="/images/loader.gif" width={props.with ? props.with : '30'} />
    );
}

export default Loader;
