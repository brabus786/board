import React from 'react';
import styles from './Card.module.scss';

const Card = (props) => {
    return(
        <div className={styles.wrap} onClick={props.onClick}>
            <p className={styles.textCard}>{props.text}</p>
        </div>
    );
};

export default Card;