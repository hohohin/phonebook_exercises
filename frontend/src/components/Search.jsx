import React from "react";

const Search = ({search, handleSearch}) => {
    return(
        <input value={search} onChange={handleSearch} placeholder='search here'></input>
    )
}

export default Search