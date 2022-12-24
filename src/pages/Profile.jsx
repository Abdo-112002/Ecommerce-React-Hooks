
import React from 'react'
import { useDataContext } from '../context/DataContext'

function Profile() {
    const {user} = useDataContext();
    return (
        <div className='mainSection profile'>
            <div className='container'>
                <h1>
                    PROFILE NAME : <p>{user.userName}</p>
                </h1>
            </div>
        </div>
    )
}

export default Profile
