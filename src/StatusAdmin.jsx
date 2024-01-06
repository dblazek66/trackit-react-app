import { useEffect, useState, useRef } from "react";
import { FaSave, FaPlus, FaTrash, FaBan,FaChevronDown, FaChevronUp } from "react-icons/fa";
export default function StatusAdmin() {
  const [statuses, setStatuses] = useState([]);
  const [inputStatus, setInputStatus] = useState();
  const [currentID, setCurrentID] = useState(null)
  const [refresh, setRefresh] = useState(false);
  const ref = useRef(null);
  const [collapse,setCollapse]=useState('show');
  const [chevron,setChevron]=useState(<FaChevronDown/>);

  function handleCollapse(){
      if(collapse == 'hide'){
          setCollapse('show')
          setChevron(<FaChevronDown/>)
          return
      }
      if(collapse == 'show'){
          setCollapse('hide')
          setChevron(<FaChevronUp/>)
          return
      }
  }
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
      <div className="title-sub" onClick={()=>handleCollapse()}>Status Management <span className="toRight">{chevron}</span></div>
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
          <div className="info-card">
            <button className="btn-tool" onClick={(e)=>handleButtonClear()}>
              <FaPlus /> New
            </button>
            <button className="btn-tool" onClick={(e)=>handleButtonSave()}>
              <FaSave /> Save
            </button>
            <button className="btn-tool" onClick={(e)=>handleButtonDelete()}>
              <FaTrash /> Delete
            </button>
            <button className="btn-tool" onClick={(e)=>handleButtonClear()}>
            <FaBan /> Clear
            </button>            
          </div>
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
