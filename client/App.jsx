import React, { Fragment, useState, useEffect } from 'react';
import EntryList from './components/EntryList.js';
import NavBar from './components/NavBar.js';
import axios from 'axios';

function App(props) {

  let [entries, setEntries] = useState([]);

  const getEntries = async () => {
    try {
      let resp = await axios.get('http://localhost:3950/entries');
      let entryData = await resp.data;
      setEntries(entryData);
    } catch (err) {
      console.error(err);
    }
  };

  const updateEntries = (newEntries) => {
    setEntries(newEntries);
  }

  useEffect(() => {
    getEntries()
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <NavBar entries={entries} updateEntries={updateEntries} />
        <EntryList entries={entries} />
      </div>
    </React.Fragment>
  );
};

export default App;