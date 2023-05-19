/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import { UseFetch } from "../hooks/useFetch";
import { CategoryCard } from "./CategoryCard";

export const CategoriesInDb = () => {

  const [state, setState] = useState({
    laoding : true,
    categories : []
  });

  useEffect(() => {
    
    UseFetch('/categories')
    
    .then(({ok,data}) =>{
      console.log(data);
      const {categories} = data;
      setState({
        laoding : false,
        categories

      })

    })
    .catch(error => console.log(error))


  }, []);
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Categories in Data Base
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {
            state.laoding ?
            <p>Cargando...</p> :
            state.categories.map( categorie=> <CategoryCard {...categorie} key={state.categories.name}/>)
          }
          </div>
        </div>
      </div>
    </div>
  );
};
