import React from "react";
import { HiSearch } from "react-icons/hi";

const SearchContainer = ({ search, handleChange }) => {
  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        name="search"
        placeholder="Search"
        value={search}
        onChange={handleChange}
        autocomplete="off"
      />
      <button className="search__button">
        <HiSearch className="search-icon" />
      </button>
    </div>
  );
};

export default SearchContainer;
