export { GameScene };

import * as TBX from "engineer-js";

import { Town } from "./../Data/Town";
import { Store } from "./Store";
import { ResourceSet } from "./../Data/Resource/ResourceSet";
import { ResourcePanel } from "./ResourcePanel";

class GameScene extends TBX.Scene2D
{
    private _Town:Town;
    private _Store:Store;
    private _Resource:ResourcePanel;
    public get Resources():ResourceSet { return this._Resource.Set; }
    public constructor(Old?:GameScene)
    {
        super(Old);
        if(Old)
        {
            this._Town = Old._Town.Copy(this);
            this._Store = Old._Store.Copy(this);
            this._Resource = Old._Resource.Copy(this);
        }
        else
        {
            this._Town = new Town(null, this);
            this._Store = new Store(null, this);
            this._Resource = new ResourcePanel(null, this);
            this.Init();
        }
    }
    public Init(): void
    {
        this.Name = "Game";
        this.BackColor = TBX.Color.FromRGBA(0, 0, 0, 255);
    }
    public SetSelection(Selected:any) : void
    {
        if(!this._Resource.Set.PayAble(Selected.Price)) return;
        this._Town.SetPointer(Selected);
    }
    private KeyPress(G: any, Args: any): void
    {
    }
    private SceneUpdate() : void
    {
    }
    public UpdateRes() : void
    {
        this._Resource.Update();
    }
}