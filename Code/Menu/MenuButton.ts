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
        this.BackColor = TBX.Color.Empty;
        this.ForeColor = TBX.Color.White;
        this.Border.Color = TBX.Color.White;
        this.Border.Width = 3;
        this.Border.Radius = 3;
        this.Size.X = 350;
        this.Size.Y = 100;
        this.Font = "'IBM Plex Sans Condensed', sans-serif;";
        this.Padding = 15;
        this.TextSize = 45;
        this.Events.MouseEnter.push(this.MouseEnter.bind(this));
        this.Events.MouseLeave.push(this.MouseLeave.bind(this));
    }
    private MouseEnter() : void
    {
        this.BackColor = TBX.Color.FromRGBA(50,50,50,50);
    }
    private MouseLeave() : void
    {
        this.BackColor = TBX.Color.Empty;
    }
}