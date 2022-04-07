import React, { useEffect, useState } from 'react'
import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import { BASE_URL } from '../../baseUrl/BaseUrl'
const Home = ({ type }) => {
    const [lists, setLists] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [genre, setGenre] = useState(null)

    useEffect(() => {
        const getRandomList = async () => {
            try {
                var myHeaders = new Headers();
                myHeaders.append("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGJlYmRhYTU2NDBkZGVjOTA4MDlmZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTM2NTI2NSwiZXhwIjoxNjQ5NDUxNjY1fQ.KTe0rvMlKdSNzLbzu5LqQcbRAoYJNWEw-WfAUYltt24");

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                await fetch(`${BASE_URL}/api/v1/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        setLists(result.list)
                    })
                    .catch(error => {
                        alert(error)
                        setErrorMessage(error)
                    });
            } catch (error) {
                console.log(error)
            }
        }
        getRandomList()
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