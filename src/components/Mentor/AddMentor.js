import React ,{useState, useEffect}from 'react'
import { withRouter, Link } from 'react-router-dom'
import './AddMentor.css'
import axios from 'axios'

function AddMentor(props) {
    const [name, setName] = useState('')
    const [linkedIn, setLinkedIn] = useState('')
    const [file, setFile] = useState('')
    

    const handleSubmit = async () => {
        if(name.trim().length===0 || linkedIn.trim().length===0 || file.name === undefined)
            return 
        var imageUrl = ''
        var formData = new FormData()
        formData.append('profile',file)
        await axios.post("http://localhost:4000/profile",formData,{
            headers : { 'Content-Type' : 'multipart/form-data' }           
        })
        .then(res => imageUrl = res.data.filename)
        var image = "http://localhost:4000/uploads/"+imageUrl
        fetch("http://localhost:4000/addmentor", {
            method : 'post',
            headers : { 'Content-Type' : 'application/json'},
            body : JSON.stringify({
                name,
                linkedIn,
                image
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return props.fetchMentors()
        })
    }

    return (
        <div>
            <div className="add-mentor">
                <h1>Add Mentor</h1>
                <div style={{textAlign : "left"}}>
                    <div>
                        <label>Name</label>
                        <input type="text" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label>LinkedIn</label>
                        <input type="text" onChange={(e) => setLinkedIn(e.target.value)}/>
                    </div>
                    <div>
                        <label>Profile Image</label>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
                    </div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default withRouter(AddMentor)
