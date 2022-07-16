import React from 'react';
import Card from '../UI/Card';
import UserItem from './UserItem';
import styles from './UsersList.module.css';

const UsersList = props => {
  return (
    <Card>
      <ul className={styles.users}>
        {props.data.map(item => (
          <UserItem key={item.id} {...item} />
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
