import {apiService} from "../Util/ApiService";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router";


type update = {

    passwordd: string,
    newPassword: string,

};

async function updateUser(passwordd: string, newPassword: string): Promise<Response> {
    const token = apiService.getToken();
    const tokenInfo = apiService.getDecodedAccessToken(token);
    const URL = apiService.getEndpoint('users/users/' + tokenInfo.payload.id);
    const header = apiService.getHeader();
    const body = `{"password": "${passwordd}", "newPassword": "${newPassword}" }`
    const requestOptions = {
        method: 'PUT',
        headers: header,
        body: body
    };
    const response = await fetch(URL, requestOptions);
    return response;
}

function validate(information: update): Map<string, string> {
    const resultMap = hasValues(information)
    if (resultMap.size !== 0) {
        return resultMap
    }
    if (information.passwordd.length < 14 || information.passwordd.length > 100) {
        resultMap.set('password', 'The password must be between 14 and 100 characters long.')
    }
    if (information.newPassword.length < 14 || information.passwordd.length > 100) {
        resultMap.set('password', 'The password must be between 14 and 100 characters long.')
    }
    return resultMap;
}

function hasValues(information: update): Map<string, string> {
    const resultMap = new Map<string, string>()

    if (information.passwordd.length === 0) {
        resultMap.set('password', 'Password can not be empty')
    }
    return resultMap;
}

function handleError(error: string): Map<string, string> {
    const resultMap = new Map<string, string>()
    if (error.includes('passwordd')) {
        resultMap.set('passwordd', error)
    }
    if (error.includes('email')) {
        resultMap.set('email', error)
    }
    return resultMap;
}

function useUpdateAccount() {
    const [update, setUpdate] = useState({passwordd: "", newPassword: ""});
    const [errorUpdate, setError] = useState(new Map<string, string>());
    const navigate = useNavigate();

    async function updateU(event: FormEvent) {
        event.preventDefault();
        const errors = validate(update)
        setError(errors)
        if (errors.size !== 0) {
            return;
        }
        const response = await updateUser(update.passwordd, update.newPassword)
        if (response.ok) {
            localStorage.removeItem('token')
            navigate('/login')

        } else {
            const msg = await response.text();
            const errors = handleError(JSON.parse(msg).message)
            setError(errors);
        }

    }

    function handleChangeUpdate(event: ChangeEvent<HTMLInputElement>) {
        setUpdate((prevRegister) => ({
            ...prevRegister,
            [event.target.name]: event.target.value,
        }));
    }

    return {updateU, handleChangeUpdate, update, errorUpdate};
}

export default useUpdateAccount;