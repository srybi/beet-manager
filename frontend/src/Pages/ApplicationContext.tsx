import {createContext, Dispatch, SetStateAction, useState} from "react";
import Plant from "../PlantList/Plant";
import Planting from "../Bed/Planting";

type ContextProps = {
    children: React.ReactNode; // 👈️ type children
};

export const PlantListContext = createContext<[Plant[], Dispatch<SetStateAction<Plant[]>>]>
([[], () => {
}]);


export const BedContext = createContext<[ Planting[] , Dispatch<SetStateAction<Planting[]>>]>
([[], () => {
}]);

export const BedErrorContext = createContext<[ string, Dispatch<SetStateAction<string>>]>
(["", () => {
}]);

function ApplicationContext(props: ContextProps){
    const [plantList, setPlants] = useState<Plant[]>([])
    const [bedFields, setBed] = useState<Planting[]>([])
    const [bedError, setBedError] = useState<string>("")

    return(
        <>
        <BedContext.Provider value={[bedFields, setBed]}>
            <BedErrorContext.Provider value={[bedError, setBedError]}>
                <PlantListContext.Provider value={[plantList, setPlants]}>
                    {props.children}
                </PlantListContext.Provider>
            </BedErrorContext.Provider>
        </BedContext.Provider>
        </>
    )
}


export default ApplicationContext;