import React from 'react';
import NoteSection from './NoteSection'
import NotefulContext from '../NotefulContext';

class HomePage extends React.Component {
    static contextType= NotefulContext;
    render(){
    return(
        <div>
            <NoteSection notes={this.context.notes}/> 
        </div>
    ); 
    }

    
}

export default HomePage;