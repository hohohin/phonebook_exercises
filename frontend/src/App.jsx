import { useState, useEffect } from 'react'
import Form from './components/Form'
import Search from './components/Search'
import Render from './components/Render'
import service from './noteService/service'

const Notification = ({message, type}) => {
  if (message === null) {
    return null
  }
  else {
    console.log(type)
    return(
      <div className={type}>
      {message}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('success');

  const showNotification = (msg, type) => {
    setMessage(msg)
    setNotificationType(type);
    setTimeout(() => {
        setMessage(null) // 3秒后将消息设置为 null
    }, 3000)
  }

  
  useEffect(()=>{
    console.log('effect')
    service
      .getAll()
      .then(persons => setPersons(persons))
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const personCheck = persons.filter(person => person.name === newName)
    if (personCheck.length>0) {
      const confirmation = window.confirm(`${newName} is already on the book, replace the number`)
      if (confirmation) {

        const newPerson = {
          name:newName,
          number:newNumber
        }

        service
          .refresh(personCheck[0].id, newPerson)
          .then(respond => {
              setPersons(persons.map(person => person.id === personCheck[0].id ? respond : person));
              setNewName('')
              setNumber('')
          })
      }
      return
    }
    const newPerson = {
      name:newName,
      number:newNumber
    }

    service
      .create(newPerson)
      .then(respond => {
        setPersons(persons.concat(respond))
        setNewName('')
        setNumber('')
        showNotification(`${newName} has been add`, 'succeed')
      })
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if (window.confirm(`确定要删除姓名为 ${personToDelete.name} 的联系人吗？`)) {
        service.remove(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id)); // 更新状态，移除已删除的联系人
                showNotification(`${personToDelete.name} has been deleted`, 'error')
            })
            .catch(error => {
                console.error('删除联系人失败:', error);
            });
    }
  }

  const handleAdd = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  } 


  return (
    <div>
      <h2>Phonebook</h2>
      <Form 
        addPerson={addPerson}
        newName={newName}
        handleAdd={handleAdd}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <Notification message={message} type={notificationType}/>
      <h2>Numbers</h2>
      <Search search={search} handleSearch={handleSearch} />
      <Render 
        persons={persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
