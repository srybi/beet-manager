import PlantListItem from "./PlantListItem";
import './PlantList.css';
import usePlantList from "./usePlantList";


function PlantList(){

    const plantList = usePlantList()

    return (
        <div className = "plantList">
            <ul className='plantUl'>
                {plantList.map((plant) => {
                    return (
                        <PlantListItem plant={plant} key={plant.id}/>
                    );
                })}
            </ul>
        </div>
    )

}

export default PlantList
