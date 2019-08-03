export { GameLogic };

import * as TBX from "toybox-engine";

import { Menu } from "./Menu/Menu";
import { GameScene } from "./GameScene/GameScene";

class GameLogic
{
    private _Game:TBX.Game;
    private _Runner:TBX.Runner;
    public constructor()
    {
        TBX.Settings.GlobalFontScale = 0.65;
        TBX.Settings.GlobalFontFamily = "IBM Plex Sans Condensed";
        this._Game = new TBX.Game();
        this._Game.Name = "ScarCity";
        this._Runner = new TBX.Runner(this._Game, TBX.DrawEngineType.ThreeJS);
        this._Runner.SetResolution(new TBX.Vertex(1920, 1080, 0), false);
        this._Game.Attach(new Menu());
        this._Game.Attach(new GameScene());
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
    }
}