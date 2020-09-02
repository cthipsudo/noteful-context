import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import StoreContext from '../StoreContext'

export default function NotePageNav(props) {
  return (
    <StoreContext.Consumer>{({ notes, folders, findNote, findFolder }) => {
      const note = findNote(notes, props.noteId) || {};
      const folder = findFolder(folders, note.folderId);
      return (
        <div className='NotePageNav'>
          <CircleButton
            tag='button'
            role='link'
            onClick={() => props.history.goBack()}
            className='NotePageNav__back-button'
          >
            <FontAwesomeIcon icon='chevron-left' />
            <br />
        Back
      </CircleButton>
          {folder && (
            <h3 className='NotePageNav__folder-name'>
              {folder.name}
            </h3>
          )}
        </div>
      );
    }}
    </StoreContext.Consumer>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => { }
  }
}
