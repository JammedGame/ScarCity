export { Building }

import * as TBX from "engineer-js";

import { Layout } from "./../Layout/Layout";
import { Resource } from "./../Resource/Resource";
import { ResourceSet } from "./../Resource/ResourceSet";
import { FieldTransform } from "./../FieldTransform";

const VERTICAL_OFFSET = 72;
const SATELITE_SIZE = 280;

class Building extends TBX.Tile
{
    private _BID:string;
    private _Income:Resource;
    private _Price:ResourceSet;
    private _Structure:Layout;
    private _Foundations:Layout[];
    private _Satelites:TBX.Tile[];
    public get BID():string { return this._BID; }
    public get Income():Resource { return this._Income; }
    public set Income(value:Resource) { this._Income = value; }
    public get Price():ResourceSet { return this._Price; }
    public set Price(value:ResourceSet) { this._Price = value; }
    public get Structure():Layout { return this._Structure; }
    public get Foundations():Layout[] { return this._Foundations; }
    public constructor(Old?:Building, BID?:string)
    {
        super(Old);
        this._Foundations = [];
        this._Satelites = [];
        if(Old)
        {
            this._BID = Old._BID;
            this._Income = Old._Income.Copy();
            this._Price = Old._Price.Copy();
            this._Structure = Old._Structure.Copy();
            for(let i in Old._Foundations) this._Foundations.push(Old._Foundations[i].Copy());
            for(let i in Old._Satelites)
            {
                this._Satelites.push(Old._Satelites[i].Copy());
                this._Satelites[i].Data["Offset"] = Old._Satelites[i].Data["Offset"];
            }
        }
        else
        {
            if(BID) this._BID = BID;
            else this._BID = "";
            this._Income = new Resource();
            this._Price = new ResourceSet();
            this._Structure = new Layout(null, new TBX.Vertex(2,2));
            this.Active = false;
        }
    }
    public Copy() : Building
    {
        return new Building(this);
    }
    public Init() : void
    {
        for(let i = 0; i < this._Structure.Size.X; i++)
        {
            for(let j = 0; j < this._Structure.Size.Y; j++)
            {
                if(this._Structure.Fields[j*this._Structure.Size.X + i] == 1)
                {
                    let Satelite:TBX.Tile = TBX.SceneObjectUtil.CreateTile(this._BID+"_"+i+"_"+j,
                    ["/Resources/Textures/Buildings/"+this._BID+"/"+this._BID+"_"+i+"_"+j+".png"]);
                    Satelite.Size = new TBX.Vertex(SATELITE_SIZE,SATELITE_SIZE,1);
                    Satelite.Data["Offset"] = new TBX.Vertex(i,j);
                    Satelite.Position = new TBX.Vertex(-1000,-1000);
                    this._Satelites.push(Satelite);
                }
            }
        }
    }
    public OnAttach(Args:any) : void
    {
        let Scene:TBX.Scene2D = Args.Scene;
        for(let i in this._Satelites) Scene.Attach(this._Satelites[i]);
    } 
    public OnRemove(Args:any) : void
    {
        let Scene:TBX.Scene2D = Args.Scene;
        for(let i in this._Satelites) Scene.Remove(this._Satelites[i]);
    } 
    public BuildAble(Floor:Layout, Position:TBX.Vertex) : boolean
    {
        return Floor.ApplyAbleArray(this._Foundations, Position);
    }
    public Build(Floor:Layout, Position:TBX.Vertex) : void
    {
        Floor.Apply(this._Structure, Position);
    }
    public SetLocation(Location:TBX.Vertex, Floor:number) : void
    {
        this.Position = Location;
        for(let i in this._Satelites)
        {
            let Satelite = this._Satelites[i];
            let SLocation:TBX.Vertex = Location.Copy().Add(Satelite.Data["Offset"]);
            if(SLocation.X > 3 || SLocation.Y > 3)
            {
                Satelite.Position = new TBX.Vertex(-1000,-1000);
                continue;
            }
            let Loc:TBX.Vertex = FieldTransform.FieldWorldCoords(SLocation);
            Loc.Y -= VERTICAL_OFFSET;
            Loc.Z = 0.1 * (Floor+1) + FieldTransform.FieldZPosition(SLocation);
            Satelite.Position = Loc;
        }
    }
    public Toggle(Toggled:boolean) : void
    {
        for(let i in this._Satelites) this._Satelites[i].Active = Toggled;
    }
    public Available() : void
    {
        for(let i in this._Satelites)
        {
            this._Satelites[i].Paint = TBX.Color.White;
            this._Satelites[i].Modified = true;
        }
    }
    public Unavailable() : void
    {
        for(let i in this._Satelites)
        {
            this._Satelites[i].Paint = TBX.Color.Red;
            this._Satelites[i].Modified = true;
        }
    }
    public MoveUp() : void
    {
        for(let i in this._Satelites)
        {
            this._Satelites[i].Position.Y -= 138;
        }
    }
    public MoveDown() : void
    {
        for(let i in this._Satelites)
        {
            this._Satelites[i].Position.Y += 138;
        }
    }
    public SetShade(Color:TBX.Color) : void
    {
        for(let i in this._Satelites)
        {
            this._Satelites[i].Paint = Color;
            this._Satelites[i].Modified = true;
        }
    }
}