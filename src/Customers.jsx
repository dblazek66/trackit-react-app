import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { getToday, stateList, validateForm } from "./js/common.js";
import { FaSave } from "react-icons/fa";
export default function Customers() {
  const { id } = useParams();
  const [button, setButton] = useState("Save");
  const navigate = useNavigate();
  const [reps, setReps] = useState([]);
  const [usStates, setUSStates] = useState([]);
  const [customerObj, setCustomerObj] = useState([]);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [contact, setContact] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [ticketnum, setTicketNum] = useState("");
  const [assigned, setAssigned] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  /*
  to do - add required to all fields requiring validation
  add alert to save functions

*/ /*
  to do - add required to all fields requiring validation
  add alert to save functions

*/

  function handleCustomer(e) {
    setCustomer(e);
  }

  function handlePhone(e) {
    setPhone(e);
  }
  function handleEmail(e) {
    setEmail(e);
  }
  function handleAddress(e) {
    setAddress(e);
  }
  function handleCity(e) {
    setCity(e);
  }
  function handleState(e) {
    setState(e);
  }
  function handleZip(e) {
    setZip(e);
  }
  function handleContact(e) {
    setContact(e);
  }
  function handleContactPhone(e) {
    setContactPhone(e);
  }
  function handleCustomerNotes(e) {
    setCustomerNotes(e);
  }
  function handleAssigned(e) {
    setAssigned(e);
  }
  function handleTicketNum(e) {
    setTicketNum(e);
  }
  function handleSubmit(e) {
    e.preventDefault();
    let valid = validateForm();
    if (!valid) return;
    button == "New Customer" ? saveNewCustomer() : saveCustomerByID();
  }

  function saveNewCustomer() {
    //POST
    const newCustomer = {
      LastContacted: getToday(),
      Customer: customer,
      TicketNum: ticketnum,
      Phone: phone,
      Email: email,
      Address: address,
      City: city,
      State: state,
      Zip: zip,
      Status:"New",
      Contact: contact,
      ContactInfo: contactPhone,
      CustomerNotes: customerNotes,
      AssignedTo: assigned,
      ScheduleDate: "",
      ScheduleTime: "",
      ScheduleLocation: "",
      ScheduleNotes: "",
    };
    fetch(`http://localhost:8000/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    }).then(navigate("/inventory"));
  }

  function saveCustomerByID() {
    //PATCH
    const customerPatch = {
      LastContacted: getToday(),
      Customer: customer,
      TicketNum: ticketnum,
      Phone: phone,
      Email: email,
      Address: address,
      City: city,
      State: state,
      Zip: zip,
      Contact: contact,
      ContactInfo: contactPhone,
      CustomerNotes: customerNotes,
      AssignedTo: assigned,
    };
    fetch(`http://localhost:8000/customers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerPatch),
    })
      .then((res) => res.json())
      //.then((json) => alert('Record Saved'))
      .then(navigate("/inventory"));
  }

  function setDefaultCustomer(data) {
    setCustomerObj(data);
    setCustomer(data.Customer || "");
    setPhone(data.Phone || "");
    setEmail(data.Email || "");
    setAddress(data.Address || "");
    setCity(data.City || "");
    setState(data.State) || "";
    setZip(data.Zip || "");
    setContact(data.Contact || "");
    setContactPhone(data.ContactInfo || "");
    setCustomerNotes(data.CustomerNotes || "");
    setAssigned(data.AssignedTo || "");
    setTicketNum(data.TicketNum || "");
  }

  function handleStatusNav(){
     if(!id) return
    navigate(`/info/${id}`)
  }

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReps(data);
      });
  }, []);

  useEffect(() => {
    if (!id) {
      setDefaultCustomer([]);
      setButton("New Customer");
      return;
    }
    fetch(`http://localhost:8000/customers/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDefaultCustomer(data);
        setButton("Edit Customer");
      });
  }, [id]);

  useEffect(() => {
    setUSStates(stateList);
  });
  return (
    <>
      <h2>{button} Record {id} </h2>
      <div className="container">
        <form id="frmCustomer" name="frmCustomer">
          <div>
            <div className="grid">
              <div className="col-4">
                <div className="title-sub">Customer</div>
                <label>Customer</label>
                <input
                  className="input-control"
                  onChange={(e) => handleCustomer(e.target.value)}
                  value={customer}
                  required
                />
                <label>Phone</label>
                <input
                  className="input-control"
                  onChange={(e) => handlePhone(e.target.value)}
                  value={phone}
                  required
                />

                <label>Address</label>
                <input
                  className="input-control"
                  onChange={(e) => handleAddress(e.target.value)}
                  value={address}
                  required
                />
                <label>City</label>
                <input
                  className="input-control"
                  onChange={(e) => handleCity(e.target.value)}
                  value={city}
                  required
                />
                <div className="grid">
                  <div className="col-6">
                    <label>State</label>
                    <select
                      className="input-control"
                      onChange={(e) => handleState(e.target.value)}
                      value={state}
                      required
                    >
                      {usStates &&
                        usStates.length &&
                        usStates.map((item) => {
                          return (
                            <option key={crypto.randomUUID()} value={item.name}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-6">
                    <label>Zip</label>
                    <input
                      className="input-control"
                      onChange={(e) => handleZip(e.target.value)}
                      value={zip}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="title-sub">Contact Information</div>
                <label>Contact Name</label>
                <input
                  className="input-control"
                  onChange={(e) => handleContact(e.target.value)}
                  value={contact}
                  required
                />
                <label>Phone</label>
                <input
                  className="input-control"
                  onChange={(e) => setContactPhone(e.target.value)}
                  value={contactPhone}
                  required
                />
                <label>Email</label>
                <input
                  className="input-control"
                  onChange={(e) => handleEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="col-4">
                <div className="title-sub">Administrative 
                <button onClick={()=>handleStatusNav()} className="btn-sm btn-edit">Status</button>
                </div>
                <label>Ticket Number</label>
                <input
                  className="input-control"
                  onChange={(e) => handleTicketNum(e.target.value)}
                  value={ticketnum}
                />
                <label>Representative Assigned</label>
                <select
                  className="input-control"
                  onChange={(e) => handleAssigned(e.target.value)}
                  value={assigned}
                >
                  <option></option>
                  {reps &&
                    reps.length &&
                    reps.map((item) => {
                      return (
                        <option key={item.uid} value={item.uid}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
                <label>Customer Notes</label>
                <textarea
                  className="input-control"
                  onChange={(e) => handleCustomerNotes(e.target.value)}
                  value={customerNotes}
                  rows="6"
                />
              </div>
              <div className="col-12 center">
                <button className="btn" type="submit" onClick={handleSubmit}>
                  <FaSave /> {button}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
