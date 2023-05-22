import { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { IUserLogin, DefaultUserLogin } from './model';
import * as userService from '../../services/userService';
import jwt_decode from 'jwt-decode';
import { login } from '../../store/userSlice';
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hook";

function Login() {
    const dispatch = useDispatch();
    const [userLogin, setUserLogin] = useState<IUserLogin>(DefaultUserLogin)
    const [alert, setAlert] = useState<string>('')
    const userLoginTest = useAppSelector((state) => state.user.UserLogin)

    async function Login() {
        await userService.login(userLogin).then((result) => {
            if (result.success == false) {
                setAlert(result.message);
            } else {
                dispatch(login(jwt_decode(result.data.accessToken)))
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <div className="login-container">
            <div>
                <h1 className="loginH1">Login Form</h1>
                <div className="registerLink">
                    <Link to="/Register">Does not have an account?</Link>
                </div>
                <label>
                    <b>Username</b>
                </label>
                <input
                    className="inputRegister"
                    type="text"
                    id="username-input"
                    placeholder="Enter your username"
                    value={userLogin.username}
                    onChange={(event) => setUserLogin({ ...userLogin, username: event.target.value })}
                />
                <br />
                <br />
                <label>
                    <b>Password</b>
                </label>
                <input
                    className="inputRegister"
                    type="password"
                    id="password-input"
                    placeholder="Enter your password"
                    value={userLogin.password}
                    onChange={(event) => setUserLogin({ ...userLogin, password: event.target.value })}
                />
                <span style={{ color: 'red' }}>{alert}</span>
                <br />
                <br />
                <button type="submit" id="button-input" onClick={Login}>
                    Login
                </button>
                <div className="container">
                    <button type="button" className="cancelbtn">
                        <Link to="/home">Cancel</Link>
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
