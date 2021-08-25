import React, { Fragment, useState } from 'react';
import EditEntry from './EditEntry';
import axios from 'axios';

const EntryList = (props) => {
  const deleteEntry = async (deleted) => {
    try {
      const deletion = await axios.delete(`http://localhost:3950/entry/${deleted}`);
      window.location = '/'
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <table className="entrylist-content">
        <tbody>
          {props.entries.map(entry => (
            <tr key={entry.entry_id}>
              <td className="entry-date">
                {entry.entry_created}
                <div className="edited-yn">
                { entry.entry_modified ? `(edited on ${entry.entry_modified})` : null }
                </div>
              </td>
              <td className="journal-text">
                {entry.entry_text}
              </td>
              <td>
                <EditEntry journalData={entry} />
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteEntry(entry.entry_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default EntryList;