import React from 'react';
import Note from './Note';
import NotefulContext from '../NotefulContext'

export default function NoteSection(props) {
    let newArray = props.notes.map(note => {
        return (
            <li key={note.id} className="noteList">
                <Note noteClicked={props.noteClicked} note={note}/>
            </li>
        );
    })
    return (
        <ul>
            {newArray}
        </ul>
    );
}