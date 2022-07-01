import BedField from "./BedField"
import './Bed.css'
import useBed, {getBedHeight, getBedWidth} from "./useBed"
import * as React from "react";


function Bed() {

    const bedFields = useBed();

    if(bedFields[0] !== undefined){
        return (
            <div className="Bed">
                <div className="BedGrid">
                    {[...Array(getBedHeight())].map((rows, index) =>
                        <div className="BedGridRow"
                             key={index}>
                            {[...Array(getBedWidth())].map((field, sIndex) =>
                                    <BedField
                                        planting={bedFields[index * getBedWidth() + sIndex]}
                                        key={sIndex}
                                    />
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }else{
        return (
            <></>
        )
    }
}

export default Bed