import { useState } from 'react';
import { IoIosCloseCircle, IoIosSearch } from 'react-icons/io';
import PropTypes from 'prop-types';

const Search = ({ placeholder, customClassName, searchValue, onSearchChange, items, onFilterChange }) => {
  const [search, setSearch] = useState(searchValue || "");

  // Clear search input
  const clearSearch = () => {
    onSearchChange("");
    setSearch(searchValue || "");
    onFilterChange(items);  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value); // Notify parent about the search change
    
    // Filter items based on the search value
    const filteredItems = items.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    onFilterChange(filteredItems); // Update filtered items
  };

  return (
    <div className="relative px-4 py-2 dark:border-gray-500">
      {/* Search Input */}
      <div className="flex items-center border border-gray-300 rounded-full dark:bg-gray-900 dark:border-gray-600 dark:text-white focus-within:ring-[#a5e6e9] focus-within:border-[#a5e6e9] focus-within:bg-[#e8f3f3]">
        <IoIosSearch className="text-gray-500 dark:text-gray-400 ml-3" size={20} />
        <input
          type="text"
          className={` px-3 py-2 border-none rounded-full dark:bg-gray-900 dark:text-white focus:outline-none capitalize ${customClassName}`}
          placeholder={placeholder}
          value={search}
          onChange={handleSearchChange}
        />
        {/* Clear Button */}
        {search && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-2"
            onClick={clearSearch}
          >
            <IoIosCloseCircle
              className="text-primary dark:text-gray-300 mr-6 cursor-pointer"
              size={20}
            />
          </button>
        )}
      </div>
    </div>
  );
};

Search.propTypes = {
  placeholder: PropTypes.string,
  customClassName: PropTypes.string,
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Search;
