import React, { Fragment, useState } from 'react';
import EntryModal from './EntryModal.js';
import axios from 'axios';

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
    try {
      let resp = await axios.put(`http://localhost:3950/entry/${journalData.entry_id}`, {
        entry_text: updatedEntryText,
        entry_modified: newDate
      });
      window.location = '/';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <div className="edit-trigger">
        <button
          type="button"
          onClick={() => setEditToggled(true)}
          > Edit
        </button>
      </div>
      <div>
      {editToggled ? <EntryModal
        closeModal={cancelEdits}
        dateStamp={journalData.entry_modified ? `Journal entry last modified on ${journalData.entry_modified}` : null}
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