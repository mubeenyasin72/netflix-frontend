import React, { useState, useEffect } from 'react'
import './listItem.scss'
import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownOutlined } from "@material-ui/icons"
import { BASE_URL } from '../../baseUrl/BaseUrl'
import axios from 'axios'
const ListItem = ({ index, item }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [movies, setMovies] = useState({})
    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/v1/movies/find/` + item, {
                    headers: {
                        token:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGJlYmRhYTU2NDBkZGVjOTA4MDlmZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTMyMDA4NiwiZXhwIjoxNjQ5NDA2NDg2fQ.M4XgFlsOFP0Sd6NeycRanys0Idot6pMCfTo7ZnyZuo0"
                    },
                });
                console.log(res.data.movie, "APi Response")
                setMovies(res.data.movie);
            } catch (err) {
                console.log(err);
            }
        };
        getMovie();
    }, [item])
    return (
        <div className='listitem'
            style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={movies.img}
                alt=""
            />
            {isHovered && (
                <>
                    <video src={movies.trailer} autoPlay={true} loop />
                    <div className="itemInfo">
                        <div className="icons">
                            <PlayArrow className="icon" />
                            <Add className="icon" />
                            <ThumbUpAltOutlined className="icon" />
                            <ThumbDownOutlined className="icon" />
                        </div>
                        <div className="itemInfoTop">
                            <span>{item.duration}</span>
                            <span className="limit">+{movies.limit}</span>
                            <span>{movies.year}</span>
                        </div>
                        <div className="desc">
                            {movies.desc}
                        </div>
                        <div className="genre">{movies.genre}</div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ListItem