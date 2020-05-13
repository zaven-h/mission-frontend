import React from 'react';

import './LoadingFallback.scss';

function LoadingFallback () {
    return (
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default LoadingFallback;