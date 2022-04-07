import React from 'react'
import './watch.scss'
import { ArrowBackOutlined } from "@material-ui/icons"
const Watch = () => {

    const trailer = "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    return (
        <div className='watch'>
            <div className='back'>
                <ArrowBackOutlined />
                Home
            </div>
            <video
                className="video"
                autoPlay={true}
                progress
                controls
                src={trailer}
            />
        </div>
    )
}

export default Watch