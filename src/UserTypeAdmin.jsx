import { useEffect, useState, useRef } from "react";
import DataTools from "./DataTools";


export default function UserTypeAdmin({collapse}) {
  const [userTypes, setUserTypes] = useState([]);
  const [inputUserType, setInputUserType] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const ref = useRef(null);

  const handleUserType = (e) => setInputUserType(e);

  const handleEditUserType = (id) => {
    const usertype = userTypes.find((elem) => elem.id == id);
    setInputUserType(usertype.type);
    setCurrentID(usertype.id);
  };

  const refreshChild = () => {
    setRefresh(!refresh);
    handleButtonClear();
  };

  function handleButtonClear() {
    setInputUserType("");
    ref.current.focus();
  }

  function handleButtonSave() {
    if (!inputUserType) return;
    if (!currentID) {
      //Add New
      fetch(`http://localhost:8000/userTypes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: inputUserType }),
      })
        .then((res) => res.json())
        .then((json) => refreshChild());
    }
    if (currentID) {
      //Edit
      fetch(`http://localhost:8000/userTypes/${currentID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: inputUserType }),
      })
        .then((res) => res.json())
        .then((json) => refreshChild());
    }
  }
  function handleButtonDelete() {
    if (!currentID) return;
    fetch(`http://localhost:8000/userTypes/${currentID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => refreshChild());
  }

  useEffect(() => {
    fetch("http://localhost:8000/userTypes")
      .then((res) => {
        return res.json();
      })
      .then((data) => setUserTypes(data));
  }, [refresh]);

  return (
    <>
      <div className={`grid ${collapse}`}>
        <div className="col-6">
          <table className="compact">
            <tbody>
              {userTypes &&
                userTypes.length &&
                userTypes.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.type}</td>
                      <td className="rAlign">
                        <button
                          className="btn-sm btn-edit"
                          onClick={() => handleEditUserType(item.id)}
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
        <div className="col-6">
          <DataTools
            handleButtonClear={handleButtonClear}
            handleButtonSave={handleButtonSave}
            handleButtonDelete={handleButtonDelete}
          />
          <div>
            <label>User Type</label>
            <input
              className="input-control"
              type="text"
              value={inputUserType}
              ref={ref}
              onChange={(e) => handleUserType(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  )
}
