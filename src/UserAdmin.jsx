import { useEffect, useState, useRef } from "react";
import DataTools from "./DataTools";
export default function UserAdmin({collapse}) {
  const [reps, setReps] = useState();
  const [userTypes, setUserTypes] = useState([]);
  const [inputUser, setInputUser] = useState('');
  const [inputUserID, setInputUserID] = useState('');
  const [inputUserType, setInputUserType] = useState('');
  const [currentID, setCurrentID] = useState(null)
  const [refresh, setRefresh] = useState(false);
  const ref = useRef(null);

  function handleButtonSave() {
    const params = {
      "name":inputUser,
      "uid":inputUserID,
      "title":inputUserType
    }
    if(!inputUser)return
    if(!currentID){
        //Add New
        fetch(`http://localhost:8000/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      }).then((res) => res.json())
      .then((json) => refreshChild());
    }
    if(currentID){
        //Edit
        fetch(`http://localhost:8000/users/${currentID}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        }).then((res) => res.json())
        .then((json) => refreshChild());
    }

  }
  function handleButtonDelete() {
    if (!currentID) return;
    fetch(`http://localhost:8000/users/${currentID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => refreshChild());
  }

  function handleButtonClear() {
    setInputUser('');
    setInputUserID('');
    setInputUserType('');
    setCurrentID('')
    ref.current.focus();
  }

  function handleEditUser(id) {
    let user = reps.find((elem) => elem.id == id);
    setInputUser(user.name);
    setInputUserID(user.uid);
    setInputUserType(user.title);
    setCurrentID(user.id)
  }

  const handleUserType = (e) =>  setInputUserType(e)
  const handleUser = (e) =>  setInputUser(e)
  const handleUserID = (e) => setInputUserID(e);

  const refreshChild = () => {
    setRefresh(!refresh);
    handleButtonClear()
  }

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReps(data);
      });
  }, [refresh]);

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
                      <td className="rAlign">
                        <button
                          className="btn-sm btn-edit"
                          onClick={() => handleEditUser(item.id)}
                        >
                          edit
                        </button>
                      </td>
                    </tr>
                  )
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
              ref={ref}
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
                  )
                })}
            </select>
          </div>
        </div>
      </div>
    </>
  )
}
