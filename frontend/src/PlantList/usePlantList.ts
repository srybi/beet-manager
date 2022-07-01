import {useContext, useEffect, } from "react";
import Plant from "./Plant";
import {PlantListContext} from "../Pages/ApplicationContext";
import {apiService} from "../Util/ApiService";

export async function getSuggestedPlants() : Promise<Plant[]>{
    const GET_URL = apiService.getEndpoint("plants")
    const header = apiService.getHeader()

    const response = await fetch(GET_URL,{
        headers: header
    })
    const data = await response.json();
    return data.plants
}

function usePlantList() {

    const [plantList, setPlants] = useContext(PlantListContext)

    useEffect(() => {
        getSuggestedPlants().then(suggested => {
            setPlants(suggested)
        })
    }, [])

    return plantList
}

export default usePlantList;