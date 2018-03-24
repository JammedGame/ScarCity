export { Menu };

import * as TBX from "engineer-js";

import { Title } from "./Title";
import { MenuButton } from "./MenuButton";

class Menu extends TBX.Scene2D
{
    public constructor()
    {
        super();
        this.Init();
    }
    public Init() : void
    {
        this.Name = "Menu";
        this.BackColor = TBX.Color.FromRGBA(0, 0, 0, 255);
        this.Attach(new Title(null, "ScarCity", new TBX.Vertex(960, 200)));
        this.Attach(new MenuButton(null, "Play", this.PlayClick.bind(this), new TBX.Vertex(960, 400)));
        this.Attach(new MenuButton(null, "Settings", this.PlayClick.bind(this), new TBX.Vertex(960, 550)));
        this.Attach(new MenuButton(null, "Credits", this.PlayClick.bind(this), new TBX.Vertex(960, 700)));
    }
    public PlayClick(G:any, Args:any) : void
    {
        TBX.Runner.Current.SwitchScene("Game", false);
    }
}