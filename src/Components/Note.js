import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import NotefulContext from '../NotefulContext';


class Note extends React.Component {
  static contextType = NotefulContext;
  render() {
    let date = new Date(this.props.note.modified);
    return (
      <div>
        <div onClick={() => this.context.noteClicked(this.props.note.id)} className='note-div'>
          <Link to={`/note/${this.props.note.id}`}><h2>{this.props.note.name}</h2> </Link>
          {date.toDateString()}
        </div>
        <button className='remove-button'
          onClick={() => this.context.deleteClicked(this.props.note.id)}
        >
          Remove
        </button>
      </div>
    )
  }


}

export default withRouter(Note);