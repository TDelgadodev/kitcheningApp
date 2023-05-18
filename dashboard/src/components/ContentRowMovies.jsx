// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Metric } from "./Metric";

export const ContentRowMovies = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState({
    courses: {
      title: "Cursos",
      color: "primary",
      value: 0,
      icon: "fa-film",
    },
    chefs: {
      title: "Chefs",
      color: "success",
      value: 0,
      icon: "fa-award",
    },
    users: {
      title: "Usuarios",
      color: "warning",
      value: 0,
      icon: "fa-user",
    },
  });

  useEffect( () => {
    
      fetch("http://localhost:4000/api/metrics")
      .then(response => { 
        return response.json();
      })
      .then(({ok,data}) => { 

        if(ok){
          const {totalCourses,totalChefs,totalUsers} = data;
          setState({
            ...state,
            courses : {
              ...state.courses,
              value : totalCourses
            },
            chefs : {
              ...state.chefs,
              value : totalChefs
            },
            users : {
              ...state.users,
              value : totalUsers
            }
            
          })
        }

      })
      .catch(error => console.log(error))
     
  }, []);

  return (
    <div className="row">
      <Metric {...state.courses} />
      <Metric {...state.chefs} />
      <Metric {...state.users} />
    </div>
  );
};
