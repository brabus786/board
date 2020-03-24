import React from 'react';
import styles from './ListButton.module.scss';

const ListButton = (props) => {

   // console.log(props.color);
    const paramButton = props.color === "grey"?styles.greyButton: [styles.greyButton,styles.blueButton].join(' ');

    return (
        <div className={styles.wrap}>
            <button onClick={props.onClick} className={paramButton}>
                <img src={props.icon} alt="iconAddCard" />
                <span className={styles.textButton}>{props.text}</span>
            </button>
        </div>
    )
}

export default ListButton;