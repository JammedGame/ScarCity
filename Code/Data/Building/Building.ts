export { Building }

import * as TBX from "engineer-js";

import { Layout } from "./../Layout/Layout";
import { ResourceSet } from "./../Resource/ResourceSet";

class Building extends TBX.Tile
{
    private _BID:string;
    private _Price:ResourceSet;
    private _Structure:Layout;
    private _Foundations:Layout;
    private _Satelites:TBX.Tile[];
    public get BID():string { return this._BID; }
    public get Price():ResourceSet { return this._Price; }
    public get Structure():Layout { return this._Structure; }
    public get Foundations():Layout { return this._Foundations; }
    public constructor(Old?:Building, BID?:string)
    {
        super(Old);
        if(Old)
        {
            this._BID = Old._BID;
            this._Price = Old._Price.Copy();
            this._Structure = Old._Structure.Copy();
            this._Foundations = Old._Foundations.Copy();
        }
        else
        {
            if(BID) this._BID = BID;
            else this._BID = "";
            this._Price = new ResourceSet();
            this._Structure = new Layout(null, new TBX.Vertex(2,2));
            this._Foundations = new Layout(null, new TBX.Vertex(2,2));
        }
    }
    public Copy() : Building
    {
        return new Building(this);
    }
    public Init() : void
    {
        this.Collection = new TBX.ImageCollection(null, ["/Resources/Textures/Buildings/"+this._BID+"/"+this._BID+".png"]);
        this.Index = 0;
    }
    public BuildAble(Floor:Layout, Position:TBX.Vertex) : boolean
    {
        return Floor.ApplyAble(this._Foundations, Position);
    }
    public Build(Floor:Layout, Position:TBX.Vertex) : void
    {
        Floor.Apply(this._Structure, Position);
    }
}