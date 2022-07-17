import React, { useState, useRef } from 'react'
import Card from '../UI/Card'
import styles from './AddUser.module.css'
import Button from '../UI/Button'

const AddUserForm = (props) => {
  const nameinputRef = useRef()
  const ageInputRef = useRef()

  const submitFormHandler = (e) => {
    e.preventDefault()
    const userName = nameinputRef.current.value
    const userAge = ageInputRef.current.value

    if (userName.trim().length === 0) {
      props.onError({
        title: 'Invalid name',
        message: `This is an invalid name`,
      })
      return
    }

    if (+userAge < 1) {
      props.onError({
        title: 'Invalid Age',
        message: `Age must be greater than 0!!`,
      })
      return
    }

    const newUserData = {
      userAge,
      userName,
      id: new Date().getTime().toString(),
    }

    props.onAddingUser(newUserData)
    nameinputRef.current.value = ''
    ageInputRef.current.value = ''
  }

  return (
    <Card className={styles.input}>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='username'>Username</label>
          <input id='username' type='text' name='userName' ref={nameinputRef} />

          <label htmlFor='userAge'>Age</label>
          <input id='userAge' type='number' name='userAge' ref={ageInputRef} />
        </div>

        <Button type='submit'>Add User</Button>
      </form>
    </Card>
  )
}

export default AddUserForm
