import React, { useState, useRef, useEffect } from 'react';
import styles from './Popup.module.scss';
import ListButton from '../../components/ListButton/ListButton';
import imgClosePopup from '../../img/closePopup.svg';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const getCard = (lists, cardId) => {
    let allCards = [];
    for (let i = 0; i < lists.length; i++) {
        allCards = allCards.concat(lists[i].cards);
    }


    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].id === cardId) {
            return allCards[i];
        }
    }

};




const EditCardPopup = (props) => {

    console.log(props.lists.popupTitleValid);

    const descriptionLink = useRef();
    const description = () => {
        props.dispatch({ type: 'EDIT_DESCRIPTION_FINISH', id: card.id, description: descriptionLink.current.value });
        props.history.push('/');
        // console.log(descriptionLink.current.value);
    }

    const card = getCard(props.lists, props.match.params.cardId);
    const [title, setTitle] = useState(false);
    const inputTitle = useRef();

    //console.log(card);

    useEffect(() => {
        if (title) {
            inputTitle.current.focus();
        }
    });

    const titleEditFinish = () => {
        const titleText = inputTitle.current.value;
        if (titleText) {
            props.dispatch({ type: 'EDIT_TITLE_FINISH', inputTitle: titleText, id: card.id })
            setTitle(false);
        } else {
            inputTitle.current.focus();
        }
    }


    let popup = (<div></div>);
    if (card !== undefined) {


        let isTitleEditing = null;
        if (title) {
            isTitleEditing = (<textarea ref={inputTitle} onBlur={() => titleEditFinish()} className={styles.titleInput} type="text" defaultValue={card.title}></textarea>);
        } else {
            isTitleEditing = (<p onClick={() => setTitle(true)} className={styles.title}>{card.title}</p>);
        }


        popup = (
            <div className={styles.Popup}>
                <div className={styles.popupCard}>
                    <img onClick={props.onCloseCard} className={styles.imgClosePopup} src={imgClosePopup} alt="imgClosePopup" />

                    {isTitleEditing}
                    <textarea className={styles.description} ref={descriptionLink} placeholder="Описание" defaultValue={card.description}></textarea>
                    <ListButton onClick={description} text="Сохранить" />
                </div>
            </div>
        )
    } else {
        props.history.push('/');
    }

    return (
        popup
    );
};


const mapStateToProps = (state) => {
    return {
        lists: state.lists,
    };
};


export default connect(mapStateToProps)(withRouter(EditCardPopup));