import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity("plant_positions")
export class PlantPositionsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    plant_id: number;

    @Column({name: 'pos_x'})
    x_pos: number;

    @Column({name: 'pos_y'})
    y_pos: number;
}
