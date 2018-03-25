export { Town }

import * as TBX from "engineer-js";

import { Floor } from "./Floor";
import { Layout } from "./Layout/Layout";
import { Building } from "./Building/Building";
import { FieldTransform } from "./FieldTransform";

const TOWN_SIZE = 1000;
const TOWN_CENTER = 650;

class Town
{
    private _Current:number;
    private _Scene:TBX.Scene2D;
    private _Base:TBX.Tile;
    private _Grid:TBX.Tile;
    private _Up:TBX.Tile;
    private _Down:TBX.Tile;
    private _Floors:Floor[];
    private _Pointer:Building;
    public constructor(Old?:Town, Scene?:TBX.Scene2D)
    {
        this._Floors = [];
        if(Scene) this._Scene = Scene;
        if(Old)
        {
            this._Current = Old._Current;
            for(let i in this._Floors) this._Floors.push(Old._Floors[i].Copy());
        }
        else
        {
            this._Current = 0;
            this.Init();
        }
    }
    public Copy(Scene?:TBX.Scene2D) : Town
    {
        return new Town(this, Scene);
    }
    private Init() : void
    {
        this._Floors.push(new Floor(null, 0));
        this._Base = TBX.SceneObjectUtil.CreateTile("Base", ["/Resources/Textures/Town/Base.png"], new TBX.Vertex(960, TOWN_CENTER), new TBX.Vertex(1000,1000));
        this._Grid = TBX.SceneObjectUtil.CreateTile("Grid", ["/Resources/Textures/Town/Grid.png"], new TBX.Vertex(960, TOWN_CENTER), new TBX.Vertex(1000,1000));
        this._Grid.Active = false;
        this._Scene.Attach(this._Base);
        this._Scene.Attach(this._Grid);
        this._Scene.Events.Click.push(this.MouseClick.bind(this));
        this._Scene.Events.MouseMove.push(this.MouseMove.bind(this));
        this.InitMovers();
    }
    private InitMovers() : void
    {
        this._Up = TBX.SceneObjectUtil.CreateTile("Up", ["/Resources/Textures/Icons/Up.png"], new TBX.Vertex(1700, 1000), new TBX.Vertex(80,100,1));
        this._Down = TBX.SceneObjectUtil.CreateTile("Down", ["/Resources/Textures/Icons/Down.png"], new TBX.Vertex(1800, 1000), new TBX.Vertex(80,100,1));
        this._Up.Paint = TBX.Color.Aqua;
        this._Down.Paint = TBX.Color.Aqua;
        this._Up.Events.Click.push(this.UpClick.bind(this));
        this._Down.Events.Click.push(this.DownClick.bind(this));
        this._Scene.Attach(this._Up);
        this._Scene.Attach(this._Down);
        this.UpdateMovers();
    }
    public SetPointer(Selected:Building) : void
    {
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
            if(!this._Floors[this._Current].Layout.ApplyAble(this._Pointer.Structure, Loc)) this._Pointer.Paint = TBX.Color.Red;
            else this._Pointer.Paint = TBX.Color.White;
            this._Pointer.Modified = true;
            let BuildLoc:TBX.Vertex = FieldTransform.FieldWorldCoords(Loc);
            BuildLoc.X -= this._Pointer.Data["OffsetX"];
            BuildLoc.Y -= this._Pointer.Data["OffsetY"];
            BuildLoc.Z = 0.1 * (this._Current+1) + FieldTransform.FieldZPosition(Loc);
            this._Pointer.Position = BuildLoc;
            this._Pointer.Active = true;
            this._Grid.Active = true;
        }
        else
        {
            if(this._Pointer) this._Pointer.Active = false;
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
        let NewBuilding:Building = this._Pointer.Copy();
        this._Floors[this._Current].Layout.Apply(NewBuilding.Structure, Location);
        let BuildLoc:TBX.Vertex = FieldTransform.FieldWorldCoords(Location);
        BuildLoc.X -= this._Pointer.Data["OffsetX"];
        BuildLoc.Y -= this._Pointer.Data["OffsetY"];
        BuildLoc.Z = 0.1 * (this._Current+1) + FieldTransform.FieldZPosition(Location);
        NewBuilding.Position = BuildLoc;
        this._Floors[this._Current].Buildings.push(NewBuilding);
        this._Scene.Attach(NewBuilding);
        this._Scene.Remove(this._Pointer);
        this._Pointer = null;
        if(this._Current + 1 == this._Floors.length) this._Floors.push(new Floor(null, this._Floors.length));
        this.UpdateMovers();
    }
    private UpClick() : void
    {
        this._Current++;
        for(let i in this._Floors) this._Floors[i].Up();
        this._Base.Position.Y += 138;
        this.UpdateMovers();
    }
    private DownClick() : void
    {
        this._Current--;
        for(let i in this._Floors) this._Floors[i].Down();
        this._Base.Position.Y -= 138;
        this.UpdateMovers();
    }
    private UpdateMovers() : void
    {
        this._Down.Active = this._Current > 0;
        this._Up.Active = this._Current + 1 < this._Floors.length;
    }
}