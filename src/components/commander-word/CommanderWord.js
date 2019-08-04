import React, { useMemo } from 'react';
import css from './CommanderWord.module.scss';
import looking from "../../images/commander-words/looking.png";
import running from "../../images/commander-words/running.png";
import spaceship from "../../images/commander-words/spaceship.png";
import { CommanderWordsImages } from "../constants";

const commanderWordsToImages = {
  looking,
  running,
  spaceship
};

const CommanderWords = ({ title, content }) => {

  const isReverse = useMemo(() => title === 'ייעוד המערך' ? '-reverse' : '', [title]);

  const imageProps = useMemo(() => {

    return Object.assign({},
      CommanderWordsImages[title],
      {
        src: commanderWordsToImages[CommanderWordsImages[title].src]
      });
  }, [title]);

  return (
        <div className={css[`commander-word-container${isReverse}`]}>
            <div className={css['words-wrapper']}>
                <div className={css['title']}>{title}</div>
                <div className={css['content']}>
                  <pre>{content}</pre>
                </div>
            </div>
            <div className={css['image-wrapper']}>
                <img src={imageProps.src}
                     alt={imageProps.description}
                     className={`${css['image']} ${css[imageProps.description]}`} />
            </div>
        </div>
    );
};

export default CommanderWords;
