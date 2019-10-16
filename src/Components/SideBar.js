import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';


class SideBar extends React.Component {
    static contextType= NotefulContext;
    render() { 
        const { folders, currentFolder, folderClicked, counter } = this.context;
        let newArray = folders.map(folder => {
            return (
                <li key={folder.id} className={`listItem ${currentFolder === folder.id ? 'highlight' : ''}`}>
                    <Link to={`/folder/${folder.id}`} onClick={() => folderClicked(folder.id)}>
                        <div className='listItem'>
                            {folder.name}
                            <span>{counter[folder.id]}</span>
                        </div>
                    </Link>

                </li>
            );
        });

        return (
            <ul className='sidebar-ul'>
                {newArray}
            </ul>
        );
    }

}

export default SideBar;