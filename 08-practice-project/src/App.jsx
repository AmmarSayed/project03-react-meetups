import React from 'react'
import { useState } from 'react'
import AddUser from './Components/Users/AddUser'
import UsersList from './Components/Users/UsersList'
import ErrorModal from './Components/UI/ErrorModal'

function App() {
  const [allUsers, setAllUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const closeModalHandler = () => setShowModal(false)

  const addUserHandler = (userData) => {
    setAllUsers((old) => [userData, ...old])
  }

  const onAddUserError = (message) => {
    setShowModal(true)
    setErrorMessage(message)
  }
  return (
    <>
      <div>
        {showModal ? (
          <ErrorModal onCloseModal={closeModalHandler} message={errorMessage} />
        ) : (
          ''
        )}

        <AddUser onAddingUser={addUserHandler} onError={onAddUserError} />
        <UsersList data={allUsers} />
      </div>
    </>
  )
}

export default App
