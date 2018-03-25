export { Store }

import * as TBX from "engineer-js";

import { GameScene } from "./GameScene";
import { StoreItem } from "./StoreItem";
import { Building } from "./../Data/Building/Building";
import { BuildingsPool } from "./../Data/Building/BuildingsPool";

const INIT_OFFSET = 180;
const ITEM_OFFSET = 180;
const HORIZONTAL_POSITION = 150;

class Store
{
    private _Index:number;
    private _Scene:GameScene;
    private _Pool:BuildingsPool;
    private _Up:TBX.Tile;
    private _Down:TBX.Tile;
    private _Items:StoreItem[];
    public constructor(Old?:Store, Scene?:GameScene)
    {
        this._Items = [];
        if(Scene) this._Scene = Scene;
        if(Old)
        {
            this._Index = Old._Index;
            this._Pool = Old._Pool.Copy();
        }
        else
        {
            this._Index = 0;
            this._Pool = new BuildingsPool();
            this.Init();
        }
    }
    public Copy(Scene:GameScene) : Store
    {
        return new Store(this, Scene);
    }
    private Init()
    {   
        let Overlay:TBX.Tile = TBX.SceneObjectUtil.CreateTile("Overlay", null, new TBX.Vertex(HORIZONTAL_POSITION, 540), new TBX.Vertex(250,1920,1));
        Overlay.Paint = TBX.Color.FromRGBA(50,50,50,50);
        this._Scene.Attach(Overlay);
        this._Up = TBX.SceneObjectUtil.CreateTile("Up", ["/Resources/Textures/Icons/Up.png"], new TBX.Vertex(HORIZONTAL_POSITION, 60), new TBX.Vertex(60,85,1));
        this._Down = TBX.SceneObjectUtil.CreateTile("Down", ["/Resources/Textures/Icons/Down.png"], new TBX.Vertex(HORIZONTAL_POSITION, 1020), new TBX.Vertex(60,85,1));
        this._Up.Events.Click.push(this.UpClick.bind(this));
        this._Down.Events.Click.push(this.DownClick.bind(this));
        this._Scene.Attach(this._Up);
        this._Scene.Attach(this._Down);
        for(let i = 0; i < this._Pool.Pool.length; i ++)
        {
            let Item:StoreItem = new StoreItem(null, this._Pool.Pool[i]);
            this._Items.push(Item);
            this._Scene.Attach(Item);
        }
        this.Positionate();
    }
    private Positionate() : void
    {
        this._Up.Active = this._Index != 0;
        this._Down.Active = this._Index + 5 < this._Items.length;
        for(let i = 0; i < this._Items.length; i++)
        {
            let Item:StoreItem = this._Items[i];
            Item.Active = (i - this._Index) >= 0 && (i - this._Index) < 5;
            Item.Position = new TBX.Vertex(HORIZONTAL_POSITION, INIT_OFFSET + ITEM_OFFSET  * (i - this._Index));
            Item.OnSelect = this.OnSelect.bind(this);
        }
    }
    private OnSelect(Selected:Building) : void
    {
        this._Scene.SetSelection(Selected);
    }
    private UpClick() : void
    {
        if(this._Index > 0)
        {
            this._Index--;
            this.Positionate();
        }
    }
    private DownClick() : void
    {
        if(this._Index + 5 < this._Items.length)
        {
            this._Index++;
            this.Positionate();
        }
    }
}