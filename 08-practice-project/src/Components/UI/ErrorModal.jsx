import React from 'react';

import Card from './Card';
import styles from './ErrorModal.module.css';
import btnStyles from '../UI/Button.module.css';
const ErrorModal = props => {
  const closeModalHandler = () => {
    props.onCloseModal();
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <Card>
          <div className={styles.header}>
            <h2>Error</h2>
          </div>
          <div className={styles.content}>
            <p>{props.message}</p>
          </div>

          <div className={styles.actions}>
            <button type='button' textValue='Okay' className={btnStyles.button} onClick={closeModalHandler}>
              Okay
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ErrorModal;
