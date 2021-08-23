import React, { Fragment, useState } from 'react';
import EntryModal from './EntryModal.js';
import axios from 'axios';
const dayjs = require('dayjs');

const EditEntry = ({ journalData }) => {
  let [updatedEntryText, setUpdatedEntryText] = useState(journalData.entry_text);
  let [editToggled, setEditToggled] = useState(false);

  let updateEntryText = (newText) => {
    setUpdatedEntryText(newText);
  }

  let cancelEdits = () => {
    setEditToggled(false);
  }

  const saveEdits = async (e) => {
    e.preventDefault();
    let newDate = Date.now();
    let formatted = dayjs().format('DD/MM/YYYY');
    try {
      let resp = await axios.put(`http://localhost:3950/entry/${journalData.entry_id}`, {
        entry_text: updatedEntryText,
        entry_modified: formatted
      });
      window.location = '/';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <div className="edit-btn">
        <button
          type="button"
          onClick={() => setEditToggled(true)}
          > Edit
        </button>
      </div>
      <div>
      {editToggled ? <EntryModal
        closeModal={cancelEdits}
        dateStamp={journalData.entry_modified ? `Editing journal entry from ${journalData.entry_modified}` : null}
        entryText={updatedEntryText}
        headerText={`Editing your journal from ${journalData.entry_created}`}
        handleSubmit={saveEdits}
        updateText={updateEntryText}
        /> : null}
      </div>
    </React.Fragment>
  );
};

export default EditEntry;