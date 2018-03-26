export { Town }

import * as TBX from "engineer-js";

import { Title } from "./../Menu/Title";
import { MenuButton } from "./../Menu/MenuButton";
import { Floor } from "./Floor";
import { Layout } from "./Layout/Layout";
import { Building } from "./Building/Building";
import { FieldTransform } from "./FieldTransform";
import { GameScene } from "./../GameScene/GameScene";
import { SoundManager } from "./../Menu/SoundManager";

const TOWN_SIZE = 1000;
const TOWN_CENTER = 650;

class Town
{
    private _Finished:boolean;
    private _Current:number;
    private _Scene:TBX.Scene2D;
    private _Base:TBX.Tile;
    private _Grid:TBX.Tile;
    private _Up:TBX.Tile;
    private _Down:TBX.Tile;
    private _Sky:TBX.Tile;
    private _Stars:TBX.Tile;
    private _Clouds:TBX.Tile;
    private _Floors:Floor[];
    private _Pointer:Building;
    private _Indicator:Title;
    private _Restart:TBX.Tile;
    public constructor(Old?:Town, Scene?:TBX.Scene2D)
    {
        this._Floors = [];
        if(Scene) this._Scene = Scene;
        if(Old)
        {
            this._Current = Old._Current;
            this._Finished = Old._Finished;
            for(let i in this._Floors) this._Floors.push(Old._Floors[i].Copy());
        }
        else
        {
            this._Current = 0;
            this._Finished = false;
            this.Init();
        }
    }
    public Copy(Scene?:TBX.Scene2D) : Town
    {
        return new Town(this, Scene);
    }
    private Init() : void
    {
        this.InitBackground();
        this._Floors.push(new Floor(null, 0));
        this._Base = TBX.SceneObjectUtil.CreateTile("Base", ["/Resources/Textures/Town/Base.png"], new TBX.Vertex(960, TOWN_CENTER+260), new TBX.Vertex(1000,2000));
        this._Grid = TBX.SceneObjectUtil.CreateTile("Grid", ["/Resources/Textures/Town/Grid.png"], new TBX.Vertex(960, TOWN_CENTER), new TBX.Vertex(1000,1000));
        this._Grid.Paint = TBX.Color.FromString("#DFDFDF");
        this._Grid.Active = false;
        this._Scene.Attach(this._Base);
        this._Scene.Attach(this._Grid);
        this._Scene.Events.Click.push(this.MouseClick.bind(this));
        this._Scene.Events.MouseMove.push(this.MouseMove.bind(this));
        this._Indicator = new Title(null, "Floor: 1", new TBX.Vertex(1770, 920, 1));
        this._Indicator.Size.Y = 80;
        this._Indicator.TextSize = 50;
        this._Scene.Attach(this._Indicator);
        this._Restart = TBX.SceneObjectUtil.CreateTile("Title", ["Resources/Textures/Icons/Restart.png"], new TBX.Vertex(1550, 100, 1), new TBX.Vertex(60,60));
        this._Restart.Events.Click.push(this.Restart.bind(this));
        this._Scene.Attach(this._Restart);
        this.InitMovers();
    }
    private Restart()
    {
        (<GameScene>this._Scene).Resources.InitGlobal();
        while(this._Current != 0) this.DownClick();
        for(let i in this._Floors) this._Floors[i].Destroy(this._Scene);
        this._Floors = [];
        this._Floors.push(new Floor(null, 0));
        this._Finished = false;
    }
    private InitBackground() : void
    {
        this._Sky = TBX.SceneObjectUtil.CreateTile("Sky", ["/Resources/Textures/Town/Sky.png"], new TBX.Vertex(960, TOWN_CENTER - 1624), new TBX.Vertex(1920,4320));
        this._Stars = TBX.SceneObjectUtil.CreateTile("Stars", ["/Resources/Textures/Town/Stars.png"], new TBX.Vertex(960, TOWN_CENTER - 1624), new TBX.Vertex(1920,4320));
        this._Clouds = TBX.SceneObjectUtil.CreateTile("Stars", ["/Resources/Textures/Town/Clouds.png"], new TBX.Vertex(960, TOWN_CENTER - 1624), new TBX.Vertex(1920,4320));
        this._Scene.Attach(this._Sky);
        this._Scene.Attach(this._Stars);
        this._Scene.Attach(this._Clouds);
    }
    private InitMovers() : void
    {
        this._Up = TBX.SceneObjectUtil.CreateTile("Up", ["/Resources/Textures/Icons/Up.png"], new TBX.Vertex(1720, 1000, 1), new TBX.Vertex(80,100,1));
        this._Down = TBX.SceneObjectUtil.CreateTile("Down", ["/Resources/Textures/Icons/Down.png"], new TBX.Vertex(1820, 1000, 1), new TBX.Vertex(80,100,1));
        this._Up.Events.Click.push(this.UpClick.bind(this));
        this._Down.Events.Click.push(this.DownClick.bind(this));
        this._Scene.Attach(this._Up);
        this._Scene.Attach(this._Down);
        this.UpdateMovers();
    }
    public SetPointer(Selected:Building) : void
    {
        if(this._Finished) return;
        if(this._Pointer)
        {
            this._Scene.Remove(this._Pointer);
            this._Pointer = null;
        }
        this._Pointer = Selected.Copy();
        this._Pointer.Position.Z = 1;
        this._Pointer.Data["OffsetX"] = Selected.Data["OffsetX"];
        this._Pointer.Data["OffsetY"] = Selected.Data["OffsetY"];
        this._Pointer.Active = false;
        this._Scene.Attach(this._Pointer);
    }
    private MouseMove(G:TBX.Game, Args:any) : void
    {
        let Loc = FieldTransform.FindField(Args.Location);
        if(Loc && this._Pointer)
        {
            if(!this._Floors[this._Current].Layout.ApplyAble(this._Pointer.Structure, Loc))
            {
                this._Pointer.Unavailable();
            }
            else if(this._Current != 0 && !this._Floors[this._Current-1].Layout.Copy().Invert().ApplyAbleArray(this._Pointer.Foundations, Loc))
            {
                this._Pointer.Unavailable();
            }
            else this._Pointer.Available();
            this._Pointer.SetLocation(Loc, this._Current);
            this._Pointer.Toggle(true);
            this._Grid.Position.Z = 0.1 * (this._Current+1);
            this._Grid.Active = true;
        }
        else
        {
            if(this._Pointer) this._Pointer.Toggle(false);
            this._Grid.Active = false;
        }
    }
    private MouseClick(G:TBX.Game, Args:any) : void
    {
        let Loc = FieldTransform.FindField(Args.Location);
        if(Loc && this._Pointer)
        {
            this.Build(Loc);
        }
    }
    private Build(Location:TBX.Vertex) : void
    {
        if(!this._Floors[this._Current].Layout.ApplyAble(this._Pointer.Structure, Location)) return;
        if(this._Current != 0 && !this._Floors[this._Current-1].Layout.Copy().Invert().ApplyAbleArray(this._Pointer.Foundations, Location))
        {
            return;
        }
        SoundManager.Single.Effect();
        let NewBuilding:Building = this._Pointer.Copy();
        (<GameScene>this._Scene).Resources.Pay(NewBuilding.Price);
        (<GameScene>this._Scene).Resources.Receive(NewBuilding.Income);
        (<GameScene>this._Scene).UpdateRes();
        this._Floors[this._Current].Layout.Apply(NewBuilding.Structure, Location);
        NewBuilding.SetLocation(Location, this._Current);
        if(NewBuilding.Unitar)
        {
            NewBuilding.SetUnitar(this._Scene);
            this._Finished = true;
        }
        this._Floors[this._Current].Buildings.push(NewBuilding);
        this._Scene.Attach(NewBuilding);
        this._Scene.Remove(this._Pointer);
        this._Pointer = null;
        if(this._Current + 1 == this._Floors.length) this._Floors.push(new Floor(null, this._Floors.length));
        this.UpdateMovers();
    }
    private UpClick() : void
    {
        if(this._Finished) return;
        if(!this._Up.Active) return;
        this._Floors[this._Current+1].Toggle(true);
        this._Current++;
        for(let i in this._Floors) this._Floors[i].Up();
        this._Base.Position.Y += 138;
        this.UpBackground();
        this.UpdateMovers();
    }
    private UpBackground() : void
    {
        this._Sky.Position.Y += 69;
        this._Stars.Position.Y += 92;
        this._Clouds.Position.Y += 115;
    }
    private DownClick() : void
    {
        if(this._Finished) return;
        if(!this._Down.Active) return;
        this._Current--;
        for(let i in this._Floors) this._Floors[i].Down();
        this._Floors[this._Current+1].Toggle(false);
        this._Base.Position.Y -= 138;
        this.DownBackground();
        this.UpdateMovers();
    }
    private DownBackground() : void
    {
        this._Sky.Position.Y -= 69;
        this._Stars.Position.Y -= 92;
        this._Clouds.Position.Y -= 115;
    }
    private UpdateMovers() : void
    {
        this._Indicator.Text = "Floor: " + (this._Current +1);
        this._Down.Active = this._Current > 0;
        this._Up.Active = this._Current + 1 < this._Floors.length;
        this.ShadeFloors();
    }
    private ShadeFloors() : void
    {
        for(let i = 0; i < this._Floors.length; i++)
        {
            if(i == this._Current) this._Floors[i].SetShade(TBX.Color.White);
            else if(Math.abs(this._Current - i) == 1) this._Floors[i].SetShade(TBX.Color.FromString("#EEEEEE"));
            else if(Math.abs(this._Current - i) == 2) this._Floors[i].SetShade(TBX.Color.FromString("#DDDDDD"));
            else if(Math.abs(this._Current - i) == 3) this._Floors[i].SetShade(TBX.Color.FromString("#CCCCCC"));
            else this._Floors[i].SetShade(TBX.Color.FromString("#BBBBBB"));
        }
    }
}