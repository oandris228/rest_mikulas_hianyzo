import { IsIn, Matches } from "class-validator";

const materials = ["wood", "metal", "plastic", "other"]

export class CreateToyDto {
    name: string;
    @IsIn(materials)
    material: string;
    weight: number;
}
