export { ResourcePanel }

import * as TBX from "toybox-engine";

import { GameScene } from "./GameScene";
import { ResourceSet } from "./../Data/Resource/ResourceSet";
import { ResourceArt } from "./../Data/Resource/ResourceArt";

const HORIZONTAL_POSITION = 1770;

class ResourcePanel
{
    private _Scene:GameScene;
    private _Set:ResourceSet;
    private _Tags:TBX.Label[];
    private _Icons:TBX.Tile[];
    public get Set():ResourceSet { return this._Set; }
    public constructor(Old?:ResourcePanel, Scene?:GameScene)
    {
        this._Tags = [];
        this._Icons = [];
        if(Scene) this._Scene = Scene;
        if(Old)
        {
            this._Set = Old._Set.Copy();
            for(let i in Old._Tags) this._Tags.push(Old._Tags[i].Copy());
            for(let i in Old._Icons) this._Icons.push(Old._Icons[i].Copy());
        }
        else
        {
            this._Set = new ResourceSet();
            this._Set.InitGlobal();
            this.Init();
        }
    }
    public Copy(Scene:GameScene) : ResourcePanel
    {
        return new ResourcePanel(this, Scene);
    }
    private Init() : void
    {
        let Overlay:TBX.Tile = TBX.SceneObjectUtil.CreateTile("Overlay", null, new TBX.Vertex(HORIZONTAL_POSITION, 540), new TBX.Vertex(250,1920,1));
        Overlay.Paint = TBX.Color.FromRGBA(50,50,50,50);
        this._Scene.Attach(Overlay);
        for(let i=0; i < this._Set.Bundle.length; i++)
        {
            let Item = this._Set.Bundle[i];
            let NIcon = TBX.SceneObjectUtil.CreateTile("PriceIcon", null, new TBX.Vertex(), new TBX.Vertex(80,80,1));
            NIcon.Collection = ResourceArt.Single;
            NIcon.Index = ResourceArt.FindIndex(Item.Name);
            NIcon.Position = new TBX.Vertex(HORIZONTAL_POSITION + 30, 100 + i * 90, 1);
            let NTag = new TBX.Label(null, Item.Amount.toString());
            NTag.Size = new TBX.Vertex(200,40,1);
            NTag.Border.Width = 0;
            NTag.BackColor = TBX.Color.Empty;
            NTag.ForeColor = TBX.Color.White;
            NTag.TextSize = 35;
            NTag.Position = new TBX.Vertex(HORIZONTAL_POSITION - 50, 100 + i * 90, 1);
            this._Icons.push(NIcon);
            this._Tags.push(NTag);
            this._Scene.Attach(NIcon);
            this._Scene.Attach(NTag);
        }
    }
    public Update() : void
    {
        for(let i in this._Set.Bundle)
        {
            this._Tags[i].Text = this._Set.Bundle[i].Amount.toString();
        }
    }
}