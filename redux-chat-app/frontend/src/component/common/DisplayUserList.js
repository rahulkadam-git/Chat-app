import React from 'react';

function DisplayUserList({userFromList,handleFunction}) {
    return (
        <div className='DisplayUserList' onClick={handleFunction}>
            <div className='usersProfilePic'>
                <img src={userFromList.profile_pic} alt='Profile-pic'/> 
            </div>
            <div className='user-info'>
                <h6>{userFromList.name}</h6>
            </div>
        </div>
    );
}

export default DisplayUserList;