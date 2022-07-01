import {useDrag} from "react-dnd";
import {ItemType} from "./ItemType";
import Plant from "./Plant";

function getColorFromHarmony(harmony : number) : string {
    if(harmony === 1){
        return '#b3ef88';
    }
    else if(harmony === 0){
        return '#f8f4ca';
    }
    else{
        return '#d9cec5';
    }
}

function getTextDecorationFromHarmony(harmony: number) : string {
    if (harmony >= 0) {
        return '';
    }
    return "line-through #000";
}

function usePlantListItem(plant : Plant){

    const [{ isDragging}, drag] = useDrag(() => ({
        type: ItemType.PLANT,
        item: plant,
        collect: (monitor) => ({
            item: monitor.getItem<Plant>(),
            isDragging: monitor.isDragging()
        }),
        canDrag: () => {
            return plant.harmony !== -1
        }
    }), [plant])

    return [isDragging, drag, getColorFromHarmony(plant.harmony), getTextDecorationFromHarmony(plant.harmony)] as const
}

export default usePlantListItem