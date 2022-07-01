import {useContext, useEffect} from "react";
import Planting from "./Planting";
import {BedContext} from "../Pages/ApplicationContext"
import {apiService} from "../Util/ApiService";

async function getAllPlantPositions() : Promise<Planting[]> {
    const existing : Planting[] = []
    const GET_URL = apiService.getEndpoint("plants/positions")
    const header = apiService.getHeader()
    const response = await fetch(GET_URL,{
        headers: header
    })
    const data = await response.json();
    for(let i in data.plants){
        const tmp = new Planting(data.plants[i].x_pos, data.plants[i].y_pos, data.plants[i].id, data.plants[i].plant_id)
        existing.push(tmp);
    }
    return existing;
}

function getIfExisting(existing : Planting[], x : number, y:number) : Planting {
    for(let p of existing){
        if(p.x_pos === x && p.y_pos === y){
            return p;
        }   
    }
    return new Planting(x, y);
}

export function getBedHeight() : number{
    return 3;
}
export function getBedWidth() : number{
    return 5;
}
export async function initBed() : Promise<Planting[]>{
    const tmp : Planting[] = []
    const existing = await getAllPlantPositions();
    for(let i = 0; i < getBedHeight(); i++){
        for(let j = 0; j < getBedWidth(); j++){
            const p = getIfExisting(existing, i, j);
            tmp.push(p)
        }
    }
    return tmp;
}

 function useBed() : Planting[] {
    const [bedFields, setBedFields] = useContext(BedContext)

    useEffect(() => {
        initBed().then(init => {
            setBedFields(init)
        })
    }, [])

    return bedFields;
}

export default useBed