export { GameScene };

import * as TBX from "engineer-js";

import { Town } from "./../Data/Town";

class GameScene extends TBX.Scene2D
{
    private _Town:Town;
    public constructor(Old?:GameScene)
    {
        super(Old);
        if(Old)
        {
            this._Town = Old._Town.Copy(this);
        }
        else
        {
            this._Town = new Town(null, this);
            this.Init();
        }
    }
    public Init(): void
    {
        this.Name = "Game";
        this.BackColor = TBX.Color.FromRGBA(0, 0, 0, 255);
    }
    private KeyPress(G: any, Args: any): void
    {
    }
    private SceneUpdate() : void
    {
    }
}