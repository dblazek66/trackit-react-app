import { useState, useEffect } from "react";
export default function Dashboard() {
  const [customers, setCustomers] = useState(null);
  const [scheduled, setScheduled] = useState(0);
  const [newStat, setNewStat] = useState(0);
  const [contacted, setContacted] = useState(0);
  const [hold, setHold] = useState(0);
  const [inwork, setInWork] = useState(0);

  function statusCounts(data) {
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
    setScheduled(count_Sched);
    setNewStat(count_New);
    setContacted(count_Contact);
    setHold(count_Hold);
    setInWork(count_InWork);
  }

  useEffect(() => {
    fetch("http://localhost:8000/customers")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        statusCounts(data);
      });
  }, []);
  return (
    <>
      <h2>Dashboard</h2>
      <div className="container">
        <div className="grid">
        <div className="col-1"></div>
            <div className="col-10">
                <div className="dash-card dash-title">Ticket Statuses</div>
            </div>
            <div className="col-1"></div>
            <div className="col-1"></div>
          <div className="col-2">
            <div className="dash-card">
              <div className="dash-title">New</div>
              <div className="dash-count">{newStat}</div>
            </div>
          </div>
          <div className="col-2">
            <div className="dash-card">
              <div className="dash-title">Contacted</div>
              <div className="dash-count">{contacted}</div>
            </div>
          </div>
          <div className="col-2">
            <div className="dash-card">
              <div className="dash-title">Scheduled</div>
              <div className="dash-count">{scheduled}</div>
            </div>
          </div>
          <div className="col-2">
            <div className="dash-card">
              <div className="dash-title">Holding</div>
              <div className="dash-count">{hold}</div>
            </div>
          </div>
          <div className="col-2">
            <div className="dash-card">
              <div className="dash-title">In Work</div>
              <div className="dash-count">{inwork}</div>
            </div>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </>
  );
}
