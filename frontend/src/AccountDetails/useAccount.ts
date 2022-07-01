import {apiService} from "../Util/ApiService";
import {useNavigate} from "react-router";
import {ChangeEvent, FormEvent, useState} from "react";
import validator from "validator";

type user = {
    email: string,
    password: string,
};

async function deleteU(email: string, password: string): Promise<Response> {
    const token = apiService.getToken();
    const tokenInfo = apiService.getDecodedAccessToken(token);
    const URL = apiService.getEndpoint('users/' + tokenInfo.payload.id)
    const header = apiService.getHeader()
    const body = `{"email": "${email}", "password": "${password}"}`
    const requestOptions = {
        method: 'DELETE',
        headers: header,
        body: body
    };
    const response = await fetch(URL, requestOptions);
    return response;
}


function validate(information: user): Map<string, string> {
    const resultMap = hasValues(information)
    if (resultMap.size !== 0) {
        return resultMap
    }
    if (information.email.length < 3 || information.email.length > 20) {
        resultMap.set('email', 'The email is invalid, it must be between 3 and 20 characters long')
    }
    if (!validator.isEmail(information.email)) {
        resultMap.set('email', 'The email address specified is invalid. Example format: me@example.org')
    }
    if (information.password.length < 14 || information.password.length > 100) {
        resultMap.set('password', 'The password is invalid, it must be between 14 and 100 characters long.')
    }
    return resultMap;
}

function hasValues(information: user): Map<string, string> {
    const resultMap = new Map<string, string>()
    if (information.email.length === 0) {
        resultMap.set('email', 'Email can not be empty')
    }
    if (information.password.length === 0) {
        resultMap.set('password', 'Password can not be empty')
    }
    return resultMap;
}

function handleError(error: string): Map<string, string> {
    const resultMap = new Map<string, string>()
    resultMap.set('email', error)
    resultMap.set('password', error)
    return resultMap;
}


function useAccount() {
    const [user, setUser] = useState({email: "", password: ""});
    const navigate = useNavigate();
    const [error, setError] = useState(new Map<string, string>());

    async function deleteUser(event: FormEvent) {
        event.preventDefault();
        const errors = validate(user)
        setError(errors)
        if (errors.size !== 0) {
            return;
        }
        const response = await deleteU(user.email, user.password)
        if (response.ok) {
            localStorage.removeItem('token')
            navigate('/login')

        } else {
            const msg = await response.text();
            const errors = handleError(JSON.parse(msg).message)
            setError(errors);
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setUser((prevRegister) => ({
            ...prevRegister,
            [event.target.name]: event.target.value,
        }));
    }

    return {deleteUser, handleChange, user, error};


}

export default useAccount;