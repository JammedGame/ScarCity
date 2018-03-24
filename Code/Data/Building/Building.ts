export { Building }

import * as TBX from "engineer-js";

import { Layout } from "./../Layout/Layout";
import { ResourceSet } from "./../Resource/ResourceSet";

class Building extends TBX.Tile
{
    private _Price:ResourceSet;
    private _Structure:Layout;
    private _Foundations:Layout;
    public get Price():ResourceSet { return this._Price; }
    public constructor(Old?:Building, ID?:string)
    {
        super(Old);
        if(Old)
        {
            this._Price = Old._Price.Copy();
            this._Structure = Old._Structure.Copy();
            this._Foundations = Old._Foundations.Copy();
        }
        else
        {
            this._Price = new ResourceSet();
            this._Structure = new Layout(null, new TBX.Vertex(2,2));
            this._Foundations = new Layout(null, new TBX.Vertex(2,2));
            if(ID) this.Init(ID);
        }
    }
    public Copy() : Building
    {
        return new Building(this);
    }
    private Init(ID:string) : void
    {
        this.Collection = new TBX.ImageCollection(null, ["/Resources/Textures/Buildings/"+ID+".png"]);
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