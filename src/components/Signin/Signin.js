import React, {useState} from 'react'
import './Signin.css'
import {withRouter} from 'react-router-dom'

function Signin(props) {

    const [mailOrUsername, setMailOrUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSignin = () =>{
        fetch("http://localhost:4000/signin", {
            method : "post",
            headers : { 'Content-Type' :'application/json'},
            body : JSON.stringify({
                username : mailOrUsername,
                password
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.adminToken){
                localStorage.setItem("adminToken",res.adminToken)
                props.history.push('/admin/event')
            }
            else
                alert("Not a valid User")
        })
    }

    return (
        <div className='signin-form'>
            <h1>
                Signin
            </h1>
            <div>
                <label>Email or Username</label>
                <input type="text" onChange={(e) => setMailOrUsername(e.target.value)}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button onClick={handleSignin}>Signin</button>
        </div>
    )
}

export default withRouter(Signin)
