import * as React from "react";
import "./Icons.css";
import {ReactComponent as TomatoIcon} from "./tomato.svg";
import {ReactComponent as KarotteIcon} from "./carrot.svg";
import {ReactComponent as GurkeIcon} from "./cucumber.svg";
import {ReactComponent as KartoffelIcon} from "./potato.svg";
import {ReactComponent as ZwiebelIcon} from "./onion.svg";

type Props = {
    id : number | undefined;
}
function Icons ({id}: Props) {

    return (
        <>
        {(() => {
            switch (id) {
                case 1:
                    return <TomatoIcon/>
                case 2:
                    return <GurkeIcon/>

                case 3:
                    return <KartoffelIcon/>

                case 4:
                    return <KarotteIcon/>

                case 5:
                    return <ZwiebelIcon/>

                default:
                    return;

            }
        })()}
        </>
    )



}
export default Icons;