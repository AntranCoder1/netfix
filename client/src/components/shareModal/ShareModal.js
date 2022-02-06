import React, { useState } from 'react';
import './ShareModal.scss';
import { RiCloseLine } from 'react-icons/ri';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        }
    }
}))

const ShareModal = ({ setIsModal, movies }) => {

    const [isSave, setIsSave] = useState("");
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const handleSave = () => {
        setIsSave(navigator.clipboard.writeText(`http://localhost:3000/watch/${movies._id}`));
        setOpen(true);
    }

    return (
        <>
            <div className="darkBGS" onClick={() => setIsModal(false)} />
            <div className="center">
                <div className="modals">
                    <h1 className="heading">Chia Sẻ</h1>
                    <button className="closeBtn" onClick={() => setIsModal(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    <div className="modals-img">
                        <div className="face">
                            <img 
                                src="https://i.ibb.co/7Yr5pyH/face-icon.png" 
                                alt="facebook-icon" 
                                style={{ height: "90px", width: "90px", marginTop: "-9px" }}
                            />
                            <p>Facebook</p>
                        </div>
                        <div className="face">
                            <img 
                                src="https://i.ibb.co/Vp0GXpx/zalo-icon.png" 
                                alt="facebook-icon" 
                            />
                            <p>Zalo</p>
                        </div>
                        <div  className="face">
                            <img 
                                src="https://i.ibb.co/qYg77G7/message-icon.png" 
                                alt="messager-icon" 
                            />
                            <p>Messager</p>
                        </div>
                    </div>
                    <div className="url">
                        <p>{`http://localhost:3000/watch/${movies._id}`}</p>
                        <span 
                            onClick={handleSave}
                            disabled={open}
                            variant="outlined"
                        >
                            COPY
                        </span>
                    </div>
                </div>
                { 
                    isSave && 
                    <Collapse in={open} style={{ marginTop: "20px" }}>
                        <Alert
                            variant="filled"
                            severity="success" 
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            Link to copied clipboard
                        </Alert>
                    </Collapse>
                }
            </div>
        </>
    );
};

export default ShareModal;
