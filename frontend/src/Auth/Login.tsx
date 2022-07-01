import useLogin from "./useLogin";
import "./form.css";
import Input from "../Util/Input";
import {useNavigate} from "react-router";
import {Button, Container, Stack} from "@mui/material";
import {useEffect} from "react";
import {apiService} from "../Util/ApiService";

function Login(){

    const { doLogin, errorMsg, login, handleChange } = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if (apiService.checkToken()) {
            navigate('/home');
        }
    }, []);

    return (
        <Container style={{display: 'flex', justifyContent: 'center'}}>
            <form className="login" onSubmit={event => doLogin(event)}>
                <h3>Login</h3>
                <Input label={'Username'} value={login.username} onChange={handleChange} name={'username'}
                       type={'text'} error={errorMsg.get('username')}/>
                <Input label={'Password'} value={login.password} onChange={handleChange} name={'password'}
                       type={'password'} error={errorMsg.get('password')}/>
                <br/>
                <Stack direction="row" spacing={2}>
                <Button variant="contained" size="small"  color="success" type="submit"  >login</Button>

                <div>
                    New here?&nbsp;
                    <Button variant='text' size='small' onClick={() => navigate('/register')}>Register</Button>
                </div>

                </Stack>
                </form>
        </Container>
    )
}

/*
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                </div>
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                </div>
 */
export default Login;
