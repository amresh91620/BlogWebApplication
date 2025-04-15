import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import { RouteAddCategory, RouteBlog, RouteBlogAdd, RouteBlogDetails, RouteBlogEdit, RouteCategoryDetails, RouteEditCategory, RouteIndex, RouteProfile, RouteSignIn, RouteSignUp } from './helpers/RouteName';
import Index from './pages/Index';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import AddCategory from './pages/Category/AddCategory';
import CategoryDetails from './pages/Category/CategoryDetails';
import EditCategory from './pages/Category/EditCategory';
import AddBlog from './pages/Blog/AddBlog';
import BlogDetails from './pages/Blog/BlogDetails';
import EditBlog from './pages/Blog/EditBlog';
import SingleBlogDetails from './pages/SingleBlogDetails';
import ManageComments from "./pages/ManageComments";
import ManageUsers from "./pages/ManageUsers";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />

          {/* Blog Category */}
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteEditCategory} element={<EditCategory />} />

          {/* Blog */}
          <Route path={RouteBlogAdd} element={<AddBlog />} />
          <Route path={RouteBlog} element={<BlogDetails />} />
          <Route path={RouteBlogEdit} element={<EditBlog />} />
          <Route path="/blog/:id" element={<SingleBlogDetails />} />
        </Route>

        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />} />

        <Route path="/manage-comments" element={<ManageComments />} />
        <Route path="/manage-users" element={<ManageUsers />} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default App;
