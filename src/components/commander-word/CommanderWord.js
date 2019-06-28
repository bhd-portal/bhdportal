
import React from 'react';

const CommanderWords = props => {
    return (
        <div className="words-wrapper">
            <div className="title">{props.title}</div>
            <div className="content"><pre>{props.content}</pre></div>
        </div>
    );
};

export default CommanderWords;
