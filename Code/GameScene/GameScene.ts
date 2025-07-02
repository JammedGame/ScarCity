export { GameScene };

import * as TBX from "toybox-engine";

import { Town } from "./../Data/Town";
import { Store } from "./Store";
import { ResourceSet } from "./../Data/Resource/ResourceSet";
import { ResourcePanel } from "./ResourcePanel";
import { StorePanel } from "./Store/StorePanel";
import { Building } from "../Data/Building/Building";

class GameScene extends TBX.Scene2D
{
    private _Town: Town;
    private _Store: Store;
    private _StorePanel: StorePanel;
    private _ResourcePanel: ResourcePanel;
    public Resources: ResourceSet;
    public constructor(Old?:GameScene)
    {
        super(Old);
        if(Old)
        {
            this._Town = Old._Town.Copy(this);
            this._Store = Old._Store.Copy(this);
            this._ResourcePanel = Old._ResourcePanel.Copy(this);
        }
        else
        {
            this._Town = new Town(null, this);
            this._Store = new Store(null, this);
            this.Resources = new ResourceSet();
            this.Resources.InitGlobal();
            this._StorePanel = new StorePanel(this.Resources);
            this.Attach(this._StorePanel);
            this._ResourcePanel = new ResourcePanel(this, this.Resources);
            this.Init();
        }
    }
    public Init(): void
    {
        this.Name = "Game";
        this.BackColor = TBX.Color.FromRGBA(0, 0, 0, 255);
    }
    public SetSelection(Selected: Building | null) : void
    {
        //if(Selected !== null && !this.Resources.PayAble(Selected.Price)) return;
        this._Town.SetPointer(Selected);
        this._StorePanel.SetSelected(Selected ? Selected.BID : null);
    }
    private KeyPress(G: any, Args: any): void
    {
    }
    private SceneUpdate() : void
    {
    }
    public UpdateRes() : void
    {
        this._ResourcePanel.Update();
    }
}
