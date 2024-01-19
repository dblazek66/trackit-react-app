import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import{formatSchedDate} from "./js/common.js"

export default function Schedule(){
    const [schedule,setSchedule]=useState([])

    const params = new URLSearchParams({
        'Status':'Scheduled',
        '_sort':'ScheduleDate,ScheduleTime',
        'order':'asc'
    })
  
    useEffect(()=>{
        fetch(`http://localhost:8000/customers?${params}`).then((res) => {
            return res.json();
          })
          .then((data) => {
            const result = Map.groupBy( data ,({ScheduleDate}) => ScheduleDate )
            setSchedule(data)
           // groupSchedDate(data)
            //console.log(groupByDate)
           }); 
    },[])

    return(
        <>
        <h2>Schedule</h2>
            {schedule && schedule.length && schedule.map((item,index,arr)=>{
                const prev = arr[index -1]
                return(
                    <div className="container grid" key={item.id}>
                        {
                            item.ScheduleDate!=prev?.ScheduleDate ?
                                <div className="col-12 sched-title">{formatSchedDate(item.ScheduleDate)}</div>
                                : ''
                        }
                        <div className="col-2 sched-time">{item.ScheduleTime}</div>
                        <div className="col-3 "><Link to={`../customers/${item.id}`}>{item.Customer}</Link> - {item.Contact}</div>
                        <div className="col-2">{item.Phone || item.ContactInfo}</div>
                        <div className="col-4">{item.ScheduleLocation}</div>
                        <div className="col-12 notes">{item.ScheduleNotes}</div>
                        <div className="col-12"> </div>
                    </div>
                  
                )

            })}
        </>
    )
}