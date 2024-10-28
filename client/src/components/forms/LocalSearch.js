


// import React from 'react';
// import './LocalSearch.css';

// const LocalSearch = ({ keyword, setKeyword }) => {
//   const handleSearchChange = (e) => {
//     e.preventDefault();
//     setKeyword(e.target.value.toLowerCase());
//   };

//   return (
//     <div className="container pt-6 pb-6">
    
//       <input
//         type="search"
//         placeholder="search your category"
//         value={keyword}
//         onChange={handleSearchChange}
//         className="form-control mb-4"
//          aria-describedby="search-icon"
         
//       />
      
//     </div>
//   );
// };

// export default LocalSearch;
import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './LocalSearch.css';

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div className="search-container-wrapper">
      <div className="search-container">
        <input
          type="search"
          placeholder="Search your category"
          value={keyword}
          onChange={handleSearchChange}
          className="input"
          aria-describedby="search-icon"
        />
        {/* <div className="search__icon">
          <SearchOutlined style={{ fontSize: '20px', color: 'white' }} />
        </div> */}
      </div>
    </div>
  );
};

export default LocalSearch;
