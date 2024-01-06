import { useEffect, useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function UserTypeAdmin(){
    const [userTypes,setUserTypes]=useState();
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

    useEffect(()=>{
        fetch("http://localhost:8000/userTypes")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUserTypes(data);
          console.log(data)
        });
    },[])
    return(
        <>
            <div className="title-sub" onClick={()=>handleCollapse()}>User Types <span className="toRight">{chevron}</span> </div>
            <div className={`grid ${collapse}`}>
                <div className="col-6">
                    <table className="compact">
                        <tbody>
                            {userTypes && userTypes.length && userTypes.map((item)=>{
                                return(
                                    <tr key={item.id}>
                                        <td>{item.type}</td>
                                        <td>
                                            <button className="btn-sm btn-primary">edit</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="col-6">
                    
                </div>
            </div>
        </>
    )
}