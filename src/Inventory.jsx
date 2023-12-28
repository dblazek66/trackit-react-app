import Dialog from "./Dialog"
import { useState,useEffect } from "react"
import { Link } from "react-router-dom"

export default function Inventory() {

  const [customers,setCustomers] = useState(null);

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
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
