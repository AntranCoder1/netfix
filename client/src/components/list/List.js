import React from 'react';
import ListItem from '../listItem/ListItem';
import './List.scss';
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
import axios from 'axios';

const List = ({ list }) => {

    console.log(list.content)
    return (
        <div className="list">
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined 
                    className="sliderArrow left"
                />
                <div className="container">
                    { list.content.map((item, i) => (
                        <ListItem index={i} list={item} />
                    )) }
                </div>
                <ArrowForwardIosOutlined
                    className="sliderArrow right"
                />
            </div>
        </div>
    )
}

export default List
