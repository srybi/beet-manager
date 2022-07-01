import {IsInt, IsNotEmpty} from "class-validator";

export class CreatePlantPositionRequestDto {
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
