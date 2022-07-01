import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity("plant_relations")
export class PlantRelationsEntity {
    @PrimaryColumn()
    plant_id_1: number;

    @PrimaryColumn()
    plant_id_2: number;

    @Column()
    harmony: number;
}
