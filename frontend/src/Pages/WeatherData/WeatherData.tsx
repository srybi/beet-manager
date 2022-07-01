import React, {useEffect, useState} from "react"
import {Card, CardContent, Container, Typography} from "@mui/material";
import {apiService} from "../../Util/ApiService";
import {WeatherDataResponse} from "./WeatherDataResponse";

type Props = {
    state : string
}

async function getApiData(state : string){
    const apiKey = apiService.getOpenWeatherApi();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

    return await fetch(apiUrl)

}

function WeatherData ({state} : Props) {
    const [apiData, setApiData] = useState<WeatherDataResponse>()

    useEffect(() => {
        getApiData(state).then(resp => {
            return resp.json()
        }).then(data => {
            setApiData(data)
        })
    }, [state]);

    if(apiData){
        return(

            <Container style={{display: "flex", justifyContent: "center"}}>

                <Card sx={{ minWidth: 275 }}>
                    <img
                        src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                        alt="weather status icon"
                        className="weather-icon"
                    />
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            City Name: {apiData.name}
                        </Typography>
                        <Typography variant="h5" component="div">
                            Weather: {apiData.weather[0].main}
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Temperature: {(apiData.main.temp/10).toFixed(2)}°C
                                Max: {(apiData.main.temp_max/10).toFixed(2)}°C
                                Min: {(apiData.main.temp_min/10).toFixed(2)}°C
                            </Typography>
                        </Typography>

                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Humidity {apiData.main.humidity}%
                        </Typography>
                        <Typography variant="body2">
                           Country: {apiData.sys.country}
                            <br/>


                        </Typography>

                    </CardContent>

                </Card>

            </Container>
        )
    }else{
        return (
            <>Something went wrong...</>
        )
    }
}

export default WeatherData;
