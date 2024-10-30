
import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CategoryForm from '../../../components/forms/CategoryForm';
import './CategoryUpdate.css'
const CategoryUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(slug).then((c) => setName(c.data.name));

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
        updateCategory(slug, { name }, user.token)
          .then((res) => {
            setLoading(false);
            setName("");
            Swal.fire("Updated!", `"${res.data.name}" has been updated.`, "success");
            navigate("/admin/category");
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
        <div className="col-md-10 responsive-margin">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update category</h4>
          )}
              <div className="card shadow p-3 mb-5  bg-white rounded " style={{ borderRadius: '10px'}}>
          <CategoryForm handleSubmit={handleSubmit} name ={name} setName={setName}/>
          <hr />
        </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
