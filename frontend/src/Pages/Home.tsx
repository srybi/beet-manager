import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ThemeProvider} from "styled-components";
import {themeTwo} from "../theme";
import Header from "../PageElements/Header";
import PlantList from "../PlantList/PlantList";
import Bed from "../Bed/Bed";
import {Footer} from "../PageElements/Footer";
import * as React from "react";
import {Container} from "@mui/material";
import ApplicationContext from "./ApplicationContext";
import Body from "../PageElements/Body";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {apiService} from "../Util/ApiService";


function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!apiService.checkToken()) {
            navigate('/login');
        }
    }, []);


    return (
        <DndProvider backend={HTML5Backend}>
            <ThemeProvider theme={themeTwo}>
                <Container className="p-5 mb-4 bg-light rounded-4">
                    <Header/>
                </Container>
                <ApplicationContext>
                    <Container style={{display: 'flex', justifyContent: 'center'}}>
                       <h4>Choose a plant: </h4>
                    </Container>
                    <Container style={{display: 'flex', justifyContent: 'center'}}>
                        <PlantList/>
                    </Container>

                    <Container style={{display: 'flex', justifyContent: 'center'}}>
                        <h4 className="bed">Plant your bed:</h4>
                    </Container>
                    <br/>
                    <Container style={{display: 'flex', justifyContent: 'center'}}>
                        <Bed/>
                    </Container>
                <Body/>
                </ApplicationContext>
            </ThemeProvider>
        </DndProvider>
    );
}

export default Home;
