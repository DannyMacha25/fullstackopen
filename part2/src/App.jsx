import { useState, useEffect } from 'react'
import Note from "./components/Note"
import axios from 'axios'
import noteService from "./services/notes"


const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }

  useEffect(() => {
    noteService
     .getAll()
     .then(initialNotes => {
      setNotes(initialNotes)
     })
  }, [])
  console.log('render', notes.length, 'notes')

  const notesToShow = showAll
    ? notes
    : notes.filter(note=> note.important === true)
  
    
  const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled')
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important : !note.important}

    noteService
     .update(id, changedNote)
     .then(returnedNote => {
      console.log(returnedNote)
      setNotes(notes.map(note => note.id === id ? returnedNote : note))
     })
     .catch(error => {
      alert(
        `the note ${note.content} was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
     })
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1)
    }
    
    noteService
     .create(noteObject)
     .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
     })
    console.log('button clicked', event.target)

    //setNotes(notes.concat(noteObject))
    //setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }



  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>  
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
