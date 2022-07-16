import React, { useState } from 'react'
import Card from '../UI/Card'
import styles from './AddUser.module.css'

const AddUserForm = (props) => {
  const [formData, setFormData] = useState({ userAge: 0, userName: '' })

  const updateFormData = (e) => {
    const { name, value, type } = e.target
    const newObj = {
      [name]: type === 'number' ? +value : value,
      id: new Date().getTime(),
    }
    setFormData((old) => ({ ...old, ...newObj }))
  }

  const submitFormHandler = (e) => {
    e.preventDefault()
    if (formData.userName.trim() === '') {
      props.onError(`this is an invalid name`)
      return
    }
    props.onAddingUser(formData)
    setFormData({ userAge: 0, userName: '' })
  }

  return (
    <Card>
      <form onSubmit={submitFormHandler}>
        <div className={styles.input}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            name='userName'
            value={formData.userName}
            onChange={updateFormData}
          />

          <label htmlFor='userAge'>Age</label>
          <input
            id='userAge'
            type='number'
            min={10}
            max={99}
            name='userAge'
            value={formData.userAge}
            onChange={updateFormData}
          />
        </div>

        <button type='submit'>Add User</button>
      </form>
    </Card>
  )
}

export default AddUserForm
