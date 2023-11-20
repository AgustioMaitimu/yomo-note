import React from "react";
import './Header.css'

export default function Header(props) {
    return(
        <div className="header" style={{backgroundColor: props.lightMode ? 'white' : 'rgb(23, 23, 23)'}}>
            <div className="header--top">
                <h3 className="app--name"
                    style={{color: props.lightMode ? 'rgb(46, 46, 46)' : 'white'}}
                >YoMo Notes</h3>
                <div className="header--buttons">
                    <div className="lightmode--toggle" 
                        style={{backgroundColor: props.lightMode ? 'rgb(46, 46, 46)' : 'white'}}
                        onClick={props.toggleLightMode}
                    >
                        {props.lightMode && <div className="lightmode--on"></div>}
                        {!props.lightMode && <div className="darkmode--on"></div>}
                    </div>
                    <button 
                        onClick={props.toggleEditMode}
                        className="edit--button"
                        style={{backgroundColor: 'transparent',
                                color: !props.lightMode ? 'white' : 'rgb(46, 46, 46)',
                                border: `2px solid ${props.lightMode ? 'rgb(46, 46,46)' : 'white'}`}}
                    >Edit</button>
                </div>
            </div>
            <div className="header--border"
                style={{backgroundColor: props.lightMode ? 'rgb(23, 23, 23)' : 'white'}}
            ></div>
        </div>
    )
}