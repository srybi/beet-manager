import Planting from "./Planting";
import {Dispatch, SetStateAction, useCallback, useContext,} from "react";
import {ConnectableElement, useDrag, useDrop} from "react-dnd";
import {ItemType} from "../PlantList/ItemType";
import {getSuggestedPlants} from "../PlantList/usePlantList";
import {initBed} from "./useBed";
import Plant from "../PlantList/Plant";
import {BedContext, BedErrorContext, PlantListContext} from "../Pages/ApplicationContext";
import {apiService} from "../Util/ApiService";

type Props = {
    planting : Planting;
}

async function postPlanting(planting: Planting) {
    const URL = apiService.getEndpoint("plants/positions")
    const header = apiService.getHeader()
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(planting)
    };
    return await fetch(URL, requestOptions)
}
async function onPlantDrop(planting: Planting,
                           newId : number,
                           setPlants: Dispatch<SetStateAction<Plant[]>>,
                           setBedFields: Dispatch<SetStateAction<Planting[]>>,
                           setBedError: Dispatch<SetStateAction<string>>) {

    const oldId = planting.plant_id
    planting.setValue(newId)
    const response = await postPlanting(planting)
    if(!response.ok){
        planting.setValue(oldId)
        const errorMsg = await response.text()
        setBedError(JSON.parse(errorMsg).message)
        return;
    }
    getSuggestedPlants().then(suggested => {
        setPlants(suggested)
    })

    initBed().then(init => {
        setBedFields(init)
    })

}

async function updatePlanting(planting: Planting) {
    const URL = apiService.getEndpoint(`plants/positions/${planting.id}`)
    const header = apiService.getHeader()
    const requestOptions = {
        method: "PUT",
        headers: header,
        body: JSON.stringify({x_pos: planting.x_pos, y_pos: planting.y_pos})
    };
    return await fetch(URL, requestOptions)
}

async function onPlantingDrop(planting: Planting,
                              setBedFields: Dispatch<SetStateAction<Planting[]>>,
                              setBedError: Dispatch<SetStateAction<string>>) {
    const response = await updatePlanting(planting)
    if (response.status === 304) {
        return;
    }
    if (!response.ok) {
        const errorMsg = await response.text()
        setBedError(JSON.parse(errorMsg).message)
        return;
    }

    initBed().then(init => {
        setBedFields(init)
    })
}


function useBedField({planting} : Props){
    const [, setPlants] = useContext(PlantListContext)
    const [, setBedFields] = useContext(BedContext)
    const [, setBedError] = useContext(BedErrorContext)


    const [,drag] = useDrag(() => ({
        type: ItemType.POSITION,
        item: planting,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
        canDrag: () => {
            return planting.plant_id !== undefined
        }
    }), [planting])

    const [{isOver}, drop] = useDrop(
        () => ({
            accept: [ItemType.PLANT, ItemType.POSITION],
            drop: (item, monitor) =>  {
                onDrop(monitor.getItem())
            },
            collect: (monitor) => ({
                isOver: monitor.isOver()
            })
        }), [planting])

    function attachRef(el : ConnectableElement) {
        drag(el)
        drop(el)
    }

    const onDrop = useCallback( (item : Planting | Plant)=> {
        if(item instanceof Planting){
            const data = JSON.parse(JSON.stringify(item))
            const dropPlanting = new Planting(planting.x_pos, planting.y_pos, data.id, data.plant_id)
            onPlantingDrop(dropPlanting, setBedFields, setBedError)
        }else{
            if(planting.id !== undefined){
                setBedError("This field is already taken")
                return;
            }
            const newId = JSON.parse(JSON.stringify(item)).id
            onPlantDrop(planting, newId, setPlants, setBedFields, setBedError)
        }
    }, [planting, setBedError, setPlants, setBedFields])

    return [planting, isOver, attachRef] as const
}

export default useBedField;
