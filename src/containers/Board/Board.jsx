import React from 'react';
import { Route, withRouter  } from 'react-router-dom';

import styles from './Board.module.scss';
import List from '../../components/List/List';
import EditCardPopup from '../EditCardPopup/EditCardPopup';
import {connect} from 'react-redux';


const Board = (props) => {
    const onCardEditOpen = (cardId) => {
        props.history.push(`/edit/${cardId}`);
    }

    const onCloseCard = () => {
        props.history.push('/');
    }

    

    return (

        <div className={styles.board}>
            <div className={styles.container}>

                {props.lists.map((listData) => {
                    return <List
                        key={listData.id}
                        cards={listData.cards}
                        title={listData.title}
                        isAddingCard={listData.isAddingCard}
                        onAddCard={() => props.dispatch({type: 'ADD_CARD_START', listId: listData.id})}
                        onCardCancel={() => props.dispatch({type: 'ADD_CARD_CANCEL', listId: listData.id})}
                        onAddCardFinish={(cardText) => props.dispatch({type:'ADD_CARD_FINISH', cardText:cardText, listId:listData.id})}
                        onCardOpen={(cardId) => onCardEditOpen(cardId)}
                        textareaRef={listData.textareaRef}  
                        valid={listData.isInvalid}               
                    />
                })}
            </div>


            <Route exact path="/edit/:cardId">
                <EditCardPopup 
                    onCloseCard={onCloseCard}  
                 />
            </Route>

        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        lists: state.lists,
    };
};

// const mapDispatchToActions = (dispatch) => {
//     return {
//         addCardStart: (listId) => dispatch({type: 'ADD_CARD_START', listId}),

//     }
// };

export default connect(mapStateToProps)(withRouter(Board));