import {useState, FormEvent, ChangeEvent, createContext, Dispatch, SetStateAction, useContext} from 'react';
import {useNavigate} from "react-router";
import {apiService} from "../Util/ApiService";
import validator from 'validator';

type register = {
    username: string,
    email: string,
    password: string,
    passwordConfirm: string
}

async function doSignUp(username : string, email : string, password : string) : Promise<Response> {
    const URL = apiService.getEndpoint('users/signup')
    const body = `{"username": "${username}", "email": "${email}", "password": "${password}"}`
    const response = await fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'Application/json'},
        body: body
    });
    return response
}

function validate(information : register) : Map<string, string>{
    const resultMap = hasValues(information)
    if(resultMap.size !== 0){
        return resultMap
    }
    if(information.username.length < 3 || information.username.length > 20){
        resultMap.set('username', 'The username must be between 3 and 20 characters long')
    }
    if(!validator.isEmail(information.email)){
        resultMap.set('email', 'The email address specified is invalid. Example format: me@example.org')
    }
    if(information.password.length < 14 || information.password.length > 100){
        resultMap.set('password', 'The password must be between 14 and 100 characters long. The more the better')
    }else{
        if(information.password !== information.passwordConfirm){
            resultMap.set('passwordConfirm', "Those passwords don't match! Try again.")
        }
    }
    return resultMap;
}

function hasValues(information : register) : Map<string, string>{
    const resultMap = new Map<string, string>()
    if(information.username.length === 0){
        resultMap.set('username', 'Username can not be empty')
    }
    if(information.email.length === 0){
        resultMap.set('email', 'Email can not be empty')
    }
    if(information.password.length === 0){
        resultMap.set('password', 'Password can not be empty')
    }
    if(information.passwordConfirm.length === 0){
        resultMap.set('passwordConfirm', "Confirm password can not be empty")
    }
    return resultMap;
}

function handleError(error : string) : Map<string, string> {
    const resultMap = new Map<string, string>()
    if(error.includes('username') || error.includes('user')){
        resultMap.set('username', error)
    }
    if(error.includes('email')){
        resultMap.set('email', error)
    }
    return resultMap;
}

function useRegister() {
    const [register, setRegister] = useState({ username: '',email:'', password: '', passwordConfirm: ''});
    const [error, setError] = useState(new Map<string, string>());
    const navigate = useNavigate()

    async function doRegister(event: FormEvent) {
        event.preventDefault()
        const errors = validate(register)
        setError(errors)
        if(errors.size !== 0){
            return;
        }
        const response = await doSignUp(register.username, register.email, register.password)
        if (response.ok) {
            navigate('/login')
        } else {
            const msg = await response.text();
            const errors = handleError(JSON.parse(msg).message)
            setError(errors);
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setRegister((prevRegister) => ({
            ...prevRegister,
            [event.target.name]: event.target.value,
        }));
    }

    return {
        doRegister,
        error,
        register,
        handleChange,
    };
}

export default useRegister;