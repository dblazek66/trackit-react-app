import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import StatusHistory from "./StatusHistory";

export default function Info() {

  const { id } = useParams();
  const [customer, setCustomer] = useState([]);
  const [age, setAge] = useState("1");
  const [disabled, setDisabled] = useState(true);
  const [refresh,setRefresh]=useState(false)
  //form values
  const [statusDate, setStatusDate] = useState(getToday());
  const [newstatus, setNewstatus] = useState("");
  const [statusNotes, setStatusNotes] = useState("");
  //sched controls
  const [schedDate, setSchedDate] = useState("");
  const [schedTime, setSchedTime] = useState("");
  const [schedNotes, setSchedNotes] = useState("");
  const ref = useRef(null);

//status inputs
  async function handleNewStatus(val) {
    setNewstatus(val);
    setDisabled(true);
    setSchedTime("");
    setSchedDate("");
    await evalStatus(val)
    ref.current.focus() 
    }

  function evalStatus(val){
    if (val == "Scheduled") {
        setDisabled(false);
        return val
      }
  }

  function handleStatusDate(sdte){ setStatusDate(sdte)  }
  function handleStatusNotes(notes){ setStatusNotes(notes) }
  //scheduling inputs
  function handleScheduleDate(dte) { setSchedDate(dte); }
  function handleScheduleTime(tm) { setSchedTime(tm); }
  function handleScheduleNotes(notes){ setSchedNotes(notes)   }



  function getToday() {
    let dte = new Date().toISOString();
    return dte.substring(0, 10);
  }

  function handleContactAge() {
    let lastContact = new Date(customer.LastContacted);
    if (lastContact == "Invalid Date") lastContact = new Date();
    let today = new Date();
    let diff = today.getTime() - lastContact.getTime();
    let days = Math.round(diff / (1000 * 3600 * 24));
    setAge(days);
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    const status={
      custId: id,
      Status: newstatus,
      statusDate: statusDate,
      statusNotes: statusNotes,
      schedDate: schedDate,
      schedTime: schedTime,
      schedNotes:schedNotes 
    }
      fetch(`http://localhost:8000/status`,{
        method:'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(status)
      }
    ).then(()=>{
      clearFormVals()
      refreshChild()
    })
    //clear all input fields
    //update main record to update Status, Last Contact, scheduling info
  }
  const refreshChild = ()=>{
    setRefresh(!refresh)
  }
  function clearFormVals(){
    setStatusDate('')
    setNewstatus('')
    setStatusNotes('')
    setSchedDate('')
    setSchedTime('')
    setSchedNotes('')
  }

  useEffect(() => {
    fetch(`http://localhost:8000/customers/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCustomer(data);
        handleContactAge();
      });
  }, [age]);

  return (
    <>
      <div className="row">
        <div className="column half">
          <div className="info-card">
            <div className="title-main">{customer.Customer}</div>
            <div className="grid">
              <div className="col-3 grid-lbl">
                <label>Ticket No.</label>
              </div>
              <div className="col-3 grid-val">{customer.TicketNum}</div>
              <div className="col-3 grid-lbl">
                <label>Status</label>
              </div>
              <div className="col-3 grid-val">{customer.Status}</div>
              <div className="col-3 grid-lbl">
                <label>Last Contact</label>
              </div>
              <div className="col-3 grid-val">{customer.LastContacted}</div>
              <div className="col-3 grid-lbl"></div>
              <div className="col-3 grid-val">{age} days ago</div>
              <div className="title col-12">Contact Info</div>
              <div className="col-3 grid-lbl">
                <label>Contact</label>
              </div>
              <div className="col-3 grid-val">{customer.Contact}</div>
              <div className="col-3 grid-lbl">
                <label>Contact Info</label>
              </div>
              <div className="col-3 grid-val">{customer.ContactInfo}</div>
              <div className="col-3 grid-lbl">
                <label>Phone </label>
              </div>
              <div className="col-3 grid-val">{customer.Phone}</div>
              <div className="col-3 grid-lbl">
                <label>Email </label>
              </div>
              <div className="col-3 grid-val">{customer.Email}</div>
              <div className="col-3 grid-lbl">
                <label>Address </label>
              </div>
              <div className="col-9 grid-val">{customer.Address}</div>
              <div className="col-3 grid-lbl">
                <label>City </label>
              </div>
              <div className="col-3 grid-val">{customer.City}</div>
              <div className="col-3 grid-lbl">
                <label>State </label>
              </div>
              <div className="col-3 grid-val">{customer.State}</div>
              <div className="title col-12">Schedule Info</div>
              <div className="col-3 grid-lbl">
                <label>Date </label>
              </div>
              <div className="col-3 grid-val">{customer.ScheduleDate}</div>
              <div className="col-3 grid-lbl">
                <label>Time </label>
              </div>
              <div className="col-3 grid-val">{customer.ScheduleTime}</div>
              <div className="col-3 grid-lbl">
                <label>Location </label>
              </div>
              <div className="col-9 grid-val">{customer.ScheduleLocation}</div>
              <div className="col-3 grid-lbl"></div>
              <div className="col-3 grid-val"></div>
              <div className="col-3 grid-lbl"></div>
              <div className="col-3 grid-val"></div>

            </div>
          </div>
        </div>
        <div className="column half">
          <div className="info-card">
            <div className="title-main">Manage Status</div>
            <form onSubmit={handleSubmit}>
            <div className="grid">
              <div className="col-3 grid-lbl">
                <label>Date</label>
              </div>
              <div className="col-3 grid-val">
                <input
                  className="input-control"
                  onChange={(e) => handleStatusDate(e.target.value)}
                  type="date"
                  value={statusDate}
      
                />
              </div>
              <div className="col-3 grid-lbl">
                <label>Update Status</label>
              </div>
              <div className="col-3 grid-val">
                <select
                  defaultValue={customer.Status}
                  value={newstatus}
                  className="input-control"
                  onChange={(e) => handleNewStatus(e.target.value)}
                >
                  <option value=""></option>
                  <option value="New">New</option>
                  <option value="Contact Initiated">Contact Initiated</option>
                  <option value="Contact Made">Contact Made</option>
                  <option value="In Work">In Work</option>
                  <option value="Hold">Hold</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>
              <div className="col-3 grid-lbl">
                <label>Notes</label>
              </div>
              <div className="col-9 grid-val">
                <textarea 
                className="input-control" 
                rows="3"
                onChange={(e)=>handleStatusNotes(e.target.value)}
                value={statusNotes}
                >
                </textarea>
              </div>
              <div className="title col-12">Scheduling</div>
              <div className="col-3 grid-lbl">
                <label className="">Schedule Date</label>
              </div>
              <div className="col-3 grid-val">
                <input
                  className="input-control"
                  onChange={(e) => handleScheduleDate(e.target.value)}
                  type="date"
                  value={schedDate}
                  disabled={disabled}
                  ref={ref}
                />
              </div>
              <div className="col-3 grid-lbl">
                <label className="">Schedule Time</label>
              </div>
              <div className="col-3 grid-val">
                <input
                  className="input-control"
                  onChange={(e) => handleScheduleTime(e.target.value)}
                  type="time"
                  value={schedTime}
                  disabled={disabled}
                />
              </div>
              <div className="col-3 grid-lbl">
                <label>Schedule Notes</label>
              </div>
              <div className="col-9 grid-val">
                <textarea 
                className="input-control"
                rows="3"
                onChange={(e) => handleScheduleNotes(e.target.value)}
                value={schedNotes}
                disabled={disabled}
                
                >
                </textarea>
              </div>
            </div>
          <div className="col-12 center">
            <input type="submit" className="btn" value="Save" />
          </div>
          </form>
          </div>
          <StatusHistory id={id} refresh={refresh}/>
        </div>
      </div>
    </>
  );
}
