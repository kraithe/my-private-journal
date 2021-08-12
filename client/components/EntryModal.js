import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const EntryModal = (props) => {

  let [innerToggle, setInnerToggle] = useState(false);

  const handleSave = (e) => {
    props.handleSubmit(e);
    setInnerToggle(false);
  }

  const handleCancel = () => {
    props.closeModal();
    setInnerToggle(false);
  }

  useEffect(() => {
    setInnerToggle(true);
  })

  return (
    <React.Fragment>
      <div
        className="modal-container"
        style={{
          transform: innerToggle ? 'translateY(0vh)' : 'translateY(-100vh)',
        }}
      >
        <div className="modal-header">
          <h4>{props.headerText}</h4>
        </div>
        <div className="modal-body">
          <form className="journal-input">
            <input
              type="text"
              value={props.entryText}
              placeholder="What's on your mind?"
              onChange={(e) => props.updateText(e.target.value)}
            >
            </input>
          </form>
        </div>
        <div className="modal-footer">
          {props.dateStamp || null}
          <button
            type="button"
            onClick={(e) => handleSave(e)}
          >
            Save to journal
          </button>
          <button
            type="button"
            className="modal-button"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
        </div>
      </div>
    </React.Fragment>
  )
};

/*
  <div className="modal-container"
    style={{
      transform: toggled ? 'translateY(0vh)' : 'translateY(-100vh)',
      opacity: toggled ? '1' : '0'
    }}
  >
  { toggled ? <div onClick={setToggled(false)} className="modal-backdrop"></div> : null }
*/

export default EntryModal;