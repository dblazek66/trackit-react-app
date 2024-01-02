import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Schedule(){
    const [schedule,setSchedule]=useState([])
    const [groupByDate,setGroupByDate]=useState([])
    const params = new URLSearchParams({
        'Status':'Scheduled'
    })

    function formatSchedDate(dte,time){
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          };
        let schedDate  = new Date(dte)
        let formatDate = schedDate.toLocaleDateString('en-US',options)
        return formatDate + " " + time
    }

    function groupSchedDate(data){
        let schedDates=[]
        data.map((item)=>{
            const schedDate = item.ScheduleDate
            if(!schedDates[schedDate]){
                schedDates[schedDate]=[]
            }
            schedDates[schedDate].push(item)
        })
        
        setTimeout(()=> setGroupByDate(schedDates),1000)
        console.log(groupByDate)
    }
  

    useEffect(()=>{
        fetch(`http://localhost:8000/customers?${params}`).then((res) => {
            return res.json();
          })
          .then((data) => {
            setSchedule(data)
            groupSchedDate(data)
           }); 
    },[])
    return(
        <>
        <h2>Schedule</h2>
            {
                groupByDate && groupByDate.length && groupByDate.forEach((item)=>{
                    return(
                        <p>{Object.keys(item)}</p>
                    )
                })
            }

            {schedule && schedule.length && schedule.map((item)=>{
                return(
                   
                    <div className="container grid" key={item.id}>

                        <div className="col-12 sched-title">{formatSchedDate(item.ScheduleDate,item.ScheduleTime)}</div>
                        <div className="col-3 ">{item.Customer} - {item.Contact}</div>
                        <div className="col-3">{item.Phone || item.ContactInfo}</div>
                        <div className="col-6">{item.ScheduleLocation}</div>
                        <div className="col-12 notes">{item.ScheduleNotes}</div>
                        <div className="col-12"> </div>
                    </div>
                  
                )

            })}
        </>
    )
}