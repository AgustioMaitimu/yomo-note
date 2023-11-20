import React from "react";
import './Input.css'
export default function Input(props) {

    const [noteData, setNoteData] = React.useState(
        {subject: '', body: '', date: new Date().toLocaleDateString(), key: Math.floor(Math.random() * 10000000000) + 1}
    )

    function handleInput(event) {
        props.addNote
        setNoteData(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    function addNote() {
        const existingNotes = JSON.parse(localStorage.getItem('yomo-notes')) || []
        existingNotes.push(noteData)
        localStorage.setItem('yomo-notes', JSON.stringify(existingNotes))
    }

    function handleCancel(event) {
        event.preventDefault()
        props.toggleEditMode()
    }

    function handleSubmit(event) {
        event.preventDefault()
        const existingNotes = JSON.parse(localStorage.getItem('yomo-notes')) || []
        existingNotes.push(noteData)
        localStorage.setItem('yomo-notes', JSON.stringify(existingNotes))
        props.toggleEditMode()
    }

    return(
        <form className="input--forms" >
            <label className="input--subject" style={{color: props.lightMode ? 'black' : 'white'}}>
                Subject:
                <input 
                    type="text" 
                    value={noteData.subject} 
                    name="subject"
                    onChange={handleInput} 
                    className="subject--textbox"
                    style={{backgroundColor: props.lightMode ? 'rgb(217, 217, 217)' : 'rgb(41, 41, 41)',
                            borderColor: props.lightMode ? 'black' : 'white',
                            color: props.lightMode ? 'black' : 'white'}}
                />
            </label>
            <label className="input--body" style={{color: props.lightMode ? 'black' : 'white'}}>
                Body:
                <textarea
                    type="text" 
                    value={noteData.body} 
                    name="body"
                    onChange={handleInput} 
                    className="body--textbox"
                    style={{backgroundColor: props.lightMode ? 'rgb(217, 217, 217)' : 'rgb(41, 41, 41)',
                            borderColor: props.lightMode ? 'black' : 'white',
                            color: props.lightMode ? 'black' : 'white'}}
                />
            </label>
            <div className="input--buttons">
                <button 
                    className="input--submit" 
                    onClick={handleSubmit} 
                    style={{borderColor: props.lightMode ? 'black' : 'white', 
                            backgroundColor: props.lightMode ? 'rgb(217, 217, 217)' : 'rgb(41, 41, 41)',
                            color: !props.lightMode ? 'white' : 'black'}}
                >Submit</button>
                <button 
                    className="input--cancel" 
                    onClick={handleCancel}
                    style={{borderColor: props.lightMode ? 'black' : 'white', 
                            backgroundColor: props.lightMode ? 'rgb(217, 217, 217)' : 'rgb(41, 41, 41)',
                            color: !props.lightMode ? 'white' : 'black'}}
                >Cancel</button>
            </div>
        </form>
    )
}