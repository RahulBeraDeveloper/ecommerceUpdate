import React, { useState, useEffect } from 'react'
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from 'react-redux';
import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
const CategoryCreate = () => {


  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  //searching and filtering 
  //step1 
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        Swal.fire("Success", `"${res.data.name}" is created`, "success");
        loadCategories();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) {
          Swal.fire("Error", err.response.data, "error");
        }
      });
  };

  const handleRemove = async (slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        removeCategory(slug, user.token)
          .then((res) => {
            setLoading(false);
            Swal.fire("Deleted", `${res.data.name} has been deleted`, "success");
            loadCategories();
          })
          .catch((err) => {
            setLoading(false);
            if (err.response.status === 400) {
              Swal.fire("Error", err.response.data, "error");
            }
          });
      }
    });
  };


  const searched = (keyword) => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(keyword)
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
 
        <div className="col-md-10  responsive-margin" >
     
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Create category</h4>
          )}

   <div className="card shadow p-3 mb-6 mt-2  bg-white rounded" style={{ borderRadius: '10px'}}>
          <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {searched(keyword).map((c) => (
            // <div className="alert alert-secondary  category-alert" key={c._id}>
            //   {c.name}
            //   <span onClick={() => handleRemove(c.slug)} className="btn btn-sm float-right">
            //     <DeleteOutlined className="text-danger" />
            //   </span>
            //   <Link to={`/admin/category/${c.slug}`}>
            //     <span className="btn btn-sm float-right">
            //       <EditOutlined className="text-warning" />
            //     </span>
            //   </Link>
            // </div>
         
            <div className="alert alert-secondary category-alert d-flex justify-content-between align-items-center" key={c._id}>
              <span className="flex-grow-1">{c.name}</span>
              <div>
                <span onClick={() => handleRemove(c.slug)} className="btn btn-sm">
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link to={`/admin/category/${c.slug}`}>
                  <span className="btn btn-sm">
                    <EditOutlined className="text-warning" />
                  </span>
                </Link>
              </div>
       
            </div>


          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCreate