
import Planting from './Planting'
import './Bed.css'
import useBedField from "./useBedField";
import Icons from "../Icons/Icons";
import Plant from "../PlantList/Plant";
import usePlantList from "../PlantList/usePlantList";


type Props = {
    planting : Planting;
}

function BedField({planting} : Props){

    const [plant, isOver, refs] = useBedField({planting});
    return (
        <div className="BedField" 
             data-xpos={planting.x_pos} 
             data-ypos={planting.y_pos}
             data-isover={isOver}
             data-isempty={plant.plant_id !== undefined}
             ref={refs}>
                <Icons id={plant.plant_id}/>

        </div>
    )   
}

export default BedField