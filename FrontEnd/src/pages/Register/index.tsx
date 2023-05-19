import { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [alert, setAlert] = useState(false);
    const [isEnable, setEnable] = useState(true);
    const handleKeyUp = () => {
        if (username.length > 0 && password.length > 0) {
            setEnable(false);
        } else setEnable(true);
    };
    const RegisterHandle = () => {
        if (password === password2) {
            setAlert(false);
            //xử lí gửi dữ liệu đi
        } else {
            setAlert(true);
        }
    };
    // const cancelHandle = () => {
    //     //thực hiện hành động hủy
    // };

    return (
        <div className="register-container">
            <div>
                <h1 className="RegisterH1">Register Form</h1>
                <div className="registerLink">
                    <Link to="/Login">Already have an account?</Link>
                </div>
                <label>
                    <b>Enter Username</b>
                </label>
                <input
                    className="inputLogin"
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
                    <b>Enter Password</b>
                </label>
                <input
                    className="inputLogin"
                    type="password"
                    id="password-input"
                    placeholder="Enter your password"
                    onKeyUp={handleKeyUp}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <br />
                <br />
                <label>
                    <b>Enter password again</b>
                </label>
                <input
                    className="inputLogin"
                    type="password"
                    id="password-input"
                    placeholder="Enter your password"
                    onKeyUp={handleKeyUp}
                    value={password2}
                    onChange={(event) => setPassword2(event.target.value)}
                />
                <br />
                <br />
                {alert === true && <div className="alert">Password are not the same!</div>}
                <button type="submit" id="button-input" disabled={isEnable} onClick={() => RegisterHandle()}>
                    Register
                </button>
                <div className="container">
                    <button type="button" className="cancelbtn">
                        <Link to="/home">Cancel</Link>
                    </button>
                    <span className="psw">
                        Forgot <Link to="/">password?</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}
export default Register;
