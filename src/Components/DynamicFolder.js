import React from 'react';
import NoteSection from './NoteSection';
import NotefulContext from '../NotefulContext';

class DynamicFolder extends React.Component {
    static contextType = NotefulContext;
    componentDidMount(){
        if (this.context.currentFolder === null) {
            this.context.folderClicked(this.props.match.params.folderId);
        }
    }
    render() {
        const { currentFolder, notes } = this.context;
        let newArray = notes.filter(note => note.folderId === currentFolder);
        return (
            <NoteSection notes={newArray} />
        )
    }

}

    export default DynamicFolder;