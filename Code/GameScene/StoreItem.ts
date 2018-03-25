export { StoreItem }

import * as TBX from "engineer-js";

import { Building } from "./../Data/Building/Building";
import { Resource } from "./../Data/Resource/Resource";
import { ResourceArt } from "./../Data/Resource/ResourceArt";

const ICON_SIZE = 150;

class StoreItem extends TBX.Tile
{
    private _IncomeTag:TBX.Label;
    private _IncomeIcon:TBX.Tile;
    private _PriceTags:TBX.Label[];
    private _PriceIcons:TBX.Tile[];
    private _Building:Building;
    private _OnSelect:Function;
    public get OnSelect():Function { return this._OnSelect; }
    public set OnSelect(value:Function) { this._OnSelect = value; }
    public constructor(Old?:StoreItem, Building?:Building)
    {
        super(Old);
        this._PriceIcons = [];
        this._PriceTags = [];
        if(Old)
        {
            this._IncomeTag = Old._IncomeTag.Copy();
            this._IncomeIcon = Old._IncomeIcon.Copy();
            for(let i in Old._PriceIcons)
            {
                this._PriceTags.push(Old._PriceTags[i].Copy());
                this._PriceIcons.push(Old._PriceIcons[i].Copy());
            }
            this._Building = Old._Building.Copy();
            this._OnSelect = Old._OnSelect;
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
        this.Size = new TBX.Vertex(ICON_SIZE,ICON_SIZE,1);
        this.Collection = new TBX.ImageCollection(null, ["/Resources/Textures/Buildings/"+this._Building.BID+"/"+this._Building.BID+".png"]);
        this.Index = 0;
        this.Data["Pickable"] = true;
        this.Events.Click.push(this.OnClick.bind(this));
        this._IncomeIcon = TBX.SceneObjectUtil.CreateTile("IncomeIcon", null, new TBX.Vertex(), new TBX.Vertex(50,50,1));
        this._IncomeIcon.Collection = ResourceArt.Single;
        this._IncomeIcon.Index = ResourceArt.FindIndex(this._Building.Income.Name);
        this._IncomeTag = new TBX.Label(null, "+ "+this._Building.Income.Income);
        this._IncomeTag.Size = new TBX.Vertex(200,30,1);
        this._IncomeTag.Border.Width = 0;
        this._IncomeTag.BackColor = TBX.Color.Empty;
        this._IncomeTag.ForeColor = TBX.Color.White;
        this._IncomeTag.TextSize = 20;
        for(let i = 0; i < this._Building.Price.Bundle.length; i++)
        {
            let PItem:Resource = this._Building.Price.Bundle[i];
            let NIcon = TBX.SceneObjectUtil.CreateTile("PriceIcon", null, new TBX.Vertex(), new TBX.Vertex(50,50,1));
            NIcon.Collection = ResourceArt.Single;
            NIcon.Index = ResourceArt.FindIndex(PItem.Name);
            NIcon.Data["Offset"] = i * 50;
            NIcon.Active = false;
            let NTag = new TBX.Label(null, "- "+PItem.Amount);
            NTag.Size = new TBX.Vertex(200,30,1);
            NTag.Border.Width = 0;
            NTag.BackColor = TBX.Color.Empty;
            NTag.ForeColor = TBX.Color.White;
            NTag.TextSize = 20;
            NTag.Active = false;
            this._PriceIcons.push(NIcon);
            this._PriceTags.push(NTag);
        }
    }
    private OnClick() : void
    {
        if(this._OnSelect) this._OnSelect(this._Building);
    }
    public SetPosition(Position:TBX.Vertex) : void
    {
        this.Position = Position;
        this._IncomeIcon.Position = new TBX.Vertex(Position.X + 80, Position.Y + 80, 2);
        this._IncomeTag.Position = new TBX.Vertex(Position.X + 80, Position.Y + 50, 2);
        for(let i in this._PriceIcons)
        {
            this._PriceTags[i].Position = new TBX.Vertex(Position.X - 60, Position.Y - 60 + this._PriceIcons[i].Data["Offset"], 2);
            this._PriceIcons[i].Position = new TBX.Vertex(Position.X - 10, Position.Y - 60 + this._PriceIcons[i].Data["Offset"], 2);
        }
    }
    public SetActive(Active:boolean) : void
    {
        this.Active = Active;
        this._IncomeIcon.Active = Active;
        this._IncomeTag.Active = Active;
    }
    public OnAttach(Args:any) : void
    {
        Args.Scene.Attach(this._IncomeIcon);
        Args.Scene.Attach(this._IncomeTag);
        for(let i in this._PriceIcons)
        {
            Args.Scene.Attach(this._PriceTags[i]);
            Args.Scene.Attach(this._PriceIcons[i]);
        }
    }
    public OnRemove(Args:any) : void
    {
        Args.Scene.Remove(this._IncomeIcon);
        Args.Scene.Remove(this._IncomeTag);
        for(let i in this._PriceIcons)
        {
            Args.Scene.Remove(this._PriceTags[i]);
            Args.Scene.Remove(this._PriceIcons[i]);
        }
    }
    public Darken() : void
    {
        this.Paint = TBX.Color.FromString("#666666");
        this.Modified = true;
        for(let i in this._PriceIcons)
        {
            this._PriceTags[i].Active = true;
            this._PriceIcons[i].Active = true;
        }
    }
    public Restore() : void
    {
        this.Paint = TBX.Color.White;
        this.Modified = true;
        for(let i in this._PriceIcons)
        {
            this._PriceTags[i].Active = false;
            this._PriceIcons[i].Active = false;
        }
    }
}