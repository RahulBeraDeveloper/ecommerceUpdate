import React, { useState, useEffect } from 'react'
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from 'react-redux';
import { createSub, getSub, getSubs, removeSub } from "../../../functions/subCategory";
import {  getCategories } from '../../../functions/category';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
const SubCreate = () => {

    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);
    const [category, setCategory] = useState("");
    // step 1
    const [keyword, setKeyword] = useState("");
  
    useEffect(() => {
      loadCategories();
      loadSubs();
    }, []);
  
    const loadCategories = () =>
      getCategories().then((c) => setCategories(c.data));
  
    const loadSubs = () => 
      getSubs().then((s) => setSubs(s.data));
    

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name,parent:category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        Swal.fire("Success", `"${res.data.name}" is created`, "success");
        loadSubs();
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
        removeSub(slug, user.token)
          .then((res) => {
            setLoading(false);
            Swal.fire("Deleted", `${res.data.name} has been deleted`, "success");
            loadSubs();
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
    return subs.filter((sub) =>
      sub.name.toLowerCase().includes(keyword)
    );
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
            <h4>subCreate category</h4>
          )}
          <div className="card shadow p-3 mb-6 mt-2  bg-white rounded" style={{ borderRadius: '10px'}}>
         <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {searched(keyword).map((s) => (
            // <div className="alert alert-secondary  category-alert" key={c._id}>

            <div className="alert alert-secondary category-alert d-flex justify-content-between align-items-center" key={s._id}>
              <span className="flex-grow-1">{s.name}</span>
              <div>
                <span onClick={() => handleRemove(s.slug)} className="btn btn-sm">
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreate