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
        this.Position = new TBX.Vertex(960,540);
        this.Size = new TBX.Vertex(800,300);
        this.Active = false;
        this.BackColor = TBX.Color.FromRGBA(50,50,50,50);
        this.Style.Border.Width = 0;
        this.Style.Border.Radius = 3;
        let Text = new TBX.UI.Label(null, "Congratulations! You have built The Wonder and completed the game.");
        Text.BackColor = TBX.Color.Empty;
        Text.ForeColor = TBX.Color.White;
        Text.Position = new TBX.Vertex(960, 480);
        Text.Size = new TBX.Vertex(650,80);
        Text.Style.Border.Width = 0;
        Text.Style.Text.Size = 30;
        Text.Active = false;
        this._Text = Text;
        let Res = new MenuButton(null, "Play Again", Confirm, new TBX.Vertex(960, 620));
        Res.Active = false;
        Res.Style.Text.Size = 45;
        Res.Style.Padding.All = 5;
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