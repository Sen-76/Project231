import { useState, useEffect } from 'react';
import { IUser } from './model';
import * as userService from '../../services/userService'

function UserForm() {
    const [reLoadList, setReloadList] = useState<boolean>(false);
    const [listuser, setListuser] = useState<IUser[]>([]);
    useEffect(() => {
        userService.getUsersList(1).then((result) => {
            setListuser(result);
        }).catch((error) => {
            console.error(error);
        });
    }, [reLoadList])
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>username</th>
                        <th>password</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>avatar</th>
                        <th>dateOfBirth</th>
                        <th>role</th>
                        <th>status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listuser?.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.avatar}</td>
                                <td>{user.dateOfBirth?.toString()}</td>
                                <td>{user.role}</td>
                                <td>{user.status}</td>
                                {/* <td>
                                    <button type="button" onClick={() => Publish(user.id)} >Publish</button>
                                    <button type="button" onClick={() => Delete(user.id)} >Delete</button>
                                </td> */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default UserForm;