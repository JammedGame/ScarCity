export { MenuButton }

import * as TBX from "engineer-js";

class MenuButton extends TBX.Button
{
    public constructor(Old?:MenuButton, Text?:string, Event?:Function, Position?:TBX.Vertex)
    {
        super(Old, Text);
        if(Old)
        {

        }
        else
        {
            this.Init();
            if(Event) this.Events.Click.push(Event);
            if(Position) this.Position = Position;
        }
    }
    private Init() : void
    {
        this.BackColor = TBX.Color.FromString("#FF8C00");
        this.ForeColor = TBX.Color.White;
        this.Border.Color = TBX.Color.White;
        this.Border.Width = 5;
        this.Border.Radius = 48;
        this.Size.X = 350;
        this.Size.Y = 100;
        this.Padding = 20;
        this.TextSize = 45;
    }
}