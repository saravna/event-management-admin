import React from 'react'

function AllEvents(props) {
    return (
        <div>
            <h1>All Events</h1>
            {props.events.length===0 ?
            <p>No Events Available</p> :
            props.events.map((event,i) => {
                return <div key={i} style={{backgroundColor : "lightgray",width:"300px", display:'inline-block',padding:"10px",margin:"10px"}}>
                    <div>
                    <div style={{width:"300px",minHeight : "400px",overflow:"hidden",textAlign:"center"}}>
                        <img src={event.image} alt="img" height={200} width={300}/>
                        <p style={{marginTop : "5px",marginLeft :"20px" ,textAlign:"left"}}>Title:</p>
                        <p>{event.name}</p>
                        <p style={{marginTop : "5px",marginLeft :"20px" ,textAlign:"left"}}>Mentors:</p>
                        {event.schedules.map((schedule,j) => {
                            return <p style={{fontSize : "10px"}}>{schedule.mentor.name}</p>
                        })}
                    </div>
                    </div>
                </div>
            })
        }
        </div>
    )
}

export default AllEvents
