import { useState,useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Login(){
    const navigate = useNavigate()

    function handleLogin(e){
        e.preventDefault()
        navigate('/')
    }
    return(
        <>
            <div className="container-fluid">
                <div className="info-card login-panel">
                    <div className="title-main">
                        User Login
                    </div>
                    <form onSubmit={(e)=>handleLogin(e)}>
                        <div className="input-pad">
                            <label>User ID</label>
                            <input
                                className="input-control"
                            />
                        </div>
                        <div className="input-pad">
                            <label>Password</label>
                            <input
                                className="input-control"
                            />    
                        </div>
                        <div className="center input-pad">
                            <button className="btn">Login</button>      
                        </div>
                   </form>
                </div>
            </div>
        </>
    )
}