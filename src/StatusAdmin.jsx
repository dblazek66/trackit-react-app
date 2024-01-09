import { useEffect, useState, useRef } from "react";
import DataTools from "./DataTools";

export default function StatusAdmin({collapse}) {
  const [statuses, setStatuses] = useState([]);
  const [inputStatus, setInputStatus] = useState('');
  const [currentID, setCurrentID] = useState(null)
  const [refresh, setRefresh] = useState(false);
  const ref = useRef(null);

  function handleEditStatus(id) {
    let status = statuses.find((elem) => elem.id == id);
    setInputStatus(status.status);
    setCurrentID(status.id)
  }

  const handleInputStatus = (e) => setInputStatus(e)

  function handleButtonSave(){
    if(!inputStatus)return
    if(currentID == null){
        //Add New
        fetch(`http://localhost:8000/statusList`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({'status':inputStatus}),
      }).then((res) => res.json())
      .then((json) => refreshChild());
    }
    if(currentID!=null){
        //Edit
        fetch(`http://localhost:8000/statusList/${currentID}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({'status':inputStatus}),
        }).then((res) => res.json())
        .then((json) => refreshChild());
    }
  }  

  function handleButtonDelete(){
    if(currentID == null)return
    fetch(`http://localhost:8000/statusList/${currentID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({'status':inputStatus}),
    }).then((res) => res.json())
    .then((json) => refreshChild());
  }
  
  function handleButtonClear(){
    setCurrentID(null)
    setInputStatus('')
    ref.current.focus();
  }
  
  const refreshChild = () => {
    setRefresh(!refresh);
    handleButtonClear()
  }
  useEffect(() => {
    fetch("http://localhost:8000/statusList")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStatuses(data);
      });
  }, [refresh]);

  return (
    <>
     
      <div className={`grid ${collapse}`}>
        <div className="col-6">
          <table className="compact">
            <tbody>
              {statuses &&
                statuses.length &&
                statuses.map((item) => {
                  return (
                  <tr key={item.id}>
                      <td>{item.status}</td>
                      <td>
                        <button
                          className="btn-sm btn-primary"
                          onClick={() => handleEditStatus(item.id)}
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
            <label>Status</label>
            <input 
                className="input-control" 
                type="text" 
                value={inputStatus} 
                ref={ref}
                onChange={(e)=>handleInputStatus(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
