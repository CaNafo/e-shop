import React, { useState, useEffect } from 'react';
import '../style/UserManagment.css';
import ProfileImg from '../icons/profile.png';
import Static from '../services/Static'

function UserManagment() {

    var [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [])

    function deleteUser(id) {
        console.log(id + ' Id korisnika');
    }

    function blockUser(id) {
        console.log(id + ' Id korisnika za blokiranje');
    }

    function showAllUsers() {
        var elements = [];
        if (users.length > 0) {
            for (var user of users) {
                elements.push(
                    <div className='userDiv' key={user.userId}>
                        <div>
                            <h5>{user.firstName} {user.lastName}</h5>
                            <img className='UserManagmentImg' src={ProfileImg}></img>
                            <h6>{user.eMail}</h6>
                            <br />
                            <button className='btn btn-sm btn-warning UserManagmentBtn'
                                onClick={e => deleteUser(user.userId)}>
                                Delete
                            </button>
                            <button className='btn btn-sm btn-danger UserManagmentBtn'
                                onClick={e => blockUser(user.userId)}>
                                Block
                            </button>
                        </div>
                    </div>
                );
            }
            return (
                <div id='productRow' className='row' >
                    {
                        elements
                    }
                </div>
            );
        }
    }

    const fetchUsers = async () => {
        var link = Static.getServerLink() + 'api/GetUsers';

        await fetch(link).then(response => response.json()).then(
            response => setUsers(response)
        );

    }

    return (
        <div className='UserManagmentContainer'>
            <div>
                <h2>Users</h2>
                {
                    showAllUsers()
                }
            </div>
        </div>
    );
}

export default UserManagment;
