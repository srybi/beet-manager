import {useEffect} from "react";
import {apiService} from "../Util/ApiService";
import {Container} from "@mui/material";
import Header from "../PageElements/Header";
import * as React from "react";
import {useNavigate} from "react-router";

function Logout() {

    localStorage.removeItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!apiService.checkToken()) {
            navigate('/login');
        }
    }, [navigate]);


    return (
        <Container className="p-5 mb-4 bg-light rounded-4">
            <Header/>
        </Container>
    );
}

export default Logout;