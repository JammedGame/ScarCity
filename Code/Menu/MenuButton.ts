export { MenuButton }

import * as TBX from "toybox-engine";

class MenuButton extends TBX.UI.Button
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
            if(Position) this.Position = new TBX.Vertex(0, Position.Y, Position.Z);
        }
    }
    private Init() : void
    {
        this.BackColor = TBX.Color.Empty;
        this.ForeColor = TBX.Color.White;
        this.Style.Border.Color = TBX.Color.White;
        this.Style.Border.Width = 3;
        this.Style.Border.Radius = 30;
        this.Dock = TBX.UI.DockType.Top;
        this.Size.X = 350;
        this.Size.Y = 100;
        this.Style.Padding.All = 18;
        this.Style.Text.Size = 70;
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
