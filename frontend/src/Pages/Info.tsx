import {Button, Container, Input} from "@mui/material";
import Header from "../PageElements/Header";
import * as React from "react";
import {useState} from "react";
import {themeTwo} from "../theme";
import {ThemeProvider} from "styled-components";
import WeatherData from "./WeatherData/WeatherData";

function Info(){

    const [state, setState] = useState('');
    const [isActive, setIsActive] = useState(false)

     const inputHandler = (event: { target: { value: React.SetStateAction<string>; }; }) => {
            setIsActive(false)
            setState(event.target.value);
     };


     return (
        <>
            <ThemeProvider theme={themeTwo}>
                <Container className="p-5 mb-4 bg-light rounded-4">
                    <Header/>
                </Container>

                        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
                            <div className="col-auto">
                                <label htmlFor="location-name" className="col-form-label">
                                    Enter Location
                                </label>
                                <br/>
                                <br/>
                            </div>
                                <Input
                                    type="text"
                                    id="location-name"
                                    name="city"
                                    onChange={inputHandler}
                                    value={state}
                                />

                             <div>
                                 <br/>
                                 <br/>
                            <Button variant ="contained" color="success" onClick={() => {setIsActive(true)}}>
                                Search
                            </Button>
                             </div>
                        </div>
                <br/>
                <br/>
                <div>
                            <span className="weather-value">
                                { isActive && <WeatherData state={state}/>}
                            </span>
                </div>
            </ThemeProvider>
        </>
    );
}
export default Info;