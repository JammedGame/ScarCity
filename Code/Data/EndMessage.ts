export { EndMessage }

import * as TBX from "engineer-js";

import { MenuButton } from "./../Menu/MenuButton";

class EndMessage extends TBX.Panel
{
    private _Text:TBX.Label;
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
        this.Position = new TBX.Vertex(960,540);
        this.Size = new TBX.Vertex(800,300);
        this.Active = false;
        this.BackColor = TBX.Color.FromRGBA(50,50,50,50);
        this.Border.Width = 0;
        this.Border.Radius = 3;
        let Text = new TBX.Label(null, "Congratulations! You have built The Wonder and completed the game.");
        Text.BackColor = TBX.Color.Empty;
        Text.ForeColor = TBX.Color.White;
        Text.Position = new TBX.Vertex(960, 480);
        Text.Size = new TBX.Vertex(650,80);
        Text.Border.Width = 0;
        Text.TextSize = 30;
        Text.Active = false;
        this._Text = Text;
        let Res = new MenuButton(null, "Play Again", Confirm, new TBX.Vertex(960, 620));
        Res.Active = false;
        Res.TextSize = 45;
        Res.Padding = 5;
        Res.Size = new TBX.Vertex(250, 80);
        
        this._Restart = Res;
    }
    public OnAttach(Args:any) : void
    {
        super.OnAttach(Args);
        Args.Scene.Attach(this._Text);
        Args.Scene.Attach(this._Restart);
    }
    public Toggle(Toggled:boolean) : void
    {
        this.Active = Toggled;
        this._Text.Active = Toggled;
        this._Restart.Active = Toggled;
    }
}