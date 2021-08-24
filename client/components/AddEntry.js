import React, { Fragment, useState } from 'react';
import EntryModal from './EntryModal.js'
import axios from 'axios';
const dayjs = require('dayjs');

const CreateEntry = () => {
  let [newEntryToggled, setNewEntryToggled] = useState(false);
  let [journalText, setJournalText] = useState('');

  let updateNewEntryText = (newText) => {
    setJournalText(newText);
  }

  let cancelEntry = () => {
    setNewEntryToggled(false);
  }

  const saveEntry = async (e) => {
    e.preventDefault();
    let newDate = new Date();
    let formatted = dayjs().format('DD/MM/YYYY');
    try {
      let resp = await axios.post('http://localhost:3950/newEntry', {
        entry_text: journalText,
        entry_created: formatted,
        entry_modified: null
      });
      setNewEntryToggled(false);
      window.location = '/';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <div>
        <button
          type="button"
          className="new-btn"
          onClick={() => setNewEntryToggled(true)}
          > Write in your journal
        </button>
      </div>
      <div>
        {newEntryToggled ? <EntryModal
          closeModal={cancelEntry}
          dateStamp={null}
          entryText={journalText}
          headerText="Tell it how it is"
          handleSubmit={saveEntry}
          updateText={updateNewEntryText}
          /> : null}
      </div>
    </React.Fragment>
    );
  };

export default CreateEntry;