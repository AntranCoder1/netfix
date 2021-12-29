import React from 'react';
import ListItem from '../listItem/ListItem';
import './List.scss';
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';

const List = () => {
    return (
        <div className="list">
            <span className="listTitle">Cartoon for the children</span>
            <div className="wrapper">
                <ArrowBackIosOutlined 
                    className="sliderArrow left"
                />
                <div className="container">
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                    <ListItem />
                </div>
                <ArrowForwardIosOutlined
                    className="sliderArrow right"
                />
            </div>
        </div>
    )
}

export default List
