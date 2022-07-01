import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("bed_types")
export class BedTypesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
