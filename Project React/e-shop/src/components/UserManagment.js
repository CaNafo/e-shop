import React from 'react';
import '../style/UserManagment.css';
import ProfileImg from '../icons/profile.png';

function UserManagment() {


    return (
        <div className='UserManagmentContainer'>
            <div className='userDiv'>
                <h5>Marko Markovic</h5>
                <img className='UserManagmentImg' src={ProfileImg}></img>
                <br />
                <button className='btn btn-sm btn-warning UserManagmentBtn'>Delete</button>
                <button className='btn btn-sm btn-danger UserManagmentBtn'>Block</button>
            </div>
        </div>
    );
}

export default UserManagment;
