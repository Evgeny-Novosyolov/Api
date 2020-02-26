import React, {useEffect} from 'react'
import './home.scss'

import UsersList from '../../components/users-list'

const HomePage = () =>{


    useEffect(()=>{

   
    })
    return(
        <div>
            <h1 className="title__primary" data-text="List of users">List of users</h1>
            <UsersList/>
        </div>
    )
}

export default HomePage