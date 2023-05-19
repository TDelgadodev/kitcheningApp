/* eslint-disable no-unused-vars */
import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider
} from 'react-router-dom';

import { Home } from "../pages/Home";
import { Courses } from "../pages/Courses";
import { Chefs } from '../pages/Chefs';
import { Users } from '../pages/Users';


const router = createBrowserRouter([
  {
    path : "/",
    element : <Home/>
  },
  {
    path : "/courses",
    element : <Courses/>
  },
  {
    path : "/chefs",
    element : <Chefs/>
  },
  {
    path : "/users",
    element : <Users/>
  },
])

export const AppRouter = () => {
  return <RouterProvider router ={router}/>
}
