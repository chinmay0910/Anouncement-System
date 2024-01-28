import { useEffect, useState } from 'react'
import './App.css'
import { Signin, Home } from './modules/index'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {

  return (
        <Router>
          <Routes>
            <Route path='/account/signin' element={<Signin/>}></Route>
            <Route path='/*' element={<Home/>}></Route>
          </Routes>
        </Router>
  )
}

export default App
