export { Credits }

import * as TBX from "engineer-js";

import { Title } from "./Title";

class Credits
{
    private _Items:Title[];
    public constructor(Old?:Title)
    {
        this._Items = [];
        if(Old)
        {

        }
        else
        {
            this.Init();
        }
    }
    private Init() : void
    {
        let Text:Title = new Title(null, "Programming", new TBX.Vertex(960, 150));
        Text.TextSize = 45;
        Text.Size.Y = 80;
        this._Items.push(Text);
        Text = new Title(null, "Miloš Manojlović", new TBX.Vertex(960, 250));
        Text.TextSize = 40;
        Text.Size.Y = 80;
        this._Items.push(Text);
        Text = new Title(null, "Filip Radulović", new TBX.Vertex(960, 300));
        Text.TextSize = 40;
        Text.Size.Y = 80;
        this._Items.push(Text);
        Text = new Title(null, "Design", new TBX.Vertex(960, 400));
        Text.TextSize = 45;
        Text.Size.Y = 80;
        this._Items.push(Text);
        Text = new Title(null, "Filip Abramović", new TBX.Vertex(960, 500));
        Text.TextSize = 40;
        Text.Size.Y = 80;
        this._Items.push(Text);
        Text = new Title(null, "Suzana Miladinov", new TBX.Vertex(960, 550));
        Text.TextSize = 40;
        Text.Size.Y = 80;
        this._Items.push(Text);
        Text = new Title(null, "Žarko Goronja", new TBX.Vertex(960, 600));
        Text.TextSize = 40;
        Text.Size.Y = 80;
        this._Items.push(Text);
        for(let i in this._Items) this._Items[i].Active = false;
    }
    public Connect(Scene:TBX.Scene2D) : void
    {
        for(let i in this._Items) Scene.Attach(this._Items[i]);
    }
    public Toggle(Toggled:boolean) : void
    {
        for(let i in this._Items) this._Items[i].Active = Toggled;
    }
}