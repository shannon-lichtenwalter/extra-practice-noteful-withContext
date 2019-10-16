import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

class Note extends React.Component {
  static contextType = NotefulContext;
  render() {
    let date = new Date(this.props.note.modified);
    return (
      <Link to={`/note/${this.props.note.id}`}>
        <div onClick={() => this.context.noteClicked(this.props.note.id)} className='note-div'>
          <h2>{this.props.note.name}</h2>
          {date.toDateString()}
        </div>
        <button className='remove-button'>
          Remove
        </button>
      </Link>
    )
  }


}

export default Note;