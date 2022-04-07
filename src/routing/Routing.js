import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/home/Home'
import Watch from '../pages/watch/Watch'
import Register from '../pages/register/Register'
import Login from '../pages/login/Login'
const Routing = () => {
    const user = true;
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={user ? <Home /> : <Register />} />
                    <Route path="register" element={!user ? <Register /> : <Home />} />
                    <Route path="/login" element={!user ? <Login /> : <Home />} />
                    {
                        user && (
                            <>
                                <Route path="/movies" element={<Home type="movies" />} />
                                <Route path="/series" element={<Home type="series" />} />
                                <Route path="/watch" element={<Watch />} />
                            </>
                        )
                    }
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing