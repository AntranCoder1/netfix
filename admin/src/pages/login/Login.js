import React, { useState } from 'react';
import "./Login.css";
import { login } from '../../redux/loginAdmin/ApiCall';
import { useDispatch } from 'react-redux';

const Login = () => {

    const [admin, setAdmin] = useState(null);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value;
        setAdmin({ ...admin, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(admin, dispatch);
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <input
                style={{ padding: 10, marginBottom: 20 }}
                type="email"
                placeholder="email"
                name="email"
                onChange={handleChange}
            />
            <input
                style={{ padding: 10, marginBottom: 20 }}
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
            />
            <button 
                style={{ padding: 10, width:100 }}
                onClick={handleSubmit}
            >
                Login
            </button>
        </div>
    )
}

export default Login
