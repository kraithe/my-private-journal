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
        <thead>
          <tr>
            <th>Journal date</th>
          </tr>
        </thead>
        <tbody>
          {props.entries.map(entry => (
            <tr key={entry.entry_id}>
              <td>{entry.entry_modified || entry.entry_created}</td>
              <td>{entry.entry_text}</td>
              <td>
                <EditEntry journalData={entry} />
              </td>
              <td>
                <button
                  className="delete-trigger"
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