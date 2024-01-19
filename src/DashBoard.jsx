import { useState, useEffect } from "react";
import DashOne from "./DashOne";
import DashTwo from "./DashTwo";
export default function Dashboard() {
  
  return (
    <>
      <h2>Dashboard</h2>
      
      <div className="container">
        <DashOne/>
        <DashTwo/>
      </div>
      
    </>
  );
}
