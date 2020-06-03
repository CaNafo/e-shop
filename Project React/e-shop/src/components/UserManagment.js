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
        var link = Static.getServerLink() + 'api/DeleteUser?ID=' + id;

        await fetch(link).then(
            window.location.reload()
        );
    }

    const blockUser = async (id) => {
        var link = Static.getServerLink() + 'api/BlockUser?ID=' + id;

        await fetch(link).then(
            console.log(id + "dadasd")
        );
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
                            <button value={user.userId} className='btn btn-sm btn-warning UserManagmentBtn'
                                onClick={e => deleteUser(e.target.value)}>
                                Delete
                            </button>
                            <button value={user.userId} className='btn btn-sm btn-danger UserManagmentBtn'
                                onClick={e => blockUser(e.target.value)}>
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
