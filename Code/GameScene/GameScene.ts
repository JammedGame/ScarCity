export { GameScene };

import * as TBX from "engineer-js";

class GameScene extends TBX.Scene2D
{
    public constructor()
    {
        super();
        this.Init();
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