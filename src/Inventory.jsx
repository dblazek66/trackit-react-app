import Dialog from "./Dialog"
import { useState,useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Inventory() {
  const navigate = useNavigate();
  const [customers,setCustomers] = useState(null);


  const handleEdit = (id)=>{
    navigate(`/info/${id}`)
  }

  const handleStatus = (id)=>{
    navigate(`/customers/${id}`)
  }

  useEffect(()=>{
    fetch('http://localhost:8000/customers')
    .then(res =>{
      return res.json()
    })
    .then(data=>{
      setCustomers(data)
    })
  },[])

  return (
    <>
       <table>
        <thead>
          <tr>
            <th>info</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Contact</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Last Contact</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.length &&
            customers.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <Link to={`/info/${item.id}`}>
                      {item.TicketNum}
                    </Link>
                  </td>
                  <td>{item.Customer}</td>
                  <td>{item.Status}</td>
                  <td>{item.Contact}</td>
                  <td>{item.ContactInfo || item.Phone}</td>
                  <td>{item.Email}</td>
                  <td>{item.LastContacted || "-"}</td>
                  <td>

                    <button className="btn-sm btn-blue" onClick={()=>handleEdit(item.id)}>edit</button>
                    <button className="btn-sm btn-red" onClick={()=>handleStatus(item.id)}>status</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
