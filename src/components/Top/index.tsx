// import { useState } from "react";
import { useAppContext } from "../../utils/AppContext";

interface SearchInputProps {
  onSearch: (page: number) => void;
}

const SearchTop = ({ onSearch }: SearchInputProps) => {
  const { searchInput, updateSearchValue } = useAppContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchValue(event.target.value.trim());
  };

  const handleSearch = () => {
    onSearch(1);
  }

  return (
    <div className="search-form">
      <input
        type="text"
        value={searchInput}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchTop;
