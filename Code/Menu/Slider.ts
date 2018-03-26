export { Slider }

import * as TBX from "engineer-js";

import { Title } from "./Title";

class Slider extends TBX.Tile
{
    private _Percent:number;
    private _Pointer:TBX.Tile;
    private _Label:Title;
    private _OnChange:Function[];
    public get Change():Function[] { return this._OnChange; }
    public constructor(Old?:Slider)
    {
        super(Old);
        this._OnChange = [];
        if(Old)
        {

        }
        else
        {
            this._Percent = 0.5;
            this.Init();
        }
    }
    public Init() : void
    {
        let Saved = localStorage.getItem("Volume");
        if(Saved)
        {
            this._Percent = JSON.parse(Saved);
        }
        this.Size = new TBX.Vertex(800, 50, 1);
        this.Paint = TBX.Color.FromString("#444444");
        this._Pointer = TBX.SceneObjectUtil.CreateTile("SliderPointer", null, new TBX.Vertex(), new TBX.Vertex(800, 50, 1));
        this._Pointer.Paint = TBX.Color.White;
        this.Events.Click.push(this.Click.bind(this));
        let Text:Title = new Title(null, "Volume", new TBX.Vertex(960, 150));
        Text.TextSize = 45;
        Text.Size.Y = 80;
        this._Label = Text;
    }
    public OnAttach(Args:any)
    {
        this._Label.Position.Y = this.Position.Y - 90;
        this.UpdatePointer();
        Args.Scene.Attach(this._Pointer);
        Args.Scene.Attach(this._Label);
    }
    private UpdatePointer() : void
    {
        this._Pointer.Size.X = this._Percent * this.Size.X;
        this._Pointer.Position = this.Position.Copy();
        this._Pointer.Position.X = this.Position.X - this.Size.X / 2 + this._Percent * (this.Size.X / 2);
    }
    public Toggle(Toggled:boolean) : void
    {
        this.Active = Toggled;
        this._Pointer.Active = Toggled;
        this._Label.Active = Toggled;
    }
    private Click(G:TBX.Game, Args:any) : void
    {
        let X = Args.Location.X;
        X -= this.Position.X - this.Size.X / 2;
        X /= this.Size.X;
        this._Percent = X;
        this.UpdatePointer();
        for(let i in this._OnChange)
        {
            this._OnChange[i](X);
        }
    }
}