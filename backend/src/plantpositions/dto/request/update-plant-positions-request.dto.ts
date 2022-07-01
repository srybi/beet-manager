import {IsInt, IsNotEmpty, IsPositive, Length, Min, MinLength} from "class-validator";

export class UpdatePlantPositionsRequestDto {
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    x_pos: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    y_pos: number;
}
