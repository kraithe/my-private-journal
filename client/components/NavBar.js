import React, { Fragment, useState, useEffect } from 'react';
import CreateEntry from './AddEntry.js';

const NavBar = (props) => {
  let [searchTerm, setSearchTerm] = useState('');

  const fullTextSearch = function(e) {
    e.preventDefault();
    let filtered = [];
    for (let i = 0; i < props.entries.length; i++) {
      if (props.entries[i].entry_text.includes(searchTerm)) {
        filtered.push(props.entries[i]);
      }
    }
    props.updateEntries(filtered);
  }

  return (
    <React.Fragment>
      <div className="navbar-content">
        <form>
        <label for="search-form">Search your journal by topic:</label>
          <input
            type="text"
            id="search-form"
            name="search-form"
            value={searchTerm}
            placeholder="e.g. school, anniversary, travel"
            onChange={(e) => setSearchTerm(e.target.value)}
            >
          </input>
          <button
            className="navbar-search"
            onClick={(e) => fullTextSearch(e)}
          >
          Search
        </button>
        </form>
      </div>
      <CreateEntry />
    </React.Fragment>
  );
};

export default NavBar;