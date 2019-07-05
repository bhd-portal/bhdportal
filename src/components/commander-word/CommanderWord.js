
import React from 'react';
import "./CommanderWord.css";
import spaceship from '../../images/commander-words/spaceship.png';
import looking from '../../images/commander-words/looking.png';
import running from '../../images/commander-words/running.png';

const isReverse = title => title === 'ייעוד המערך' ? '-reverse' : '';

const getImage = title => {
    switch(title) {
        case 'חזון המערך':
            return {src: looking, decription: 'looking'};
        case 'ייעוד המערך':
            return {src: running, decription: 'running'};
        case 'דבר המפקד':
            return {src: spaceship, decription: 'spaceship'};
        default:
            return '';
    }
}

const CommanderWords = props => {
    return (
        <div className={`commander-word-container${isReverse(props.title)}`}>
            <div className="words-wrapper">
                <div className="title">{props.title}</div>
                <div className="content"><pre>{props.content}</pre></div>
            </div>
            <div className="image-wrapper">
                <img src={getImage(props.title).src} className={`image ${getImage(props.title).decription}`} />
            </div>
        </div>
    );
};

export default CommanderWords;
