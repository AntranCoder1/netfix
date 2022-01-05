import React, { useState } from 'react';
import './userCreate.css';
import storage from '../../firebase';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addUser } from '../../redux/ApiCallUser';

const UserCreate = () => {

    const [user, setUser] = useState(null);
    const [picture, setPicture] = useState(null);
    const [uploaded, setUploaded] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value })
    };

    const upload = (items) => {
        items.forEach(item => {
            const fileName = new Date().getTime() + item.label + item.file.name;
            const uploadTask = storage.ref(`/users/${fileName}`).put(item.file);
            uploadTask.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + ' % done.');
            }, err => {
                console.log(err);
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    setUser(prev => {
                        return { ...prev, [item.label]: url }
                    });
                    setUploaded(prev => prev + 1);
                })
            })
        })
    };

    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            { file: picture, label: 'picture' },
        ])
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(user, dispatch);
        history.push("/users");
    };

    return (
        <div className="userCreate">
            <h1 className="userCreateTitle">New User</h1>
            <form className="userCreateForm">
                <div className="createUserItem">
                    <label className="">Username</label>
                    <input 
                        type="text" 
                        placeholder="username"
                        name="name"
                        onChange={handleChange}
                    />
                </div>
                <div className="createUserItem">
                    <label className="">Email</label>
                    <input 
                        type="text" 
                        placeholder="email"
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="createUserItem">
                    <label className="">Password</label>
                    <input 
                        type="text" 
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="createUserItem">
                    <label>Image</label>
                    <input 
                        type="file" 
                        id="picture"
                        name="picture" 
                        onChange={(e) => setPicture(e.target.files[0])}
                    />
                </div>
                { uploaded === 1 ? (
                    <button 
                        className="userCreateButton"
                        onClick={handleUpload}
                    >
                        Upload
                    </button>
                ) : (
                    <button 
                        className="userCreateButton"
                        onClick={handleSubmit}
                    >
                        Create
                    </button>
                ) }
            </form>
        </div>
    )
}

export default UserCreate
