import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Route } from 'react-router-dom'
import Layout from './Layout/Layout'
import { RouteAddCategory, RouteBlog, RouteBlogAdd, RouteBlogDetails, RouteBlogEdit, RouteCategoryDetails, RouteEditCategory, RouteIndex, RouteProfile, RouteSignIn, RouteSignUp } from './helpers/RouteName'
import { Routes } from 'react-router-dom'
import Index from './pages/Index'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import AddCategory from './pages/Category/AddCategory'
import CategoryDetails from './pages/Category/CategoryDetails'
import EditCategory from './pages/Category/EditCategory'
import AddBlog from './pages/Blog/AddBlog'
import BlogDetails from './pages/Blog/BlogDetails'
import EditBlog from './pages/Blog/EditBlog'
import SingleBlogDetails from './pages/SingleBlogDetails'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout/>}>
        <Route index element={<Index/>} />
        <Route path={RouteProfile} element={<Profile/>} />

        {/* blog Category */}
        <Route path={RouteAddCategory} element={<AddCategory/>} />
        <Route path={RouteCategoryDetails} element={<CategoryDetails/>} />
        <Route path={RouteEditCategory} element={<EditCategory/>} />

        {/* blog */}
        <Route path={RouteBlogAdd} element={<AddBlog/>} />
        <Route path={RouteBlog} element={<BlogDetails/>} />
        <Route path={RouteBlogEdit} element={<EditBlog/>} />
        <Route path={RouteBlogDetails} element={<SingleBlogDetails/>} />
        </Route>


        <Route path={RouteSignIn} element={<SignIn/>} />
        <Route path={RouteSignUp} element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
