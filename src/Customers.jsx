import { useEffect, useState } from "react"

export default function Customers(){
    const [reps,setReps]= useState([])

    useEffect(()=>{
        fetch('http://localhost:8000/representatives')
        .then(res =>{
          return res.json()
        })
        .then(data=>{
            setReps(data)
            console.log(data)
        })
    },[])
    return(
        <>

        <div className="info-card">
            <div className="title-main">Create New Customer Record</div>
            <div className="grid">
                <div className="col-4">
                <div className="title-sub">Customer</div>
                    <label>Customer</label>
                    <input className="input-control"/>
                    <label>Phone</label>
                    <input className="input-control"/>
                    <label>Email</label>
                    <input className="input-control"/>
                    <label>Address</label>
                    <input className="input-control"/>
                    <label>City</label>
                    <input className="input-control"/>
                    <div className="grid">
                        <div className="col-6">
                            <label>State</label>
                            <input className="input-control"/>                            
                        </div>
                        <div className="col-6">
                            <label>Zip</label>
                            <input className="input-control"/>       
                        </div>
                    </div>
                </div>
                <div className="col-4">
                <div className="title-sub">Contact Information</div>
                    <label>Contact Name</label>
                    <input className="input-control"/>
                    <label>Phone</label>
                    <input className="input-control"/>
                    <label>Email</label>
                    <input className="input-control"/>
                </div>
                <div className="col-4">
                <div className="title-sub">Administrative</div>
                    <label>Representative Assigned</label>
                    <select className="input-control">
                        <option></option>
                        {reps && reps.length && reps.map((item)=>{
                            return(
                                <option key={item.uid} value={item.uid}>{item.name}</option>
                            )
                            
                        })}
                    </select>


                    <label>Ticket Number</label>
                    <input className="input-control"/>
                    <label>ABC</label>
                    <input className="input-control"/>
                </div>
            </div>

        </div>
        </>
        
    )
}