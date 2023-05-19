import { useState } from 'react';
import './index.scss';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isEnable, setEnable] = useState(true);
    const handleKeyUp = () => {
        if (username.length > 0 && password.length > 0) setEnable(false);
        else setEnable(true);
    };
    return (
        <div className="container">
            <div>
                <h1 className="loginH1">Login Form</h1>
                <div className='registerLink'>Does not have an account?</div>
                <label>
                    <b>Username</b>
                </label>
                <input
                    type="text"
                    id="username-input"
                    placeholder="Enter your username"
                    value={username}
                    onKeyUp={handleKeyUp}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <br />
                <br />
                <label>
                    <b>Password</b>
                </label>
                <input
                    type="password"
                    id="password-input"
                    placeholder="Enter your password"
                    onKeyUp={handleKeyUp}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <br />
                <br />
                <button type="submit" id="button-input" disabled={isEnable}>
                    Login
                </button>
                <div className="container">
                    <button type="button" className="cancelbtn">
                        Cancel
                    </button>
                    <span className="psw">
                        Forgot <a href="#">password?</a>
                    </span>
                </div>
            </div>
        </div>
    );
}
export default Login;
