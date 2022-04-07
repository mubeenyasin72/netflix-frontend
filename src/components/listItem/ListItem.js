import React, { useState, useEffect } from 'react'
import './listItem.scss'
import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownOutlined } from "@material-ui/icons"
import { BASE_URL } from '../../baseUrl/BaseUrl'
const ListItem = ({ index, item }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [movies, setMovies] = useState({})
    const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

    useEffect(() => {
        const findMovies = async () => {
            try {
                var myHeaders = new Headers();
                myHeaders.append("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGJlYmRhYTU2NDBkZGVjOTA4MDlmZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTMyMDA4NiwiZXhwIjoxNjQ5NDA2NDg2fQ.M4XgFlsOFP0Sd6NeycRanys0Idot6pMCfTo7ZnyZuo0");

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                await fetch(`${BASE_URL}/api/v1/movies/find/` + item, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        console.log(result.movie, "This is the Lisytitem page result")
                        setMovies(result.movie)
                    })
                    .catch(error => {
                        console.log('error', error)
                    });
            } catch (error) {
                console.log(error)
            }
        }
        findMovies()
    }, [item])
    // console.log(movies, "rdtyfughiiouiyutyrtsdfyghjofghj")
    return (
        <div className='listitem'
            style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={movies?.imgSm}
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