import {ReactElement, useEffect} from "react";
import useAccount from "./useAccount";
import {Avatar, Button, Container} from "@mui/material";
import Input from "../Util/Input";
import Header from "../PageElements/Header";
import * as React from "react";
import {green} from "@mui/material/colors";
import "./accountStyle.css";
import {apiService} from "../Util/ApiService";
import {useNavigate} from "react-router";
import useUpdateAccount from "./useUpdateAccount";


function Account(): ReactElement {

    const {deleteUser, handleChange, user, error} = useAccount();
    const {updateU, handleChangeUpdate, update, errorUpdate} = useUpdateAccount();


    const navigate = useNavigate();

    const isTokenValid = apiService.checkToken();
    useEffect(() => {
        if (!isTokenValid) {
            navigate('/login');
            return;
        }
    }, [isTokenValid]);
    if (!isTokenValid) {
        return (<></>);
    }
    const userName = apiService.getDecodedAccessToken(apiService.getToken()).payload;
    // @ts-ignore
    return (
        <>
            <Container className="p-5 mb-4 bg-light rounded-4">
                <Header/>
            </Container>
            <Container style={{display: 'flex', justifyContent: 'center'}}>
                <form onSubmit={event => updateU(event)}>

                    <Avatar sx={{
                        justifyContent: "center",
                        display: "flex",
                        width: 80,
                        height: 40,
                        bgcolor: green[500]
                    }}>{userName.user}</Avatar>
                    <h2>Profile </h2>


                    <div className="form-group">

                        <Input label={'Current Password'} value={update.passwordd} onChange={handleChangeUpdate}
                               name={'passwordd'}
                               type={'password'} error={errorUpdate.get('passwordd')}/>
                        <Input label={'New Password'} value={update.newPassword} onChange={handleChangeUpdate}
                               name={'newPassword'}
                               type={'password'} error={errorUpdate.get('newPassword')}/>
                    </div>
                    <Button variant="contained" color="success" type="submit">
                        Change password
                    </Button>
                </form>

            </Container>

            <Container style={{display: 'flex', justifyContent: 'center'}}>
                <form onSubmit={event => deleteUser(event)}>

                    <div className="form-group">
                        <Input label={'Email'} value={user.email} onChange={handleChange} name={'email'}
                               type={'text'} error={error.get('email')}/>
                        <Input label={'Password'} value={user.password} onChange={handleChange} name={'password'}
                               type={'password'} error={error.get('password')}/>
                    </div>
                    <Button variant="contained" color="error" type="submit">
                        Delete Account
                    </Button>


                </form>
            </Container>

        </>

    );
}

export default Account;