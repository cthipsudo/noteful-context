import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import StoreContext from '../StoreContext'
export default function NoteListMain(props) {
  return (
    <StoreContext.Consumer>{
      ({notes, getNotesForFolder}) => {
        const notesFolder = getNotesForFolder(notes, props.folderId);
        return (
          <section className='NoteListMain'>
            <ul>
              {notesFolder.map(note =>
                <li key={note.id}>
                  <Note
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                  />
                </li>
              )}
            </ul>
            <div className='NoteListMain__button-container'>
              <CircleButton
                tag={Link}
                to='/add-note'
                type='button'
                className='NoteListMain__add-note-button'
              >
                <FontAwesomeIcon icon='plus' />
                <br />
          Note
        </CircleButton>
            </div>
          </section>
        )
      }}
    </StoreContext.Consumer>
  )
}

NoteListMain.defaultProps = {
  notes: [],
}
