export { StoreItem }

import * as TBX from "engineer-js";

import { Building } from "./../Data/Building/Building";

class StoreItem extends TBX.Tile
{
    private _Building:Building;
    private _OnSelect:Function;
    public get OnSelect():Function { return this._OnSelect; }
    public set OnSelect(value:Function) { this._OnSelect = value; }
    public constructor(Old?:StoreItem, Building?:Building)
    {
        super(Old);
        if(Old)
        {
            this._Building = Old._Building.Copy();
        }
        else
        {
            if(Building)
            {
                this._Building = Building;
                this.Init();
            }
        }
    }
    public Copy() : StoreItem
    {
        return new StoreItem(this);
    }
    private Init() : void
    {
        this.Size = this._Building.Size.Copy().Scalar(0.5);
        this.Collection = new TBX.ImageCollection(null, ["/Resources/Textures/Buildings/"+this._Building.BID+".png"]);
        this.Index = 0;
        this.Events.Click.push(this.OnClick.bind(this));
    }
    private OnClick() : void
    {
        if(this._OnSelect) this._OnSelect(this._Building);
    }
}