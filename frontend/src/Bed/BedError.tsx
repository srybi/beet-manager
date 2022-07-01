import {useContext} from "react";
import {BedErrorContext} from "../Pages/ApplicationContext";
import {Alert, Fade} from "@mui/material";
import * as React from "react";

function BedError() {

    const [bedError, setBedError] = useContext(BedErrorContext)

    setTimeout(() => {
        setBedError('')
    }, 1000 * 10)

    return(
        <Fade in={bedError != ''}>
            <Alert variant='filled' severity="error" onClose={() => {setBedError('')}}>
                {bedError}
            </Alert>
        </Fade>
    )
}

export default BedError