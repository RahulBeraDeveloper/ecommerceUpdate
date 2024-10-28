// import React from 'react'



// const CategoryForm = ({handleSubmit,name,setName}) => (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label>Name</label>
//         <input
//           type="text"
//           className="form-control"
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//           autoFocus
//           required
//         />
//         <br />
//         <button className="btn btn-outline-primary">Save</button>
//       </div>
//     </form>
// )


// export default CategoryForm


import React from 'react';
import './CategoryForm.css';

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label></label>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setName(e.target.value)}
        placeholder='Enter your new category'
        value={name}
        autoFocus
        required
      />
      <br />
       <button className='btn btn-outline-primary'>Save</button>
    </div>
  </form>
);

export default CategoryForm;
