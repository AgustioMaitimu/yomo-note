import React from "react";
import './PlusButton.css'

export default function PlusButton(props) {
    return(
        <div 
            onClick={props.toggleAddingNote}
            className="plus--button" 
            style={{backgroundColor: props.lightMode ? 'white' : 'rgb(23, 23, 23)',
                    borderColor: !props.lightMode ? 'white' : 'rgb(46, 46, 46)',
                    color: !props.lightMode ? 'white' : 'rgb(46, 46, 46)',
                    height: props.editMode && !props.addingNote ? '2.5rem' : '0.2rem'}}>
            {props.editMode && !props.addingNote && 'Add Note'}
        </div>
    )
}