import React, {useState, useEffect} from 'react'
import AllMentors from './AllMentors'
import AddMentor from './AddMentor'
import {withRouter, Link} from 'react-router-dom'
 
function Mentor() {
    const [mentorsData, setMentorsData] = useState([])
    useEffect(()=>fetchMentors(),[])

    const fetchMentors = () => {
        fetch("http://localhost:4000/getmentors",{
            method : 'get',
        })
        .then(res => res.json())
        .then(res => setMentorsData(res))
    }

    return (
        <div>
            <div className="header">
                <Link to='/admin/event'>
                    <button>
                        Event
                    </button>
                </Link>
                <button>Mentor</button>
            </div>
            <AllMentors mentors={mentorsData}/>
            <AddMentor fetchMentors={fetchMentors}/>
        </div>
    )
}

export default withRouter(Mentor)
