import "./styles.css"
import {useState,useEffect} from 'react'
import Inventory from "./Inventory";
import DashBoard from "./DashBoard";
import Customers from "./Customers";
import NavBar from "./NavBar"
import Info from "./Info";
import Schedule from "./Schedule";
import Admin from "./Admin";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

export default function App(){

  const [isLoggedin,setIsLoggedin]=useState("")

    useEffect(()=>{
      setIsLoggedin(true)
    })
  return (
    <Router>
      { isLoggedin ? <NavBar/> : ""}
      <div className="content">
          <Routes>
            <Route path="/login" element={<Login/>}/>  
            <Route path="/" element={<DashBoard/>}/>
            <Route path="/inventory" element={<Inventory/>}/>
            <Route path="/customers" element={<Customers/>}/>
            <Route path="/customers/:id" element={<Customers/>}/>
            <Route path="/info/:id" element={<Info/>}/>
            <Route path="/Schedule" element={<Schedule/>}/>
            <Route path="/admin" element={<Admin/>}/>
          </Routes>        
      </div>
    </Router>
  );
 
    

  


}
