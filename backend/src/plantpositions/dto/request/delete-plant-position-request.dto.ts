import {IsInt, IsNotEmpty} from "class-validator";

export class DeletePlantPositionRequestDto {
    @IsNotEmpty()
    @IsInt()
    x_pos: number;

    @IsNotEmpty()
    @IsInt()
    y_pos: number;
}
