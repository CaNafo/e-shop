import React, { useState, useEffect } from 'react';
import '../App.css';
import '../style/LoginStyle.css';
import { Link, useHistory } from 'react-router-dom';
import LoginServices from '../services/LoginService'

function Login() {
    const [eMail, setEmail] = useState('');
    const [pass, setPass] = useState('');

    let history = useHistory();

    useEffect(() => {
        checkSession();
    }, [])

    function checkSession() {
        if (sessionStorage.getItem('name') !== null) {
            history.push('/IndexApp');
        } else {
            if (localStorage.getItem("eMail") !== null && localStorage.getItem("pass") !== "") {
                setEmail(localStorage.getItem("eMail"));
                setPass(localStorage.getItem("pass"));
            }
            history.push('/');
        }
    }

    function onCheck(e) {
        if (e.checked) {
            localStorage.setItem("eMail", eMail);
            localStorage.setItem("pass", pass);
        }
    }

    return (
        <div className='App'>
            <div className='loginDiv'>
                <form className='loginForm'>
                    <div className='Container'>
                        <h3>Login</h3>
                    </div>

                    <div className='Container'>
                        <p className='ContainerElementMargin'>or</p>
                    </div>

                    <div className='Container'>
                        <Link to='/components/SignUp'>
                            <p className='ContainerElementMargin loginSignUpLink'>Sign up</p>
                        </Link>
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" onChange={event => setEmail(event.target.value)} value={eMail} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={event => setPass(event.target.value)} value={pass} />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" onClick={event => onCheck(event.target)} />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" id="btnLoginSubmit" onClick={event => LoginServices.fetchItems(event, history, eMail, pass)}>Submit</button>
                    <p className="forgot-password text-right">
                         <a href="#">Forgot password?</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
