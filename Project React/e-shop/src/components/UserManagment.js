import React, { useState, useEffect } from 'react';
import '../style/UserManagment.css';
import ProfileImg from '../icons/profile.png';
import Static from '../services/Static'

function UserManagment() {

    var [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [])

    const deleteUser = async (id) => {
        var user = {
            'ID': id
        };

        var link = Static.getServerLink() + 'api/DeleteUser';

        await fetch(link, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:57703/',
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify(
                user
            )
        }).then(
            fetchUsersAfterDelete()
        );
    }

    const blockUser = async (id) => {
        var user = {
            'ID': id
        };

        var link = Static.getServerLink() + 'api/BlockUser';

        await fetch(link, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:57703/',
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify(
                user
            )
        }).then(
            fetchUsersAfterDelete()
        );
    }

    function checkIfBanned(user) {
        if (user.roles.length > 0) {
            return (
                <button value={user.userId} className='btn btn-sm btn-danger UserManagmentBtn'
                    onClick={e => blockUser(e.target.value)}>
                    Ban
                </button>
            );
        } else {
            return (
                <h4 id='bannedText'>Banned</h4>
            )
        }
    }

    function showAllUsers() {
        var elements = [];
        if (users.length > 0) {
            for (var user of users) {
                if (user.userId != Static.getUser().id)
                    elements.push(
                        <div className='userDiv' key={user.userId}>
                            <div>
                                <h5>{user.firstName} {user.lastName}</h5>
                                <img className='UserManagmentImg' src={ProfileImg}></img>
                                <h6>{user.eMail}</h6>
                                {
                                    checkIfBanned(user)
                                }
                                <button value={user.userId} className='btn btn-sm btn-warning UserManagmentBtn'
                                    onClick={e => deleteUser(e.target.value)}>
                                    Delete
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

    const fetchUsersAfterDelete = async () => {
        var link = Static.getServerLink() + 'api/GetUsers';

        await fetch(link).then(response => response.json()).then(
            response => setUsers(response) & window.location.reload()
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
