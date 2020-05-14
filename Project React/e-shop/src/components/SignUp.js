import React, {useEffect} from 'react';
import '../App.css';
import {Link, useHistory} from 'react-router-dom';

function SignUp() {

    let history = useHistory();

    useEffect(() => {
        checkSession();
    }, [])

    function checkSession() {
        if (sessionStorage.getItem('name') != null) {
            history.push('/IndexApp');
        }
    }

    return (
        <div className='App'>
            <form>
                <div className='Container'>
                    <h3>Sign Up</h3>
                </div>

                <div className='Container'>
                    <p className='ContainerElementMargin'>or</p>
                </div>

                <div className='Container'>
                    <Link to='/components/Login'>
                        <p className='ContainerElementMargin loginSignUpLink'>Login</p>
                    </Link>
                </div>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered  <Link to='/components/Login'>
                        <a className='ContainerElementMargin loginSignUpLink'>Sign In</a>
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
