import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import StoreContext from '../StoreContext'
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            folders: []
        };
    }

    componentDidMount() {
        // fake date loading from API call
        //console.log(newStore);
        setTimeout(() => {
            fetch('http://localhost:9090/folders').then(myRequest => {
                //console.log(myRequest);
                return myRequest.json();
            }).then(myData => {
                //console.log(myData);
                this.setState({
                    folders: myData
                });
            })
            fetch('http://localhost:9090/notes').then(myRequest => {
                //console.log(myRequest);
                return myRequest.json();
            }).then(myData => {
                //console.log(myData);
                this.setState({
                    notes: myData
                });
            })
        }, 600);

    }

    renderNavRoutes() {
        //const { notes, folders } = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                {...routeProps}
                            />
                        )}
                    />
                ))}

                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const { noteId } = routeProps.match.params;
                        return <NotePageNav {...routeProps} noteId={noteId} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        //const { notes, folders } = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const { folderId } = routeProps.match.params;
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    folderId={folderId}
                                />
                            );
                        }}
                    />
                ))}
                <StoreContext.Consumer>{({ notes }) => (
                    <Route
                        path="/note/:noteId"
                        render={routeProps => {
                            const { noteId } = routeProps.match.params;
                            return <NotePageMain {...routeProps} noteId={noteId} />;
                        }}
                    />
                )}
                </StoreContext.Consumer>
            </>
        );
    }
    handleDeleteClick= (noteId) => {
        const newNotes = this.state.notes.filter(note => {
            //console.log(note.id);
            return note.id !== noteId
        });
        this.setState({
            notes: newNotes
        });
    }
    // handleDeleteClickFromNotePage = (noteId, history) => {
    //     console.log("Trying to delete from NotePage:", history);
    // }
    render() {
        //console.log(this.state);
        return (
            <div className="App">
                <StoreContext.Provider value={{
                    folders: this.state.folders,
                    notes: this.state.notes,
                    findFolder: findFolder,
                    findNote: findNote,
                    getNotesForFolder: getNotesForFolder,
                    handleDelete: this.handleDeleteClick,
                    handleDeleteClickFromNotePage: this.handleDeleteClickFromNotePage
                }}>
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </StoreContext.Provider>
            </div>
        );
    }
}

export default App;
