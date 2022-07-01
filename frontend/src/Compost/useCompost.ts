import {useDrop} from "react-dnd";
import {ItemType} from "../PlantList/ItemType";
import Planting from "../Bed/Planting";
import {getSuggestedPlants} from "../PlantList/usePlantList";
import {initBed} from "../Bed/useBed";
import {useCallback, useContext} from "react";
import {BedContext, PlantListContext} from "../Pages/ApplicationContext";
import {apiService} from "../Util/ApiService";

async function deletePosition(position : Planting){
    const URL = apiService.getEndpoint(`plants/positions/${position.id}`);
    const header = apiService.getHeader()

    const requestOptions = {
        method: "DELETE",
        headers: header,
        body: JSON.stringify({x_pos: position.x_pos, y_pos: position.y_pos})
    };

    return await fetch(URL, requestOptions)
}

function useCompost(){

    const [, setPlants] = useContext(PlantListContext)
    const [, setBedFields] = useContext(BedContext)

    const [{isOver}, drop] = useDrop(
        () => ({
            accept: ItemType.POSITION,
            drop: (item, monitor) =>  {
                onDrop(JSON.parse(JSON.stringify(monitor.getItem())))
            },
            collect: (monitor) => ({
                isOver: monitor.isOver()
            })
        }), [])

    const onDrop = useCallback(async (item: Planting) => {
        const response = await deletePosition(item)
        if(response.ok){
            getSuggestedPlants().then(suggested => {
                setPlants(suggested)
            })
            initBed().then(bedFields => {
                setBedFields(bedFields)
            })
        }

    }, [])

    return [{isOver}, drop] as const
}

export default useCompost;
