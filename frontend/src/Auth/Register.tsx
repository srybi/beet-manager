import {ReactElement, useEffect} from "react";
import "./form.css"
import useRegister from "./useRegister";
import Input from "../Util/Input";
import {Button, Container} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import {useNavigate} from "react-router";
import {apiService} from "../Util/ApiService";


function Register(): ReactElement {
    const { doRegister, error, register, handleChange } = useRegister();
    const navigate = useNavigate();

    useEffect(() => {
        if (apiService.checkToken()) {
            navigate("/home");
        }
    }, []);

    return (
        <Container style={{display: "flex", justifyContent: "center"}}>
            <form className="register" onSubmit={event => doRegister(event)}>
                <h3>Register</h3>
                <div className="form-group">
                    <Input label={"Username"} value={register.username} onChange={handleChange} name={"username"}
                           type={"text"} error={error.get("username")}/>
                    <Input label={"Email"} value={register.email} onChange={handleChange} name={"email"}
                           type={"text"} error={error.get("email")}/>
                    <Input label={"Password"} value={register.password} onChange={handleChange} name={"password"}
                           type={"password"} error={error.get("password")}/>
                    <Input label={"Confirm Password"} value={register.passwordConfirm} onChange={handleChange} name={"passwordConfirm"}
                           type={"password"} error={error.get("passwordConfirm")}/>
                </div>
            <br/>
                <Button variant="contained" color="success" size= "small" type="submit" >
                    register
                </Button>
                <br/>
                <br/>
                <div>
                    Have an account?&nbsp;
                    <Button variant="text" size="small" onClick={() => navigate("/login")}>
                        Login&nbsp;&nbsp;<LoginIcon/>
                    </Button>
                </div>
            </form>
        </Container>
    );
}

export default Register;
