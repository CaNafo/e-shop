import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link, useHistory } from 'react-router-dom';
import SignUpServices from '../services/SignUpService'

function SignUp() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [eMail, setEmail] = useState('');
    const [Pass, setPass] = useState('');
    const [bdate, setBdate] = useState('');

    let history = useHistory();

    function onCheck(e) {
        if (e.checked) {
            localStorage.setItem("fname", fname);
            localStorage.setItem("lname", lname);
            localStorage.setItem("eMail", eMail);
            localStorage.setItem("Pass", Pass);
            localStorage.setItem("bdate", bdate);
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
                    <input type="text"
                        className="form-control"
                        required
                        placeholder="First name"
                        value={fname} onChange={set => setFname(set.target.value)} />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text"
                        className="form-control"
                        required
                        placeholder="Last name"
                        value={lname} onChange={set => setLname(set.target.value)} />
                </div>

                <div>
                    <label>
                        Birthday
                    </label>
                    <input type="date"
                        className="form-control"
                        required
                        placeholder="Place you birthdate"
                        value={bdate}
                        onChange={set => setBdate(set.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email"
                        className="form-control"
                        required
                        placeholder="Enter email"
                        value={eMail} onChange={set => setEmail(set.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password"
                        className="form-control"
                        required
                        placeholder="Enter password"
                        value={Pass} onChange={set => setPass(set.target.value)} />
                </div>

                <button type="submit"
                    className="btn btn-primary btn-block"
                    onClick={set => SignUpServices.fetchItems(set, history, fname, lname, eMail, Pass, bdate)}>Sign Up</button>

                <p className="forgot-password text-right" >
                    Already registered  <Link to='/components/Login'>Sign In
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
