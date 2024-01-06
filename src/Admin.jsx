
import UserAdmin from "./UserAdmin";
import StatusAdmin from "./StatusAdmin";

import { useEffect, useState } from "react"
import UserTypeAdmin from "./UserTypeAdmin";
export default function Admin(){
    
     
    return(
        <>
            <h2>Administration</h2>
            <div className="container">
                <div className="info-card">
                    <UserAdmin/>
                </div>
                <div className="info-card">
                    <StatusAdmin/>
                </div>
                <div className="info-card">
                    <UserTypeAdmin/>
                </div>
            </div>
        </>
    )
}