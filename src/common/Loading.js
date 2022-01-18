import React from 'react';
import img from "../assets/images/loading.gif"
function Loading(props) {
    return (
        <div className="loading">
            <img src={img} alt="" />
        </div>
    );
}

export default Loading;