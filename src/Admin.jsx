
import UserAdmin from "./UserAdmin";
import StatusAdmin from "./StatusAdmin";
import UserTypeAdmin from "./UserTypeAdmin";
import { FaChevronDown, FaChevronUp,} from "react-icons/fa";
import { useState } from "react"

export default function Admin(){
    
    const [collapse1,setCollapse1]=useState('show');
    const [collapse2,setCollapse2]=useState('show');
    const [collapse3,setCollapse3]=useState('show');


    const [chevron1,setChevron1]=useState(FaChevronDown);
    const [chevron2,setChevron2]=useState(FaChevronDown);
    const [chevron3,setChevron3]=useState(FaChevronDown);
  

    function show(n){
        eval(`setCollapse${n}('show')`)
        eval(`setChevron${n}(FaChevronDown)`)
    }

    function hide(n){
        eval(`setCollapse${n}('hide')`)
        eval(`setChevron${n}(FaChevronUp)`)
        
    }

    const handleCollapse1 = () => collapse1=='hide'? show(1):hide(1)
    const handleCollapse2 = () => collapse2=='hide'? show(2):hide(2)
    const handleCollapse3 = () => collapse3=='hide'? show(3):hide(3)    
     
    return(
        <>
            <h2>Administration</h2>
            <div className="container">
                <div className="info-card">
                    <div className="title-sub" onClick={() => handleCollapse1()}>
                        User Management <span className="toRight">{chevron1}</span>{" "}
                    </div>
                    <UserAdmin collapse={collapse1}/>
                </div>
                <div className="info-card">
                <div className="title-sub" onClick={() => handleCollapse2()}>
                        Status Management <span className="toRight">{chevron2}</span>{" "}
                    </div>
                    <StatusAdmin  collapse={collapse2} />
                </div>
                <div className="info-card">
                    <div className="title-sub" onClick={() => handleCollapse3()}>
                        "User Types Management<span className="toRight">{chevron3}</span>{" "}
                    </div>                    
                    <UserTypeAdmin collapse={collapse3}/>
                </div>
            </div>
        </>
    )
}