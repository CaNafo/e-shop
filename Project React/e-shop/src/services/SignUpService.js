import Static from '../services/Static';
import { Alert } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SignUpServices = {
    redirectToIndex: function (response, history) {
        sessionStorage.setItem('user', JSON.stringify(response));

        if (Object.keys(response).length === 0) {
            history.push('../');
            history.push('./components/SignUp');
        }
        else {
            sessionStorage.setItem('name', response[0].firstname);
            history.push('../IndexApp');
        }
    },

    checkIfRegistered: function (response, history) {
        if (parseInt(response) > 0) {
            Swal.fire({
                icon: 'success',
                title: 'Well done!',
                text: 'Successfully registered!',
              })
            history.push('../');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mail you entered is taken!',
              })
            history.push('./SignUp');
        }
    },

    validateEmail: function (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    fetchItems: async (e, history, fname, lname, eMail, Pass, bdate) => {
        e.preventDefault();

        if (fname.length > 0 && lname.length > 0 && eMail.length > 0 && Pass.length > 0 && bdate.length > 0) {
            if (SignUpServices.validateEmail(eMail)) {
                if (Pass.length >= 8 && /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(Pass)) {
                    var link = Static.getServerLink() + 'api/Registration';

                    await fetch(link, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': 'http://localhost:57703/',
                            'Access-Control-Allow-Origin': 'http://localhost:3000/',
                            'Access-Control-Allow-Credentials': 'true',
                        },
                        body: JSON.stringify({
                            "FirstName": fname,
                            "LastName": lname,
                            "eMail": eMail,
                            "password": Pass,
                            "BirthDate": bdate

                        })
                    }).then(response => response.json())
                        .then(
                            response => SignUpServices.checkIfRegistered(response, history)
                        );
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Password must contain minimum 8 characters, both letters and digits!',
                      })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter valid email!',
                  })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all fields!',
              })
        }
    }
}

export default SignUpServices;


