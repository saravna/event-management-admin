import React, {useState, useEffect} from 'react'
import { withRouter, Link } from 'react-router-dom'
import './AddEvent.css'
import axios from 'axios'

function AddEvent(props) {

    const [file, setFile] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cityId, setCity] = useState('')
    const [price,setPrice] = useState(0)
    const [schedule, setSchedule] = useState([])

    const [cityData, setCityData] = useState([])
    const [mentorsData, setMentorsData] = useState([])
    const [scheduleCount, setScheduleCount] = useState(1)

    const [timing,setTiming] = useState('')
    const [scheduleDescription, setScheduleDescription] = useState('')
    const [selectedMentor, setSelectedMentor] = useState(null)


    useEffect(()=>{
        fetch("http://localhost:4000/getmentors",{
            method : 'get',
        })
        .then(res => res.json())
        .then(res => {
            setMentorsData(res)
        })

        fetch("http://localhost:4000/getcities",{
            method : 'get'
        })
        .then(res => res.json())
        .then(res => setCityData(res))
    },[])

    useEffect(()=> {
        console.log("u",schedule)
    },[schedule.length])

    const generateOptions = (data) => {
        return data.map((item,i) => <option key={i} value={item.id}>{item.name}</option>)
    }

    useEffect(()=>console.log(cityId),[cityId])

    const generateScheduleForm = () => {
        const schedule=[]
        for(var i=0;i<scheduleCount;i++){
            schedule.push(
                <div key={i}>
                    <input style={{width : "35%",marginRight:"2%"}} id={i} placeholder="Timing" onChange={(e)=> setTiming(e.target.value)} type="text"/>
                    <input style={{width : "35%",marginRight:"2%"}} id={i} placeholder="Description"onChange={(e) => setScheduleDescription(e.target.value)} type="text"/>
                    <select name="mentor" onChange={e => setSelectedMentor(e.target.value)}>
                        <option>Select mentor...</option>
                        {generateOptions(mentorsData)}
                    </select>
                </div>
            )
        }
        return schedule
    }

    const handleSubmit = async () => {
        if(timing.trim().length!==0 || scheduleDescription.trim().length!==0){
            schedule.push({
                timing,
                description : scheduleDescription,
                mentor : parseInt(selectedMentor)
            })
            setSchedule(schedule)
        }
        var image = ''
        var formData = new FormData()
        formData.append('profile',file)
        await axios.post("http://localhost:4000/profile",formData,{
            headers : { 'Content-Type' : 'multipart/form-data' }           
        })
        .then(response => {
            image = "http://localhost:4000/uploads/"+ response.data.filename
            return
        })

        await fetch("http://localhost:4000/addevent", {
            method : 'post',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                image,
                title,
                description,
                cityId,
                price,
                schedule
            })
        })
        .then(res=>console.log(res))
        props.fetchAllEvents()

    }

    return (
        <div style={{marginTop:"100px"}}>
            <h1>Add New Event</h1>
            <div className="add-event">
                <div>
                    <label>Profile Image</label>
                    <input type="file" name='profile' onChange={(e)=>setFile(e.target.files[0])}/>
                </div>
                <div>
                    <label>Title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div>
                    <label>City</label>
                    {/* <textarea onChange={(e) => setVenueDetails(e.target.value)}/> */}
                    <select onChange={(e) => setCity(e.target.value)}>
                        <option>Select City...</option>
                        {generateOptions(cityData)}
                    </select>
                </div>
                <div>
                    <label>Price</label>
                    <input type="text" onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div>
                    <label>Schedule</label>
                    {generateScheduleForm()}
                    <button onClick={() => {
                        console.log(timing,"and",scheduleDescription)
                        if(timing.trim().length===0 || scheduleDescription.trim().length===0||selectedMentor===null)
                            return
                        schedule.push({
                            timing,
                            description : scheduleDescription,
                            mentor : parseInt(selectedMentor)
                        })
                        setSchedule(schedule)
                        setTiming('')
                        setScheduleDescription('')
                        setSelectedMentor(null)
                        return setScheduleCount(prev => prev+1)
                    }}>
                        Add schedule
                    </button>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default withRouter(AddEvent)
