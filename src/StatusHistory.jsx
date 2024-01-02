import { useEffect, useState } from "react"

export default function StatusHistory({id, refresh}){
    const [statHist,setStatHist]= useState([]);

    const params = new URLSearchParams({
        'custId':id
    })

    useEffect(()=>{
        fetch(`http://localhost:8000/status?${params}`).then((res) => {
            return res.json();
          })
          .then((data) => {
            setStatHist(data)
          });
    },[refresh])

    return(
        <>
        <br/>
        <div className="info-card">
        <div className="title-main">Status History</div>
        {statHist && statHist.length && statHist.map((item)=>{
            return(
                <div className="grid" key={item.id}>
                    <div className="col-3"> {item.statusDate} </div>
                    <div className="col-3"> {item.Status} </div>
                    <div className="col-6"> {item.statusNotes}</div>                        
                </div>
            )
        })}
        </div>
        </>
    )
}