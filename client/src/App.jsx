import React from 'react'
import { Button } from './components/ui/button'
import { BrowserRouter, Route } from 'react-router-dom'
import Layout from './Layout/Layout'
import { RouteIndex } from './helpers/RouteName'
import { Routes } from 'react-router-dom'
import Index from './pages/Index'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout/>}>
        <Route index element={<Index/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
