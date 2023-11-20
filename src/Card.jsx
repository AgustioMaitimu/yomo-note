import React from "react";
import './Card.css'

export default function Card(props) {

    const [opened, setOpened] = React.useState(false)

    function toggleOpened(event) {
        event.target.className != 'card--trashcan' && setOpened(prev => !prev)
    }

    function deleteHandler() {
        if (window.confirm('Delete Note?')) {
            const currentNotes = JSON.parse(localStorage.getItem('yomo-notes'))
            let newNotes = currentNotes.filter(note => note.key !== props.identifier)
            localStorage.setItem('yomo-notes', JSON.stringify(newNotes))
            props.addNote()
        }
    }

    return(
        <div 
            className="card" onClick={toggleOpened} 
            style={{backgroundColor: props.lightMode ? 'rgb(217, 217, 217)' : 'rgb(41, 41, 41)'}}
        >
            <div className="card--top">
                <h3 
                    className="card--subject"
                    style={{color: props.lightMode ? 'rgb(23, 23, 23)' : 'white'}}
                >{props.subject}</h3>
                {props.editMode && <img className="card--trashcan" src={props.lightMode ? '../public/trashcan-lightmode.png' : '../public/trashcan-darkmode.png'} onClick={deleteHandler}/>}
            </div>
            <p 
                className="card--date"
                style={{color: props.lightMode ? 'rgb(23, 23, 23)' : 'white'}}
            >{props.date}</p>
            {opened && <p className="card--note" style={{color: props.lightMode ? 'rgb(23, 23, 23)' : 'white'}}>{props.body}</p>}
        </div>
    )
}