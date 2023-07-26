import React from "react";

//names(keys) are passed in props instead of values
export function SearchFilter({ filterSearchResults }) {
  return (
    <div className="search-bar">
      <label htmlFor="searchBar">Search for your item</label>
      {/* input fields calls the  filterSearchResults whenever there is any change in it*/}
      <input
        type="text"
        name="searchBar"
        id="searchBar"
        onChange={filterSearchResults}
      />
    </div>
  );
}
