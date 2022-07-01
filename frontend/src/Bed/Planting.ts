class Planting {
    id: number | undefined;
    plant_id: number | undefined;
    x_pos: number;
    y_pos: number;

    constructor(x:number, y:number, id?: number, plant_id?: number){
        this.id = id ?? undefined;
        this.plant_id = plant_id ?? undefined;
        this.x_pos = x;
        this.y_pos = y;
    }

    public setId(id:number|undefined) {
        this.id = id
    }

    public setValue(v:number|undefined) {
         this.plant_id = v;
    }

   
}


export default Planting