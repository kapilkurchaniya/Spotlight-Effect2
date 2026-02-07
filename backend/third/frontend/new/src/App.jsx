import { useState, useEffect } from 'react'
import axios from "axios"

function App() {
  const [notes, setNotes] = useState([])

  function fetchNotes() {
    axios.get("http://localhost:3000/notes")
    axios.get("https://backend-basics-71ia.onrender.com/notes")

      .then(res => {
        setNotes(res.data.notes)
      })
      .catch(err => {
        console.error("Error fetching notes:", err)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    const { title, description } = e.target.elements

    axios.post("https://backend-basics-71ia.onrender.com/notes", {
        title: title.value,
        description: description.value
      })
      .then(() => {
        fetchNotes()
        title.value = ""
        description.value = ""
      })
      .catch(err => {
        console.error("Error creating note:", err)
      })
  }

  function handleDeleteNote(noteId) {
    axios.delete(`http://localhost:3000/notes/${noteId}`)
    axios.delete(`https://backend-basics-71ia.onrender.com/notes/${noteId}`)
    
      .then(() => {
        fetchNotes()
      })
      .catch(err => {
        console.error("Error deleting note:", err)
      })
  }

  return (
    <>
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder='Enter title' required />
        <input name='description' type="text" placeholder='Enter description' required />
        <button>Create note</button>
      </form>

      <div className="notes">
        {notes.map(note => (
          <div className="note" key={note._id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
