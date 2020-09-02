import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import StoreContext from '../StoreContext'

export default class Note extends React.Component {
  static contextType = StoreContext;
  handleDeleteNote = e => {
    e.preventDefault();
    const noteId = this.props.id;
    console.log("trying to delete", noteId);
        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        }).then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
        .then(() => {
          this.context.handleDelete(noteId);
          // allow parent to perform extra behaviour
          this.props.OnDeleteNoteBack(noteId);
        })
        .catch(error => {
          console.error({ error })
        })
  }
  render() {
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${this.props.id}`}>
            {this.props.name}
          </Link>
        </h2>
        <button className='Note__delete' type='button' onClick={this.handleDeleteNote}>
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
    remove
  </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
      {' '}
            <span className='Date'>
              {format(this.props.modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
