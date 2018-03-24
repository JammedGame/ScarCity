export { FieldTransform }

import * as TBX from "engineer-js";

const FLOOR_SIZE = 4;
const TOWN_SIZE = 1000;
const TOWN_CENTER = 650;

class FieldTransform
{
    public static FindField(Location:TBX.Vertex) : TBX.Vertex
    {
        for(let i = 0; i < FLOOR_SIZE; i++)
        {
            for(let j = 0; j < FLOOR_SIZE; j++)
            {
                let Field = new TBX.Vertex(i,j);
                let Coords:TBX.Vertex = this.FieldWorldCoords(Field);
                if(this.Check(Location, Coords))
                {
                    return Field;
                }
            }
        }
        return null;
    }
    public static Check(Location:TBX.Vertex, Field:TBX.Vertex) : boolean
    {
        let Distance:TBX.Vertex = new TBX.Vertex(Location.X - Field.X, Location.Y - Field.Y);
        Distance.Y *= 1.73;
        return Math.abs(Distance.X) + Math.abs(Distance.Y) < TOWN_SIZE / FLOOR_SIZE;
    }
    public static FieldWorldCoords(Field:TBX.Vertex) : TBX.Vertex
    {
        let Coords:TBX.Vertex = this.FieldCoords(Field);
        Coords.X += 960;
        Coords.Y += TOWN_CENTER;
        return Coords;
    }
    public static FieldCoords(Field:TBX.Vertex) : TBX.Vertex
    {
        let FS = TOWN_SIZE / FLOOR_SIZE;

        if(Field.X == 3 && Field.Y == 0) return new TBX.Vertex(0, -1.5 * FS);

        if(Field.X == 2 && Field.Y == 0) return new TBX.Vertex(-FS/2, -FS);
        if(Field.X == 3 && Field.Y == 1) return new TBX.Vertex(FS/2, -FS);

        if(Field.X == 1 && Field.Y == 0) return new TBX.Vertex(-FS,-FS/2);
        if(Field.X == 2 && Field.Y == 1) return new TBX.Vertex(0,-FS/2);
        if(Field.X == 3 && Field.Y == 2) return new TBX.Vertex(-FS,-FS/2);

        if(Field.X == 0 && Field.Y == 0) return new TBX.Vertex(-1.5 * FS,0);
        if(Field.X == 1 && Field.Y == 1) return new TBX.Vertex(-FS/2,0);
        if(Field.X == 2 && Field.Y == 2) return new TBX.Vertex(FS/2,0);
        if(Field.X == 3 && Field.Y == 3) return new TBX.Vertex(1.5 * FS,0);

        if(Field.X == 0 && Field.Y == 1) return new TBX.Vertex(-FS,FS/2);
        if(Field.X == 1 && Field.Y == 2) return new TBX.Vertex(0,FS/2);
        if(Field.X == 2 && Field.Y == 3) return new TBX.Vertex(-FS,FS/2);

        if(Field.X == 0 && Field.Y == 2) return new TBX.Vertex(-FS/2, FS);
        if(Field.X == 1 && Field.Y == 3) return new TBX.Vertex(FS/2, FS);

        if(Field.X == 0 && Field.Y == 3) return new TBX.Vertex(0, 1.5 * FS);
    }
}