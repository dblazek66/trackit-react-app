import { useState, useEffect } from "react";
export default function DashTwo() {
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <>
      <div className="grid">
        <div className="col-1"></div>
        <div className="col-5">
          <div className="dash-card dash-title">User Directory</div>
        </div>
        <div className="col-5">
          <div className="dash-card dash-title">Open</div>
        </div>
        <div className="col-1"></div> {/*end row one */}
        <div className="col-1"></div>
        <div className="col-5 dash-data">
          {users &&
            users.length &&
            users.map((item) => {
              return <div className="grid">
                    <div className="col-4">{item.name}</div>
                    <div className="col-4">{item.phone}</div>
                    <div className="col-4">{item.email}</div>
                </div>;
            })}
        </div>
        <div className="col-5">
            Open data
        </div>
        <div className="col-1"></div> {/*end row two */}
      </div>
    </>
  );
}
