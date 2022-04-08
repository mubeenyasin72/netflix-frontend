import React, { useEffect, useState } from 'react'
import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import { BASE_URL } from '../../baseUrl/BaseUrl'
import axios from 'axios'
const Home = ({ type }) => {
    const [lists, setLists] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [genre, setGenre] = useState(null)

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(
                    `${BASE_URL}/api/v1/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""
                    }`,
                    {
                        headers: {
                            token:
                                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGJlYmRhYTU2NDBkZGVjOTA4MDlmZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTMyMDA4NiwiZXhwIjoxNjQ5NDA2NDg2fQ.M4XgFlsOFP0Sd6NeycRanys0Idot6pMCfTo7ZnyZuo0"
                        },
                    }
                );
                setLists(res.data.list);
            } catch (err) {
                console.log(err);
            }
        }
        getRandomLists();
    }, [type, genre])


    return (
        <div className='home'>
            <Navbar />
            <Featured type={type} />
            {lists.map((list) => (
                <List list={list} />
            ))}
        </div>
    )
}

export default Home