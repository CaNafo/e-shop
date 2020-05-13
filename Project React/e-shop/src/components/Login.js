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
        if (sessionStorage.getItem('name') != null) {
            history.push('/IndexApp');
        } else{
            history.push('/');
        }
    }
    
    return (
        <div className='App'>
            <form>
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
                    <input type="email" className="form-control" placeholder="Enter email" onChange={event => setEmail(event.target.value)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={event => setPass(event.target.value)} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={event => LoginServices.fetchItems(event, history, eMail, pass)}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        </div>
    );            
}

export default Login;
