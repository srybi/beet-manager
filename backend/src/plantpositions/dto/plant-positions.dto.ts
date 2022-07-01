import {IsInt, IsNotEmpty} from "class-validator";

export class PlantPositionsDto {
    id: number;

    @IsNotEmpty()
    @IsInt()
    plant_id: number;

    @IsNotEmpty()
    @IsInt()
    x_pos: number;

    @IsNotEmpty()
    @IsInt()
    y_pos: number;
}
