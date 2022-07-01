import { ReactComponent as LogoSleep } from "../Icons/compostSleep.svg"
import { ReactComponent as LogoWorking } from "../Icons/compostWorking.svg"
import "./Compost.css"
import useCompost from "./useCompost";

function Compost(){

    const [{isOver}, drop] = useCompost()

    if(isOver){
        return (
            <div className="Compost">
                <LogoWorking ref={drop}/>
            </div>
        )
    }else{
        return (
            <div className="Compost">
                <LogoSleep ref={drop}/>
            </div>
        )
    }
}

export default Compost