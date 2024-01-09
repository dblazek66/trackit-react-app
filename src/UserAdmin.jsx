import { useEffect, useState } from "react";
import DataTools from "./DataTools";
export default function UserAdmin({collapse}) {
  const [reps, setReps] = useState();
  const [userTypes, setUserTypes] = useState();
  const [inputUser, setInputUser] = useState();
  const [inputUserID, setInputUserID] = useState();
  const [inputUserType, setInputUserType] = useState();

  function handleButtonSave() {}
  function handleButtonDelete() {}
  function handleButtonClear() {}

  function handleEditUser(id) {
    let user = reps.find((elem) => elem.id == id);
    setInputUser(user.name);
    setInputUserID(user.uid);
    setInputUserType(user.title);
  }

  const handleUserType = (e) =>  setInputUserType(e)
  const handleUser = (e) =>  setInputUser(e)
  const handleUserID = (e) => setInputUserID(e);


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
    fetch("http://localhost:8000/userTypes")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserTypes(data);
      });
  }, []);

  return (
    <>
      <div className={`grid ${collapse}`}>
        <div className="col-6">
          <table>
            <tbody>
              {reps &&
                reps.length &&
                reps.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.title}</td>
                      <td>{item.uid}</td>
                      <td>
                        <button
                          className="btn-sm btn-primary"
                          onClick={() => handleEditUser(item.id)}
                        >
                          edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="col-6 buffer">
          <DataTools
            handleButtonClear={handleButtonClear}
            handleButtonSave={handleButtonSave}
            handleButtonDelete={handleButtonDelete}
          />
          <div>
            <label>User</label>
            <input
              className="input-control"
              type="text"
              onChange={(e) => handleUser(e.target.value)}
              value={inputUser}
            />
          </div>
          <div>
            <label>User ID</label>
            <input
              className="input-control"
              type="text"
              onChange={(e) => handleUserID(e.target.value)}
              value={inputUserID}
            />
          </div>
          <div>
            <label>User Type</label>
            <select
              className="input-control"
              value={inputUserType}
              onChange={(e) => handleUserType(e.target.value)}
            >
              <option></option>
              {userTypes &&
                userTypes.length &&
                userTypes.map((item) => {
                  return (
                    <option key={item.id} value={item.type}>
                      {item.type}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
