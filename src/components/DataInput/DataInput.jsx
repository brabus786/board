import React from 'react';
import styles from './DataInput.module.scss';

const DataInput = (props) => {

const textareaClasses = [];

if (props.valid) textareaClasses.push(styles.invalid);
    return(
        <div className={styles.wrap}>
            <textarea  className={textareaClasses.join('')}  ref={props.textareaRef} placeholder="Введите текст карточки" name="DataInput"></textarea>
        </div>
    );
};

export default DataInput;