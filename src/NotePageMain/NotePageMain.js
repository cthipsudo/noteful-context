import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import StoreContext from '../StoreContext'

export default class NotePageMain extends React.Component {
  // constructor(props){
  //   super(props)

  // }
  static defaultProps = {
    match: {
      params: {}
    }
  }
  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }
  render(){
    return (
      <StoreContext.Consumer>
        {({notes, findNote}) => {
          const note = findNote(notes, this.props.noteId) || { content: '' };
          console.log(note);
          return (
            <section className='NotePageMain'>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
                onDeleteNote={this.handleDeleteNote}
              />
              <div className='NotePageMain__content'>
                {note.content.split(/\n \r|\n/).map((para, i) =>
                  <p key={i}>{para}</p>
                )}
              </div>
            </section>
          )
        }}
      </StoreContext.Consumer>
    )
  }
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
