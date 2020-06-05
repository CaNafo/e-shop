import React, { useEffect, useState } from 'react';
import '../style/Profile.css';
import Static from '../services/Static'
import ProfileImg from '../icons/profile.png';

function Profile() {

  useEffect(() => {
    setUserData();
  }, []);

  var [firstName, setFirstName] = useState('');
  var [lastName, setLastName] = useState('');
  var [birthDate, setBirthDate] = useState('');
  var [eMail, setEmail] = useState('');

  function setUserData() {
    if (Static.getUser() != null) {
      setFirstName(Static.getUser().firstName);
      setLastName(Static.getUser().lastName);
      setEmail(Static.getUser().eMail);

      var dt = new Date(Static.getUser().birthDate);
      setBirthDate(dt.toString().split('00:')[0]);
    }
  }

  function onEdit() {
    document.getElementById('name').style.display = "none";
    document.getElementById('bday').style.display = "none";
    document.getElementById('email').style.display = "none";
    document.getElementById('roles').style.display = "none";
    document.getElementById('btnEdit').style.display = "none";

    document.getElementById('editNameText').style.display = "block";
    document.getElementById('editName').style.display = "block";
    document.getElementById('editLastName').style.display = "block";
    document.getElementById('editLastNameText').style.display = "block";
    document.getElementById('editBdayText').style.display = "block";
    document.getElementById('editBday').style.display = "block";
    document.getElementById('btnSubmit').style.display = "initial";
    document.getElementById('btnCancel').style.display = "initial";
  }

  function showRoles() {
    if (Static.getUser() != null) {
      var roles = Static.getUser().roles;
      var elements = [];

      if (roles.length > 0)
        for (var i = 0; i < roles.length; i++) {
          elements.push(
            <h5 key={roles[i].roleId} id='profileRoles'><li>{roles[i].roleName}</li></h5>
          )
        }
      else
        elements.push(
          <h5 key='1' id='profileRoles'><li>Regular user</li></h5>
        )
      return elements;
    }
  }

  const onSubmt = async (e) => {
    e.preventDefault();

    if (firstName.length > 0 && lastName.length > 0 && document.getElementById('editBday').value.length > 0) {
      var user = {
        'ID': Static.getUser().id,
        'FirstName': firstName,
        'LastName': lastName,
        'BirthDate': document.getElementById('editBday').value,
      };

      var link = Static.getServerLink() + 'api/EditUser';

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
        alert('Changes will be aplied on next login!') &
        window.location.reload()
      );
    }
    else
      alert('Please fill all fields!');
  }

  return (
    <div >
      <div id='profileDataContainer'>
        <div>
          <div className='divStyle'>
            <div>
              <div id='imgDiv'>
                <img className='photoStyleProfile' src={ProfileImg} alt='Not Found' />
              </div>

              <div id='editDiv'>

                <label id='editNameText' className='editProfile' style={{ display: "none" }}>First name</label>
                <input id='editName' defaultValue={firstName} type='text' className='editProfile' style={{ display: "none" }}
                  onChange={e => setFirstName(e.target.value)}></input>
                <br />

                <label id='editLastNameText' style={{ display: "none" }}>Last name</label>
                <input id='editLastName' defaultValue={lastName} type='text' className='editProfile' style={{ display: "none" }}
                  onChange={e => setLastName(e.target.value)}></input>

                <label id='editBdayText' style={{ display: "none" }}>
                  Birthday
              </label>
                <input
                  id='editBday'
                  type="date"
                  className="form-control"
                  required
                  placeholder="Place you birthdate"
                  style={{ display: "none" }}
                />

                <button id='btnSubmit' style={{ display: "none" }} className='btnProfileEdit btn btn-sm btn-warning'
                  onClick={e => onSubmt(e)}>Submit</button>
                <button id='btnCancel' style={{ display: "none" }} className='btnProfileEdit btn btn-sm btn-danger'
                  onClick={e => window.location.reload()}>Cancel</button>
              </div>

              <h2 id='name'>{firstName} {lastName}</h2>
              <h4 id='bday'>{birthDate}</h4>
              <h4 id='email'>E-mail: {eMail}</h4>
            </div>
          </div>
          <br></br>
          <div className='rolesStyle' id='roles'>
            <div>
              <h3>Roles</h3>
              <ul>
                {showRoles()}
              </ul>
            </div>
          </div>
          <br />
          <button id='btnEdit' className='btn btn btn-warning' onClick={e => onEdit()}>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
