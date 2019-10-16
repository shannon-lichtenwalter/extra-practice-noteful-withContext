import React from 'react';
import './NoteSidebar.css';
import { withRouter } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

class NoteSidebar extends React.Component {
  static contextType = NotefulContext;

  render() {
    return (
      <div className="note-sidebar">
        <button className="backButton" onClick={() => this.props.history.goBack()}>
          Back
      </button>
        <h2 className="verticalText">{this.context.folder}</h2>
      </div>
    )
  }

}

export default withRouter(NoteSidebar);