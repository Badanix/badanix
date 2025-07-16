import { useState } from "react";
import { IoIosCloseCircle, IoIosSearch } from "react-icons/io";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { APIURLS, defaultUrl } from "./Constants";

const SearchMobile = ({ placeholder, customClassName, searchValue }) => {
  const apiForInstitution = APIURLS.INSITUTION_API;
  const apiForDoctor = APIURLS.APIURLPATIENTSFINDDoctorSpecializationSearch;
  const [search, setSearch] = useState(searchValue || "");
  const [searchResults, setSearchResults] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length >= 1) {
      fetchData(value);
    } else {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setSearchResults([]);
  };

  const fetchData = async (query) => {
    const apiUrlForDoctor = `${apiForDoctor}fullname=${query}&specialization=${query}&gender=${query}`;
    const apiUrlForInstitution = `${apiForInstitution}institution_type=${query}&institution_name=${query}&address=${query}`;

    try {
      const [doctorResponse, institutionResponse] = await Promise.all([
        fetch(apiUrlForDoctor, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }),
        fetch(apiUrlForInstitution, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }),
      ]);

      if (!doctorResponse.ok || !institutionResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const doctorData = await doctorResponse.json();
      const institutionData = await institutionResponse.json();

      let filteredResults = [];

      if (doctorData?.data) {
        filteredResults = [
          ...filteredResults,
          ...doctorData.data.filter(
            (item) =>
              item.fullname.toLowerCase().includes(query.toLowerCase()) ||
              item.specialization.toLowerCase().includes(query.toLowerCase()) ||
              item.gender.toLowerCase().includes(query.toLowerCase())
          ),
        ];
      }

      if (institutionData?.data) {
        filteredResults = [
          ...filteredResults,
          ...institutionData.data.filter(
            (item) =>
              item.institution_name.toLowerCase().includes(query.toLowerCase()) ||
              item.institution_type.toLowerCase().includes(query.toLowerCase()) ||
              item.address.toLowerCase().includes(query.toLowerCase())
          ),
        ];
      }

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResults([]);
    }
  };

  return (
    <div className="relative px-4 py-2 dark:border-gray-500">
      <div className="flex items-center border border-gray-300 rounded-full dark:bg-gray-900 dark:border-gray-600 dark:text-white px-3 py-2">
        <IoIosSearch className="text-gray-500 dark:text-gray-400 mr-2" size={20} />
        <input
          type="text"
          placeholder={placeholder || "Search..."}
          value={search}
          onChange={handleSearchChange}
          className={`w-full border-none outline-none capitalize bg-transparent ${customClassName}`}
        />
        {search && (
          <IoIosCloseCircle
            onClick={clearSearch}
            className="text-secondary text-2xl cursor-pointer ml-2"
          />
        )}
      </div>

      {/* Inline Search Results */}
      {search && (
        <div className="absolute left-0 right-0 mt-2 bg-white z-50 rounded-lg shadow-lg max-h-[60vh] overflow-y-auto px-4 py-2">
          {searchResults.length === 0 ? (
            <p className="text-center text-gray-500">No results found.</p>
          ) : (
            searchResults.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.fullname) {
                    navigate(
                      `/DoctorsBooking?specialization=${encodeURIComponent(item.specialization)}&doctor_id=${item.id}`
                    );
                  } else if (item.institution_name) {
                    navigate(`/InstitutionDetails/${item.id}`);
                  }
                }}
                className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 rounded-sm"
              >
                {item.fullname ? (
                  <div className="flex items-center">
                    <img
                      src={`${defaultUrl}${item.prof_pics}`}
                      alt={item.fullname}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-2">
                      <p className="capitalize text-gray-700">{item.fullname}</p>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.specialization.endsWith("s")
                          ? item.specialization.slice(0, -1)
                          : item.specialization}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <img
                      src={`${defaultUrl}${item.logo}`}
                      alt={item.institution_name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-2">
                      <p className="capitalize text-gray-700">{item.institution_name}</p>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.institution_type}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

SearchMobile.propTypes = {
  placeholder: PropTypes.string,
  customClassName: PropTypes.string,
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func,
  onFilterChange: PropTypes.func,
};

export default SearchMobile;
