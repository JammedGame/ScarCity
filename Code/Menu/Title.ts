export { Title }

import * as TBX from "engineer-js";

class Title extends TBX.Label
{
    public constructor(Old?:Title, Text?:string, Position?:TBX.Vertex)
    {
        super(Old, Text);
        if(Old)
        {

        }
        else
        {
            this.Init();
            if(Position) this.Position = Position;
        }
    }
    private Init() : void
    {
        this.BackColor = TBX.Color.Empty;
        this.ForeColor = TBX.Color.White;
        this.Border.Width = 0;
        this.Size.X = 800;
        this.Size.Y = 250;
        this.Padding = 20;
        this.TextSize = 150;
    }
}