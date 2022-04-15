import React from 'react';

function DisplayUserList({userFromList,handleFunction}) {


    return (
        <div className='user-display-list' onClick={handleFunction}>
            <div className='userProfilePic'>
                <img src={userFromList.profile_pic} alt='Profile-pic'/> 
            </div>
            <div className='user-name'>
                <h6>{userFromList.name}</h6>
            </div>
        </div>
    );
}

export default DisplayUserList;