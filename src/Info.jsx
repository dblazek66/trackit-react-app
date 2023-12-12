import { useEffect, useState } from "react";

export default function Info({idata}){
    const [newstatus,setNewstatus]=useState("")
     
    function handleNewStatus(val){
        setNewstatus(val)
        //update status and date of customer
    }
    function handleScheduleDate(dte){
        console.log(dte)
    }

    useEffect(()=>{
        setNewstatus(idata.Status)
    },[idata])

    return (
      <>
        <div className="info-card">
          <div className="title-main">{idata.Customer}</div>
          <div className="title">Current Status</div>
          <div>
            <label>Status: </label>
            {idata.Status}
          </div>
          <div>
            <label>LastContacted: </label>
            {idata.LastContacted}
          </div>

          <div className="title">Contact Info</div>
          <div>
            <label>Contact: </label>
            {idata.Contact}
          </div>
          <div>
            <label>ContactInfo: </label>
            {idata.ContactInfo}
          </div>

          <div>
            <label>Phone: </label>
            {idata.Phone}
          </div>
          <div>
            <label>Address: </label>
            {idata.Address}
          </div>
          <div>
            <label>City: </label>
            {idata.City}
          </div>
          <div>
            <label>State: </label>
            {idata.State}
          </div>

          <div className="title">Schedule Info</div>
            <div>
                <label>Date: </label>
                {idata.ScheduleDate}
            </div>
            <div>
                <label>Time: </label>
                {idata.ScheduleTime}
            </div>            
            <div>
            <label>Location: </label>
            {idata.ScheduleLocation}
          </div>
            <div>
            <select
                defaultValue={idata.Status}
              value={newstatus}
              className="input-control"
              onChange={(e) => handleNewStatus(e.target.value)}
            >
              <option value=""></option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Scheduled">Scheduled</option>
            </select>
            </div>
          
          <div>
            
            <input 
                className="input-control"
                onChange={(e)=>handleScheduleDate(e.target.value)}
                type="date"
                defaultValue={idata.ScheduleDate}
                value={idata.ScheduleDate||''}
            />
            
          </div>

        </div>
      </>
    );
}







