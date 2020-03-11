import React, {useState, useEffect} from 'react'
import AddEvent from './AddEvent';
import AllEvents from './AllEvents'
import {Link, withRouter} from 'react-router-dom'

function Event(props) {

    const [allEvents, setAllEvents] = useState([])
    
    const handleLogout = () => {
        localStorage.removeItem("adminToken")
        return props.history.push('/')
    }

    useEffect(()=>fetchAllEvents(),[])

    const fetchAllEvents = () => {
        fetch("http://localhost:4000/getallevents",{
            method : 'get'
        })
        .then (res => res.json())
        .then(res=>setAllEvents(res))
    }
    
    return (
        <div>
            <div className="header">
                <button>Event</button>
                <Link to='/admin/mentor'>
                    <button>
                        Mentor
                    </button>
                </Link>
                <button style={{position:"absolute", top:"30px", right:"20px"}} onClick={handleLogout}>logout</button>
                
            </div>
            <AllEvents events={allEvents}/>
            <AddEvent fetchAllEvents={fetchAllEvents}/>
        </div>
    )
}


export default withRouter(Event)
