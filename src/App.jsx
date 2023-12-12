import "./styles.css"
import {useState,useEffect} from 'react'
import Inventory from "./Inventory";
import Info from "./Info";
export default function App(){

  const [data,setData]=useState([])
  const [information,setInformation]=useState([])
  const customers = [
    {
        "id":"1",
        "Customer":"Jim Johnsons Jolly Jam Company",
        "TicketNum":"",
        "Phone":"000-256-2653",
        "Address":"222 Main Street",
        "City":"Whoville",
        "State":"Maryland",
        "Contact":"Jimbo Johnson",
        "ContactInfo":"000-999-5254",
        "Notes":"-",
        "LastContacted":"",
        "Status":"New",
        "AssignedTo":"-",
        "ScheduleDate":"",
        "ScheduleTime":"",
        "ScheduleLocation":"-"
    },
    {
        "id":"2",
        "Customer":"Ricky Robinsons Roll",
        "TicketNum":"",
        "Phone":"255-996-6633",
        "Address":"2356 Market Street",
        "City":"Rattletowwn",
        "State":"Maryland",
        "Contact":"Ronny Roll",
        "ContactInfo":"",
        "Notes":"-",
        "LastContacted":"2023-12-20",
        "Status":"Contacted",
        "AssignedTo":"-",
        "ScheduleDate":"",
        "ScheduleTime":"",
        "ScheduleLocation":"-"
    },
    {
        "id":"3",
        "Customer":"Crazy Carls Crashed Cars",
        "TicketNum":"",
        "Phone":"351-859-3555",
        "Address":"9000 Park Street Suite A",
        "City":"Dingleberry",
        "State":"Maryland",
        "Contact":"Cassidy Yates",
        "ContactInfo":"",
        "Notes":"-",
        "LastContacted":"2023-12-22",
        "Status":"Scheduled",
        "AssignedTo":"-",
        "ScheduleDate":"2024-01-19",
        "ScheduleTime":"9:30 AM",
        "ScheduleLocation":"522 East West Ave, Dingleberry, MD"
    }
]

  const getData = ()=>{
      setData(customers)
  }

  function renderInfo(id){
   // alert(id)
    let info = customers.find((item)=>{
      return item.id==id
    })
    setInformation(info)
  }

  useEffect(()=>{
    getData()
  },[])
  return (
    <>
      <div className="header">
        <h2>Header</h2>
      </div>

      <div className="topnav">
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
      </div>

      <div className="row">
        <div className="column side">
          <Info idata={information}/>
        </div>

        <div className="column middle">
          <Inventory renderInfo={renderInfo} data={data}/>
        </div>
      </div>
    </>
  );
 
    

  


}
