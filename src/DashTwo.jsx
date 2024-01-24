import { useState, useEffect } from "react";
import { formatSchedDate, getToday } from "./js/common.js";
import { FaCalendar, FaUser  } from "react-icons/fa";

export default function DashTwo() {
  const [users, setUsers] = useState();
  const [schedule, setSchedule] = useState([]);

  const params = new URLSearchParams({
    Status: "Scheduled",
    _get: "ScheduleDate > "+getToday(),
    _sort: "ScheduleDate,ScheduleTime",
    order: "asc",

  });

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/customers?${params}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSchedule(data);
      });
  }, []);

  return (
    <>
      <div className="grid">
        <div className="col-1"></div>
        <div className="col-5">
          <div className="dash-card dash-title"><FaUser /> User Directory</div>
        </div>
        <div className="col-5">
          <div className="dash-card dash-title"><FaCalendar /> Scheduled - Upcoming</div>
        </div>
        <div className="col-1"></div> {/*end row one */}
        <div className="col-1"></div>
        <div className="col-5 dash-data">
          {users &&
            users.length &&
            users.map((item) => {
              return (
                <div className="grid" key={item.uid}>
                  <div className="col-4">{item.name}</div>
                  <div className="col-4">{item.phone}</div>
                  <div className="col-4">{item.email}</div>
                </div>
              );
            })}
        </div>
        <div className="col-5 dash-data">
          {schedule &&
            schedule.length &&
            schedule.filter((dte)=>dte.ScheduleDate>=getToday()).map((item) => {
              return (
                <div className="grid text-sm text-pri" key={item.id}>
                  <div className="col-5">
                    {formatSchedDate(item.ScheduleDate)}
                  </div>
                  <div className="col-2">{item.ScheduleTime}</div>
                  <div className="col-5">{item.Customer}</div>
                </div>
              );
            })}
        </div>
        <div className="col-1"></div> {/*end row two */}
      </div>
    </>
  );
}
