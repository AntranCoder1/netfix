import React, { useEffect, useState } from 'react';
import './EditProfile.scss';
import { Link, useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from 'react-redux';
import storage from '../../firebase';
import { updateUsers, getUsers } from '../../redux/ApiUsersCall';
import axios from 'axios';

const EditProfile = () => {

    const [users, setUsers] = useState(null);
    const [picture, setPicture] = useState(null);
    const [uploaded, setUploaded] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();

    // // const user = useSelector(state => state.user.currentUser);
    const currentUser = useSelector(state => state.user.currentUser);
    // const user = useSelector(state => 
    //     state.user.users.find((item) => item._id === currentUser._id)
    // );

    // useEffect(() => {
    //     getUsers(dispatch);
    // }, [dispatch])

    // console.log(user)

    const [user, setUser] = useState([]);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const res = await axios.get("/users/find/" + currentUser._id);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCurrentUser();
    }, [])

    const handleChange = (e) => {
        const value = e.target.value;
        setUsers({ ...users, [e.target.name]: value });
        setUploaded(prev => prev + 1);
    }

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
                    setUsers(prev => {
                        return { ...prev, [item.label]: url }
                    });
                    setUploaded(prev => prev + 1);
                })
            })
        })
    }

    const handleUpload = () => {
        upload([
            { file: picture, label: 'picture' },
        ])
    };

    const handleUpdate = () => {
        updateUsers(dispatch, user._id, users);
        history.push("/profile")
    }

    return (
        <div className="edit-profile">
            <div className="top">
                <div className="wrapper">
                    <Link to="/">
                        <img 
                            className="logo"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                            alt="logo"
                        />
                    </Link>
                </div>
            </div>
            <div className="container">
                <h1>Edit Profile</h1>
                <div className="container-user">
                    <div className="userEdit">
                        { picture ? (
                            <img 
                                src={ URL.createObjectURL(picture) } 
                                alt="user-img" 
                            />
                        ) : (
                            <img 
                                src={ user.picture || "https://i.pinimg.com/564x/1f/0d/78/1f0d78de9cf2a1358d2bece601a2a40f.jpg"} 
                                alt="user-img" 
                            />
                        ) }
                        <div className="userEdit-icon">
                            <label htmlFor="file" name="picture">
                                <EditIcon className="icon" />
                            </label>
                            <input 
                                type="file" 
                                id="file" 
                                name="picture" 
                                style={{ display: "none" }}  
                                onChange={(e) => setPicture(e.target.files[0])}  
                            />
                        </div>
                    </div>
                    <div className="userUpdateItem">
                        <input 
                            type="text" 
                            placeholder={user.name} 
                            className="userUpdateInput"
                            name="name"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                { uploaded > 0 ? (
                    <button 
                        className="btnSubmit"
                        onClick={handleUpdate}
                    >SAVE</button>
                ) : (
                    <button 
                        className="btnSubmit"
                        onClick={handleUpload}
                    >UPDATE</button>
                ) }
            </div>
        </div>
    )
}

export default EditProfile