import React from 'react'

function AllMentors(props) {
    return (
        <div>
            <h1>ALL MENTORS</h1>
                <div>
                    {props.mentors.map((mentor,i) => {
                        return <div key={i} style={{display:"inline-block", margin:"20px"}}>
                            <a href={mentor.linkedIn}><img src={mentor.image} style={{borderRadius : "50%"}} width={100} height={100}/></a>
                            <p>{mentor.name}</p>
                        </div>
                    })}
                </div>
        </div>
    )
}

export default AllMentors
