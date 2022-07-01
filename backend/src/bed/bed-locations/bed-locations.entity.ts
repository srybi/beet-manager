import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('bed_locations')
export class BedLocationsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
