import React, { useEffect, useState } from 'react';
import './EditProfile.scss';
import { Link, useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import storage from '../../firebase';
import { updateUsers } from '../../redux/AllUsersGCall';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const EditProfileG = () => {

    const checkUserGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.name;
    const checkImageGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.picture;
    const checkUserIdGoogle = JSON.parse(localStorage.getItem("userGoogle"))?.user;

    const [picture, setPicture] = useState(null);
    const [user, setUser] = useState(null);
    const [uploaded, setUploaded] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [uploadIcon, setUploadIcon] = useState(false);

    const isValid = uploadIcon;

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const res = await axios.get("/users/find/" + checkUserIdGoogle);
                setUsers(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getCurrentUser();
    }, []);

    console.log(users)

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value });
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
                    setUser(prev => {
                        return { ...prev, [item.label]: url }
                    });
                    setUploaded(prev => prev + 1);
                })
            })
        });
    }

    const handleUpload = () => {
        upload([
            { file: picture, label: 'picture' },
        ])
        setUploadIcon(true);
    };

    const handleUpdate = () => {
        updateUsers(dispatch, checkUserIdGoogle, user);
        history.push("/profile")
    }

    useEffect(() => {
        document.title = "Netflix - Manager profile"
    }, []);

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
                                src={ users.picture || checkImageGoogle || "https://i.pinimg.com/564x/1f/0d/78/1f0d78de9cf2a1358d2bece601a2a40f.jpg"} 
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
                            placeholder={ users.name || checkUserGoogle} 
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
                    >
                        { uploadIcon ? <i className="fa fa-refresh fa-spin"></i> : "UPDATE" }
                    </button>
                ) }
            </div>
        </div>
    )
}

export default EditProfileG