export { Store }

import * as TBX from "engineer-js";

import { GameScene } from "./GameScene";
import { StoreItem } from "./StoreItem";
import { Building } from "./../Data/Building/Building";
import { BuildingsPool } from "./../Data/Building/BuildingsPool";

class Store
{
    private _Index:number;
    private _Scene:GameScene;
    private _Pool:BuildingsPool;
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
        for(let i = 0; i < this._Items.length; i++)
        {
            let Item:StoreItem = this._Items[i];
            Item.Active = (i - this._Index) >= 0 && (i - this._Index) < 5;
            Item.Position = new TBX.Vertex(150, 200 * (1 + i - this._Index));
            Item.OnSelect = this.OnSelect.bind(this);
        }
    }
    private OnSelect(Selected:Building) : void
    {
        this._Scene.SetSelection(Selected);
    }
}