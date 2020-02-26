import React from 'react'
import { useHistory } from "react-router-dom";
import './users-item.scss'

const UsersItem = ({user,getUser }) =>{

    const {id, name, username, email, phone, website, address: {city}, } = user

    let history = useHistory();
    
    const hanldeClick = () =>{
        getUser()
        history.push(`/user/${id}`)
    }

    
    return(
        <div className="user">
            <div className="user__left-box">
                <h3 className="user__title"><span>Name:</span> {name}</h3>
                <h3 className="user__title"><span>Username:</span> {username}</h3>
            </div>
            <div>
            <div className="user__main">
                            {/* <div className="user__content"> */}
                                <ul className="info__list">
                                    <li>Email: {email}</li>
                                    <li>Phone: {phone}</li>
                                    <li>Website: {website}</li>
                                    <li>City: {city}</li>
                                </ul>
                            {/* </div> */}
                        </div>
            </div>
            <div className="user__right-box">
                <button
                        className="user__button"
                        onClick={()=> hanldeClick()}
                        >Go to posts</button>
            </div>
            <div className="boder-box">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
            </div>
        </div>
    )
}


export default UsersItem