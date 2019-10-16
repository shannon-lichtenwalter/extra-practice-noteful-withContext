import React from 'react';
import Note from './Note';

class NoteSection extends React.Component {
    render() {
        let newArray = this.props.notes.map(note => {
            return (
                <li key={note.id} className="noteList">
                    <Note note={note} />
                </li>
            );
        })
        return (
            <ul>
                {newArray}
            </ul>
        );
    }

}

export default NoteSection;