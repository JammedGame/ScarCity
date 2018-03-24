export { Town }

import * as TBX from "engineer-js";

import { Layout } from "./Layout/Layout";
import { Building } from "./Building/Building";
import { FieldTransform } from "./FieldTransform";

const TOWN_SIZE = 1000;
const TOWN_CENTER = 650;

class Town
{
    private _Scene:TBX.Scene2D;
    private _Base:TBX.Tile;
    private _Grid:TBX.Tile;
    private _Floors:Layout[];
    private _Pointer:Building;
    private _Buildings:Building[];
    public constructor(Old?:Town, Scene?:TBX.Scene2D)
    {
        this._Floors = [];
        this._Buildings = [];
        if(Scene) this._Scene = Scene;
        if(Old)
        {
            for(let i in this._Floors) this._Floors.push(Old._Floors[i].Copy());
            for(let i in this._Buildings) this._Buildings.push(Old._Buildings[i].Copy());
        }
        else
        {
            this.Init();
        }
    }
    public Copy(Scene?:TBX.Scene2D) : Town
    {
        return new Town(this, Scene);
    }
    private Init() : void
    {
        this._Floors.push(new Layout(null, new TBX.Vertex(4,4)));
        this._Base = TBX.SceneObjectUtil.CreateTile("Base", ["/Resources/Textures/Town/Base.png"], new TBX.Vertex(960, TOWN_CENTER), new TBX.Vertex(1000,1000));
        this._Base.Data["Pickable"] = true;
        this._Grid = TBX.SceneObjectUtil.CreateTile("Grid", ["/Resources/Textures/Town/Grid.png"], new TBX.Vertex(960, TOWN_CENTER), new TBX.Vertex(1000,1000));
        this._Scene.Attach(this._Base);
        this._Scene.Attach(this._Grid);
        this._Pointer = new Building(null, "Rose");
        this._Scene.Events.MouseMove.push(this.MouseMove.bind(this));
    }
    private MouseMove(G:TBX.Game, Args:any) : void
    {
        //console.log(Args.Location);
        let Loc = FieldTransform.FindField(Args.Location);
        console.log(Loc);
    }
    
}