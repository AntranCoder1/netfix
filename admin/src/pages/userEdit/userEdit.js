import React, { useState } from 'react';
import './userEdit.css';
import { 
    LocationSearching, 
    MailOutline, 
    PermIdentity, 
    PhoneAndroid, 
    Publish
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { dateParser } from '../../Utils';
import { updatedUser } from '../../redux/ApiCallUser';
import storage from '../../firebase';

const UserEdit = () => {

    const [users, setUsers] = useState(null);
    const [picture, setPicture] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [uploaded, setUploaded] = useState(0);

    const userId = location.pathname.split('/')[2];

    const user = useSelector(state => 
        state.user.users.find((item) => item._id === userId)
    );

    const handleChange = (e) => {
        const value = e.target.value;
        setUsers({ ...users, [e.target.name]: value });
        setUploaded(prev => prev + 1);
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
                    setUsers(prev => {
                        return { ...prev, [item.label]: url }
                    });
                    setUploaded(prev => prev + 1);
                })
            })
        })
    };

    console.log(uploaded)

    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            { file: picture, label: 'picture' },
        ])
    };

    const handleUpdated = () => {
        updatedUser(userId, users, dispatch);
        history.push("/users");
    };

    return (
        <div className="userEdit">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/create">
                    <button className="userAddButton">Create</button>   
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img 
                            src={user.picture || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUserName">{user.name}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Detail</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.name}</span>
                        </div>
                        <span className="userShowTitle">Contact Detail</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">{dateParser(user.createdAt)}</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.email}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">VN</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    placeholder={user.name} 
                                    className="userUpdateInput"
                                    name="name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    placeholder={user.email} 
                                    className="userUpdateInput"
                                    name="email"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Admin</label>
                                <select 
                                    className="userCreateSelect" 
                                    id="isAdmin"
                                    name="isAdmin" 
                                    onChange={handleChange}
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img 
                                    src={user.picture || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} 
                                    alt=""
                                    className="userUpdateImg"
                                />
                                <label htmlFor="file" name="picture">
                                    <Publish className="userUpdateIcon" />
                                </label>
                                <input 
                                    type="file" 
                                    id="file" 
                                    name="picture" 
                                    style={{ display: "none" }} 
                                    onChange={(e) => setPicture(e.target.files[0])}        
                                />
                            </div>
                            { uploaded > 0 ? (
                                <button 
                                    className="userUpdateButton" 
                                    onClick={handleUpdated}
                                >
                                    Update
                                </button>
                            ) : (
                                <button 
                                    className="userUpdateButton" 
                                    onClick={handleUpload}
                                >
                                    Upload
                                </button>
                            ) }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserEdit
