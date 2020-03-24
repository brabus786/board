import React from 'react';
import styles from './List.module.scss';
import Card from '../Card/Card';
import ListButton from '../ListButton/ListButton';
import imgAddCards from '../../img/AddCards.svg';
import imgCancel from '../../img/Сancel.svg';
import DataInput from '../DataInput/DataInput';
import { createRef } from 'react';

const List = (props) => {


    const textareaRef = createRef();
    const card = props.cards.map((data, i) => (
        <Card
            key={i} text={data.title}
            onClick={() => props.onCardOpen(data.id)}
        />)
    );
   


    let actionButton = <ListButton onClick={props.onAddCard} icon={imgAddCards} color="grey" text="Добавить еще одну карточку" />;
    if (props.isAddingCard) {
        actionButton = (
            <div className={styles.wrapButton}>
                <ListButton onClick={() => props.onAddCardFinish(textareaRef.current.value)} icon={imgAddCards} color="blue" text="Добавить карточку" />
                <ListButton onClick={props.onCardCancel} icon={imgCancel} color="grey" text="Отмена" />
            </div>
        );
    }

    return (
        <div className={styles.list}>

            <p className={styles.title}>{props.title}</p>

            <div>
                {card}
            </div>

            {props.isAddingCard ? <DataInput valid={props.valid} textareaRef={textareaRef} /> : null}

            {actionButton}

        </div>
    );
};

export default List;