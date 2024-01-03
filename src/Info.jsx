import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import StatusHistory from "./StatusHistory";
import InfoDem from "./InfoDem";

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
  const [schedLocation, setSchedLocation] = useState("");
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
  function handleScheduleDate(dte) { 
    setSchedDate(dte)
  }
  function handleScheduleTime(tm) { setSchedTime(tm); }
  function handleScheduleLocation(loc){ setSchedLocation(loc);  }
  function handleScheduleNotes(notes){ setSchedNotes(notes)   }

  function getToday() {
    let dte = new Date().toISOString();
    return dte.substring(0, 10);
  }

  function formatSchedDate(dte){
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
    let schedDate  = new Date(dte)
    let formatDate = schedDate.toLocaleDateString('en-US',options)
    return formatDate
}

function formatSchedTime(tme){
    const [hours, minutes, seconds] = tme.split(':');
    return `${(hours > 12) ? hours - 12 : hours}:${minutes}${seconds ? `:${seconds}` : ''} ${(hours >= 12) ? 'PM' : 'AM'}`;
}

  function statusNote(){
    if(newstatus!="Scheduled")return statusNotes
    const str=`Scheduled Date: ${formatSchedDate(schedDate)} 
    Time: ${formatSchedTime(schedTime)} 
    Location: ${schedLocation}`
    return `${statusNotes}  ${str}`
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
      statusNotes: statusNote(),
      schedDate: schedDate,
      schedTime: schedTime,
      schedNotes:schedNotes 
    }

    const customerPatch={
      LastContacted:getToday(),
      Status:newstatus,
      ScheduleDate:schedDate,
      ScheduleTime:schedTime,
      ScheduleLocation:schedLocation,
      ScheduleNotes:schedNotes
    }

      fetch(`http://localhost:8000/status`,{
        method:'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(status)
      }
    ).then(()=>{
      fetch(`http://localhost:8000/customers/${id}`,
      {
        method:'PATCH',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(customerPatch)
      })
      .then(res => res.json())
      .then(json => console.log(json))

      clearFormVals()
      refreshChild()
    })
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
    setSchedLocation('')
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
    <h2>Customer Information & Status Management</h2>
    <div className="container">
      <InfoDem customer={customer} age={age}/>
      <div className="row">
       
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
                <label>Location</label>
              </div>
              <div className="col-9 grid-val">
                <textarea 
                className="input-control"
                rows="1"
                onChange={(e) => handleScheduleLocation(e.target.value)}
                value={schedLocation}
                disabled={disabled}
                >
                </textarea>
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
        </div>
        <div className="column half">
            <StatusHistory id={id} refresh={refresh}/>
        </div>
      </div>
    </div>
    </>
  );
}
