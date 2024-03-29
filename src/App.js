import React from 'react';
import './App.css';
import HomePage from './Components/HomePage'
import SideBar from './Components/SideBar'
import DynamicFolder from './Components/DynamicFolder';
import NoteContent from './Components/NoteContent';
import NoteSidebar from './Components/NoteSidebar';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import NotefulContext from './NotefulContext';


class App extends React.Component {

  state = {
    currentNote: {
      note: {},
      folder: ''
    },
    currentFolder: null,
    folders: [],
    notes: [],
    counter: {},
    error: null,
  };

  resetFolder() {
    this.setState({
      currentFolder: null
    })
  }

  folderClicked = (id) => {
    this.setState({
      currentFolder: id,
    })
  }

  noteClicked = (id) => {
    let newNote = this.state.notes.find(note => note.id === id)
    let currentFolder = this.state.folders.find(folder => folder.id === newNote.folderId);
    this.setState({
      currentNote: {
        note: newNote,
        folder: currentFolder.name,
      }
    })
  }

  folderCounter = () => {
    let newArray = this.state.folders.map(folder => {
      let counter = 0;
      this.state.notes.map(note => {
        if (note.folderId === folder.id) {
          counter++;
        } return null;
      })
      return {
        [folder.id]: counter
      };
    })

    let result = newArray.reduce((result, item) => {
      let key = Object.keys(item);
      result[key] = item[key];
      return result;
    }, {});

    this.setState({
      counter: result
    });
  }


  deleteClicked = (id) => {
    fetch(`http://localhost:9090/notes/${id}`, {
      method: 'DELETE'
    }).then(() => {
      const newArray = this.state.notes.filter(items => items.id !== id);
      this.setState({
        notes: newArray
      })
    }).then(()=> this.folderCounter())
    .then(()=> {
      this.setState({
        currentFolder:null,
      })
    })
    .then(this.props.history.push('/'));
  }


  componentDidMount() {
    
    fetch('http://localhost:9090/folders')
      .then(res => {
        if (!res.ok) {
          throw Error(res.json())
        }
        return res.json()
      })
      .then(data => {
        this.setState({
          folders: data
        })
      })
      .catch(error => {
        this.setState({
          error: error,
        })
      })


    fetch('http://localhost:9090/notes')
    
      .then(res => {
        if (!res.ok) {
          throw Error(res.json())
        }
        return res.json()
      })
      .then(data => {
        this.setState({
          notes: data
        })
      })
      .then(() => this.folderCounter())
      .catch(error => {
        this.setState({
          error: error,
        })
      })
  }

  render() {
    return (
      this.state.error ? <div>{this.state.error.message}</div> :
        <NotefulContext.Provider value={{
          folder: this.state.currentNote.folder,
          folders: this.state.folders,
          folderClicked: this.folderClicked,
          counter: this.state.counter,
          currentFolder: this.state.currentFolder,
          noteClicked: this.noteClicked,
          notes: this.state.notes,
          currentNote: this.state.currentNote,
          exactNote: this.state.currentNote.note,
          deleteClicked: this.deleteClicked,
        }}>
          <div className='app-div'>
            <Switch>
              <Route
                path='/note'
                component={NoteSidebar}
              />

              <Route
                path='/'
                component={SideBar}
              />

            </Switch>

            <div className='app-second-div'>
              <header>
                <Link to="/" onClick={() => this.resetFolder()}>
                  <h1>Noteful</h1>
                </Link>
              </header>

              <Route
                exact
                path='/'
                component={HomePage}
              />


              <Route
                path='/folder/:folderId'
                component={DynamicFolder}
              />


              <Route
                path='/note/:noteId'
                component={NoteContent}
              />


            </div>
          </div>
        </NotefulContext.Provider>
    );
  }
}

export default withRouter(App);
