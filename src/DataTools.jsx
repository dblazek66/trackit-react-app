import { FaSave, FaPlus, FaTrash, FaBan } from "react-icons/fa";

export default function DataTools({handleButtonClear,handleButtonSave,handleButtonDelete}){

    return(
        <>

         <div className="info-card">
            <button className="btn-tool-label" disabled>Tools</button>
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
        </>

    )
}