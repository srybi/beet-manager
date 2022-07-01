import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("orientations")
export class OrientationsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
