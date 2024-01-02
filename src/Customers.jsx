import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stateList from "./stateslist.js";
import { FaSave } from "react-icons/fa";
export default function Customers() {
  const { id } = useParams();
  const [button, setButton] = useState("Save");
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
    button == "New Customer" ? saveNewCustomer() : saveCustomerByID();
  }

  function saveNewCustomer() {
    alert(button);
  }
  function saveCustomerByID() {
    alert(button);
    console.log(customer);
  }

  function setDefaultCustomer(data) {
    console.log("DATA",data)
    setCustomerObj(data);
    setCustomer(data.Customer||'');
    setPhone(data.Phone||'');
    setEmail(data.Email||'');
    setAddress(data.Address||'');
    setCity(data.City||'');
    setState(data.State)||'';
    setZip(data.Zip||'');
    setContact(data.Contact||'');
    setContactPhone(data.ContactInfo||'');
    setCustomerNotes(data.CustomerNotes||'');
    setAssigned(data.AssignedTo||'');
    setTicketNum(data.TicketNum||'');
  }

  useEffect(() => {
    fetch("http://localhost:8000/representatives")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReps(data);
      });
  }, []);

  useEffect(() => {
    if (typeof id === "undefined") {
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
      <div className="info-card">
        <div className="title-main">{button} Record</div>
        <div className="grid">
          <div className="col-4">
            <div className="title-sub">Customer</div>
            <label>Customer</label>
            <input
              className="input-control"
              onChange={(e) => handleCustomer(e.target.value)}
              value={customer}
            />
            <label>Phone</label>
            <input
              className="input-control"
              onChange={(e) => handlePhone(e.target.value)}
              value={phone}
            />

            <label>Address</label>
            <input
              className="input-control"
              onChange={(e) => handleAddress(e.target.value)}
              value={address}
            />
            <label>City</label>
            <input
              className="input-control"
              onChange={(e) => handleCity(e.target.value)}
              value={city}
            />
            <div className="grid">
              <div className="col-6">
                <label>State</label>
                <select
                  className="input-control"
                  onChange={(e) => handleState(e.target.value)}
                  value={state}
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
            />
            <label>Phone</label>
            <input
              className="input-control"
              onChange={(e) => setContactPhone(e.target.value)}
              value={contactPhone}
            />
            <label>Email</label>
            <input
              className="input-control"
              onChange={(e) => handleEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="col-4">
            <div className="title-sub">Administrative</div>
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
    </>
  );
}
