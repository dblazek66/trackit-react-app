import { useState, useEffect } from "react";
import { FaTicketAlt } from "react-icons/fa";
export default function DashOne(){
    const [statusCounts,setStatusCounts] = useState([])

    function statusData(data) {
      let count_New = 0;
      let count_Sched = 0;
      let count_Contact = 0;
      let count_Hold = 0;
      let count_InWork = 0;
  
      data.forEach((element) => {
        if (element.Status == "New") {
          count_New++;
        }
        if (element.Status == "Scheduled") {
          count_Sched++;
        }
        if (
          element.Status == "Contact Initiated" ||
          element.Status == "Contact Made"
        ) {
          count_Contact++;
        }
        if (element.Status == "Hold") {
          count_Hold++;
        }
        if (element.Status == "In Work") {
          count_InWork++;
        }
      });
  
      const statusData={
        "Scheduled":count_Sched,
        "New":count_New,
        "Contacted":count_Contact,
        "Hold":count_Hold,
        "InWork":count_InWork
      }
      setStatusCounts(statusData)
    }
    
    useEffect(() => {
      fetch("http://localhost:8000/customers")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          statusData(data)
        });
    }, []);


    return(
        <>
        <div className="grid">
        <div className="col-1"></div>
            <div className="col-10">
                <div className="dash-card dash-title"><FaTicketAlt /> Ticket Statuses</div>
            </div>
            <div className="col-1"></div>
            <div className="col-1"></div>
          <div className="col-2">
            <div className="dash-card">
              <div className="dash-title">New</div>
              <div className="dash-count">{statusCounts.New}</div>
            </div>
          </div>
          <div className="col-2">
            <div className="dash-card">
              <div className="dash-title">Contacted</div>
              <div className="dash-count">{statusCounts.Contacted}</div>
            </div>
          </div>
          <div className="col-2">
            <div className="dash-card">
              <div className="dash-title">Scheduled</div>
              <div className="dash-count">{statusCounts.Scheduled}</div>
            </div>
          </div>
          <div className="col-2">
            <div className="dash-card">
              <div className="dash-title">Holding</div>
              <div className="dash-count">{statusCounts.Hold}</div>
            </div>
          </div>
          <div className="col-2">
            <div className="dash-card">
              <div className="dash-title">In Work</div>
              <div className="dash-count">{statusCounts.InWork}</div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
        </>

    )
}