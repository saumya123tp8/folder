import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import "../styles/categories.css"
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"all categories"}>
      {/* <h1>all categories</h1>
       */}
      <div className="containerc" style={{ marginTop: "60px", overflow: "auto"  }}>
        <div className="row container">
          {categories.map((c) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
            <div className="card">
              <Link to={`/category/${c.slug}`} className="modi btn cat-btn">
                {c.name}
              </Link>
              {/* <h1>hii</h1> */}
            </div>
          </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
