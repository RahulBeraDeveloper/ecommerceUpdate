
// import React, { useState, useEffect } from "react";
// import AdminNav from "../../../components/nav/AdminNav"
// import { useSelector } from "react-redux";
// import { getCategories } from "../../../functions/category";
// import { updateSub, getSub } from "../../../functions/subCategory";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import CategoryForm from '../../../components/forms/CategoryForm';

// const SubUpdate = (match) => {
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => ({ ...state }));
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [parent, setParent] = useState("");
//   useEffect(() => {
//     loadCategories();
//     loadSub();
//   }, []);

//   const loadCategories = () =>
//     getCategories().then((c) => setCategories(c.data));

  
//   const loadSub = () =>
//     getSub(match.params.slug).then((s) => {
//       setName(s.data.name);
//       setParent(s.data.parent);
//     });


//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to update this category?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, update it!",
//       cancelButtonText: "No, cancel!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setLoading(true);
//         updateSub(match.params.slug,{ name , parent}, user.token)
//           .then((res) => {
//             setLoading(false);
//             setName("");
//             Swal.fire("Updated!", `"${res.data.name}" has been updated.`, "success");
//             navigate("/admin/category");
//           })
//           .catch((err) => {
//             setLoading(false);
//             if (err.response && err.response.status === 400) {
//               Swal.fire("Error", err.response.data, "error");
//             } else {
//               Swal.fire("Error", "Something went wrong", "error");
//             }
//           });
//       }
//     });
//   };



//   return (
//     <div className="container-fluid">
//     <div className="row">
//       <div className="col-md-2">
//         <AdminNav />
//       </div>
//       <div className="col">
//         {loading ? (
//           <h4 className="text-danger">Loading..</h4>
//         ) : (
//           <h4>Update sub category</h4>
//         )}

//         <div className="form-group">
//           <label>Parent category</label>
//           <select
//             name="category"
//             className="form-control"
//             onChange={(e) => setParent(e.target.value)}
//           >
//             <option>Please select</option>
//             {categories.length > 0 &&
//               categories.map((c) => (
//                 <option key={c._id} value={c._id} selected={c._id === parent}>
//                   {c.name}
//                 </option>
//               ))}
//           </select>
//         </div>

//         <CategoryForm
//           handleSubmit={handleSubmit}
//           name={name}
//           setName={setName}
//         />
//       </div>
//     </div>
//   </div>
//   );
// };

// export default SubUpdate;
import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { updateSub, getSub } from "../../../functions/subCategory";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CategoryForm from '../../../components/forms/CategoryForm';

const SubUpdate = () => {
  const { slug } = useParams(); // Get slug from useParams
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSub(slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        updateSub(slug, { name, parent }, user.token)
          .then((res) => {
            setLoading(false);
            setName("");
            Swal.fire("Updated!", `"${res.data.name}" has been updated.`, "success");
            navigate("/admin/sub");
          })
          .catch((err) => {
            setLoading(false);
            if (err.response && err.response.status === 400) {
              Swal.fire("Error", err.response.data, "error");
            } else {
              Swal.fire("Error", "Something went wrong", "error");
            }
          });
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10  responsive-margin">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update Sub Category</h4>
          )}
       <div className="card shadow p-3 mb-6 mt-2  bg-white rounded" style={{ borderRadius: '10px'}}>
          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default SubUpdate;
