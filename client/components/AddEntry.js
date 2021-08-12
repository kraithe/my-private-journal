import React, { Fragment, useState } from 'react';
import EntryModal from './EntryModal.js'
import axios from 'axios';

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
    try {
      let resp = await axios.post('http://localhost:3950/newEntry', {
        entry_text: journalText,
        entry_created: newDate,
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
      <div className="new-trigger">
        <button
          type="button"
          onClick={() => setNewEntryToggled(true)}
          > Write in your journal
        </button>
      </div>
      <div>
        {newEntryToggled ? <EntryModal
          closeModal={cancelEntry}
          dateStamp={null}
          entryText={journalText}
          headerText="Write in your journal"
          handleSubmit={saveEntry}
          updateText={updateNewEntryText}
          /> : null}
      </div>
    </React.Fragment>
    );
  };

  //   style={{
    //     transform: toggled ? 'translateY(0vh)' : 'translateY(-100vh)',
    //     opacity: toggled ? '1' : '0'
    //   }}
    // >
//  { toggled ? <div onClick={setToggled(false)} className="modal-backdrop"></div> : null }

export default CreateEntry;