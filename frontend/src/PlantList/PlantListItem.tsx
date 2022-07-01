import Plant from "./Plant"
import "./PlantList.css";
import {useState} from "react";
import * as React from "react";
import {Box, Button, Modal, Typography} from "@mui/material";
import Icons from "../Icons/Icons";
import usePlantListItem from "./usePlantListItem";

type Props = {
    plant : Plant;
}

const styleBox = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function PlantListItem({plant} : Props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [isDragging, drag, bgcolor, textDecoration] = usePlantListItem(plant)


    return (
        <>
            <Button className="plantListButton" size="small" ref={drag} onClick={handleOpen} sx={{
                bgcolor: bgcolor,
                textDecoration: textDecoration,
                marginRight: 1}}>
                <li className="plantListItem"
                    style={{opacity: isDragging ? 0.5 : 1}}>
                    <div className="plantListItemChild">
                        <Icons id={plant.id}/>
                    </div>
                    <div>{plant.name}</div>
                </li>
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={styleBox}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {plant.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        The {plant.name} is soo yummy!
                    </Typography>
                </Box>
            </Modal>

        </>
    );
}

export default PlantListItem
