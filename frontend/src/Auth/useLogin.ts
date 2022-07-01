import {useState, ChangeEvent, useContext, FormEvent} from "react";
import {TokenContext} from "../App"
import {useNavigate} from "react-router";
import {apiService} from "../Util/ApiService";

type login = {
    username : string,
    password : string,
}

async function doSignIn(username : string, password : string) : Promise<Response> {
    const URL = apiService.getEndpoint("users/signin")
    const body = `{"username": "${username}", "password": "${password}"}`
    //crypto.createHash("sha256");
    //login.password = crypto(login.password).digest("hex");
    return await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: body
    });
}

function handleError(errorMsg : string) : Map<string, string> {
    const resultMap = new Map<string, string>()
    resultMap.set("username", "")
    resultMap.set("password", errorMsg)
    return resultMap;
}

function hasValues(credentials : login) : Map<string, string>{
    const resultMap = new Map<string, string>()
    if(credentials.username.length === 0){
        resultMap.set("username", "Username can not be empty")
    }
    if(credentials.password.length === 0){
        resultMap.set("password", "Password can not be empty")
    }
    return resultMap;
}

function useLogin() {
    const [login, setLogin] = useState({ username: "", password: "" });
    const [errorMsg, setErrorMsg] = useState(new Map<string, string>());
    const [, setToken] = useContext(TokenContext)
    const navigator = useNavigate();

    async function doLogin(event : FormEvent) {
        event.preventDefault()
        const errors = hasValues(login)
        if(errors.size !== 0){
            setErrorMsg(errors)
            return;
        }
        const response = await doSignIn(login.username, login.password)
        if (response.ok) {
            const data = await response.text();
            const jsonData = await JSON.parse(data)
            localStorage.setItem("token", jsonData.token)
            setToken(jsonData.token)
            navigator("/")
        } else {
            const msg = await response.text()
            setErrorMsg(handleError(JSON.parse(msg).message));
        }
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setLogin((prevLogin) => ({
            ...prevLogin,
            [event.target.name]: event.target.value,
        }));
    }

    return {
        doLogin,
        errorMsg,
        login,
        handleChange,
    };
}

export default useLogin;