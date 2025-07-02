export { Title }

import * as TBX from "toybox-engine";

class Title extends TBX.UI.Label
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
        this.Style.Border.Width = 0;
        this.Size.X = 1200;
        this.Size.Y = 400;
        this.Style.Padding.All = 20;
        this.Style.Text.Size = 150;
    }
}