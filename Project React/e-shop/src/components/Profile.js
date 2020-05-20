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

  return (
    <div >
      <div id='profileDataContainer'>
        <div>
          <div className='divStyle'>
            <div>
              <div id='imgDiv'>
                <img className='photoStyleProfile' src={ProfileImg} alt='Not Found' />
              </div>
              <h2>{firstName} {lastName}</h2>
              <h4>{birthDate}</h4>
              <h4>E-mail: {eMail}</h4>
            </div>
          </div>
          <div className='rolesStyle'>
            <div>
              <h2>Roles:</h2>
              <ul>
                {showRoles()}
              </ul>
            </div>
          </div>
          <br />
          <button id='editBtn' className='btn btn btn-warning'>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
