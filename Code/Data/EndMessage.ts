export { EndMessage }

import * as TBX from "toybox-engine";

import { MenuButton } from "./../Menu/MenuButton";

class EndMessage extends TBX.UI.Panel
{
    private _Text:TBX.UI.Label;
    private _Restart:MenuButton;
    public constructor(Old?:EndMessage, Confirm?:Function)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {
            this.Init(Confirm);
        }
    }
    public Copy() : EndMessage
    {
        return new EndMessage(this);
    }
    private Init(Confirm:Function) : void
    {
        this.Position = new TBX.Vertex(0,0);
        this.Size = new TBX.Vertex(800,300);
        this.Dock = TBX.UI.DockType.Center;
        this.Active = false;
        this.BackColor = TBX.Color.FromRGBA(0,0,0,60);
        this.Style.Border.Width = 0;
        this.Style.Border.Radius = 30;

        let text = new TBX.UI.Label(null, "Congratulations!\n You have built The Wonder and completed the game.");
        text.BackColor = TBX.Color.Empty;
        text.ForeColor = TBX.Color.White;
        text.Dock = TBX.UI.DockType.Top;
        text.Position = new TBX.Vertex(0, 50);
        text.Size = new TBX.Vertex(750,80);
        text.Style.Border.Width = 0;
        text.Style.Text.Size = 42;
        text.Style.Values.textAlign = 'center';
        text.Active = false;
        this._Text = text;
        this.Attach(text);

        let restart = new MenuButton(null, "Play Again", Confirm, new TBX.Vertex(420, 0));
        restart.Dock = TBX.UI.DockType.Bottom;
        restart.Active = false;
        restart.Style.Text.Size = 45;
        restart.Style.Padding.All = 5;
        restart.Style.Values.bottom = '3vh';
        restart.Size = new TBX.Vertex(250, 80);
        this._Restart = restart;
        this.Attach(restart);
    }
    public Toggle(Toggled:boolean) : void
    {
        this.Active = Toggled;
        this._Text.Active = Toggled;
        this._Restart.Active = Toggled;
    }
}
