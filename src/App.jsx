import React from 'react'
import Header from './Header'
import Card from './Card'
import PlusButton from './PlusButton'
import Input from './Input'
import './App.css'

export default function App() {

  const [lightMode, setLightMode] = React.useState(true)
  const [editMode, setEditMode] = React.useState(false)
  const [addingNote, setAddingNote] = React.useState(false)
  const [cards, setCards] = React.useState([])
  const [notes, setNotes] = React.useState([])
  const cardsRef = React.useRef(null)
  const inputRef = React.useRef(null)
 

  document.querySelector('body').style.backgroundColor = lightMode ? 'white' : 'rgb(23, 23, 23)'

  function toggleLightMode() {
    setLightMode(prev => !prev)
  }

  function toggleEditMode() {
    setEditMode(prev => !prev)
  }

  function toggleAddingNote() {
    setAddingNote(prev => !prev)
  }

  function addNote() {
    const storedNotes = JSON.parse(localStorage.getItem('yomo-notes')) || [];

    const hasDefaultNote = localStorage.getItem('has-default-note') === 'true';

    if (!hasDefaultNote) {
      const defaultNote = {
        subject: 'Welcome to Your Notes App',
        body: 'This is your first note. Feel free to edit or delete it.\n\n(Tio was here.)',
        date: new Date().toLocaleDateString(),
        key: 100000000002
      };

      storedNotes.push(defaultNote);

      localStorage.setItem('yomo-notes', JSON.stringify(storedNotes));

      localStorage.setItem('has-default-note', 'true');
    }

    setNotes(storedNotes);

    const updatedCards = storedNotes.map(note => (
      <Card
        addNote={addNote}
        lightMode={lightMode}
        editMode={editMode}
        subject={note.subject}
        body={note.body}
        date={note.date}
        key={note.key}
        identifier={note.key}
      />
    ));

    setCards(updatedCards);
  }


  React.useEffect(() => {
    addNote()
  }, [lightMode])

  React.useEffect(() => {
    !editMode && setAddingNote(false)
    addNote()
  }, [editMode])
  
  React.useEffect(() => {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const plusButtonHeight = document.querySelector('.plus--button').offsetHeight;

    if (!addingNote) {
    cardsRef.current.style.marginTop = `${headerHeight + 46}px`
    cardsRef.current.style.marginBottom = `${plusButtonHeight + 46}px`
    }

    if (addingNote) {
      inputRef.current.style.marginTop = `${headerHeight + 30}px`
    }
  }, [addingNote])

  return(
    <div className='app' style={{backgroundColor: lightMode ? 'white' : 'rgb(23, 23, 23)'}}>
      <Header 
        className='app--header'
        toggleLightMode={toggleLightMode}
        toggleEditMode={toggleEditMode}
        lightMode={lightMode} 
      />

      {addingNote && <div ref={inputRef}> <Input addNote={addNote} lightMode={lightMode} toggleEditMode={toggleEditMode}/> </div>}
      
      {!addingNote && <div className='cards' ref={cardsRef}>
        {cards}
      </div>}
      <PlusButton
        lightMode={lightMode} 
        editMode={editMode}
        addingNote={addingNote}
        toggleAddingNote={toggleAddingNote}
      />
    </div>
  )
}