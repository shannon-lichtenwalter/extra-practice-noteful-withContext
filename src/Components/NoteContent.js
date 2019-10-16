import React from 'react';
import Note from './Note';
import './NoteContent.css'
import NotefulContext from '../NotefulContext';

class NoteContent extends React.Component {
  static contextType = NotefulContext; 
  
  componentDidMount(){
    if (this.context.currentNote.note.content === undefined) {
      setTimeout(() => {
        this.context.noteClicked(this.props.match.params.noteId)
      }, 100)
      }
  }
  
  render() {
    const { currentNote } = this.context;
    let newArray = !currentNote.note.content ? null : currentNote.note.content.split('\n \r');
    let paragraphs = !currentNote.note.content ? null : newArray.map((content, index) => {
      return <p key={index}>{content}</p>
    })

    return (
      <div className='note-content'>
        <div className='noteLink'>
          <Note note={currentNote.note} />
        </div>
        {paragraphs}
      </div>
    )
  }
}

export default NoteContent;