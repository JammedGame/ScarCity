export { FieldTransform }

import * as TBX from "toybox-engine";

const FLOOR_SIZE = 4;
const TOWN_SIZE = 1000;
const TOWN_CENTER = 650;

class FieldTransform
{
    public static FindField(Location:TBX.Vertex) : TBX.Vertex
    {
        if(TBX.Vertex.Distance(new TBX.Vertex(960, TOWN_CENTER), Location) > TOWN_SIZE / 2) return null;
        let Closest:TBX.Vertex;
        let Distance:number = -1;
        for(let i = 0; i < FLOOR_SIZE; i++)
        {
            for(let j = 0; j < FLOOR_SIZE; j++)
            {
                let Field = new TBX.Vertex(i,j);
                let Coords:TBX.Vertex = this.FieldWorldCoords(Field);
                let CurrentDistance:number = this.CalcDistance(Coords, Location);
                if(Distance == -1 || CurrentDistance < Distance)
                {
                    Closest = Field;
                    Distance = CurrentDistance;
                }
            }
        }
        return Closest;
    }
    public static CalcDistance(Location:TBX.Vertex, Field:TBX.Vertex) : number
    {
        return TBX.Vertex.Distance(Location, Field);
    }
    public static Check(Location:TBX.Vertex, Field:TBX.Vertex) : boolean
    {
        let Distance:TBX.Vertex = new TBX.Vertex(Location.X - Field.X, Location.Y - Field.Y);
        let MaxSize:number = TOWN_SIZE / FLOOR_SIZE;
        MaxSize /= 2;
        return Math.abs(Distance.X) + Math.abs(Distance.Y) < MaxSize;
    }
    public static FieldWorldCoords(Field:TBX.Vertex) : TBX.Vertex
    {
        let Coords:TBX.Vertex = this.FieldCoords(Field);
        Coords.Y /= 1.73;
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
        if(Field.X == 3 && Field.Y == 2) return new TBX.Vertex(FS,-FS/2);

        if(Field.X == 0 && Field.Y == 0) return new TBX.Vertex(-1.5 * FS,0);
        if(Field.X == 1 && Field.Y == 1) return new TBX.Vertex(-FS/2,0);
        if(Field.X == 2 && Field.Y == 2) return new TBX.Vertex(FS/2,0);
        if(Field.X == 3 && Field.Y == 3) return new TBX.Vertex(1.5 * FS,0);

        if(Field.X == 0 && Field.Y == 1) return new TBX.Vertex(-FS,FS/2);
        if(Field.X == 1 && Field.Y == 2) return new TBX.Vertex(0,FS/2);
        if(Field.X == 2 && Field.Y == 3) return new TBX.Vertex(FS,FS/2);

        if(Field.X == 0 && Field.Y == 2) return new TBX.Vertex(-FS/2, FS);
        if(Field.X == 1 && Field.Y == 3) return new TBX.Vertex(FS/2, FS);

        if(Field.X == 0 && Field.Y == 3) return new TBX.Vertex(0, 1.5 * FS);
    }
    public static FieldZPosition(Field:TBX.Vertex) : number
    {
        if(Field.X == 3 && Field.Y == 0) return 0.01;

        if(Field.X == 2 && Field.Y == 0) return 0.02;
        if(Field.X == 3 && Field.Y == 1) return 0.02;

        if(Field.X == 1 && Field.Y == 0) return 0.03;
        if(Field.X == 2 && Field.Y == 1) return 0.03;
        if(Field.X == 3 && Field.Y == 2) return 0.03;

        if(Field.X == 0 && Field.Y == 0) return 0.04;
        if(Field.X == 1 && Field.Y == 1) return 0.04;
        if(Field.X == 2 && Field.Y == 2) return 0.04;
        if(Field.X == 3 && Field.Y == 3) return 0.04;

        if(Field.X == 0 && Field.Y == 1) return 0.05;
        if(Field.X == 1 && Field.Y == 2) return 0.05;
        if(Field.X == 2 && Field.Y == 3) return 0.05;

        if(Field.X == 0 && Field.Y == 2) return 0.06;
        if(Field.X == 1 && Field.Y == 3) return 0.06;

        if(Field.X == 0 && Field.Y == 3) return 0.07;
    }
}