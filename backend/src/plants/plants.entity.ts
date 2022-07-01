import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity("plants")
export class PlantsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    harmony: number = 0;
}
