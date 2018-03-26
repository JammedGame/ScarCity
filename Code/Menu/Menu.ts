export { Menu };

import * as TBX from "engineer-js";

import { Title } from "./Title";
import { Credits } from "./Credits";
import { MenuButton } from "./MenuButton";
import { Slider } from "./Slider";
import { SoundManager } from "./SoundManager";

const TOWN_SIZE = 1000;
const TOWN_CENTER = 650;

class Menu extends TBX.Scene2D
{
    private _Sky:TBX.Tile;
    private _Stars:TBX.Tile;
    private _Clouds:TBX.Tile;
    private _Title:TBX.Tile;
    private _Play:MenuButton;
    private _Settings:MenuButton;
    private _Credits:MenuButton;
    private _CreditsText:Credits;
    private _BackB:MenuButton;
    private _SSlider:Slider;
    public constructor()
    {
        super();
        this.Init();
    }
    public Init() : void
    {
        this.Name = "Menu";
        this.BackColor = TBX.Color.FromRGBA(0, 0, 0, 255);
        this.InitBackground();
        this._Title = TBX.SceneObjectUtil.CreateTile("Title", ["Resources/Textures/Icons/Title.png"], new TBX.Vertex(960, 260), new TBX.Vertex(600,600));
        this.Attach(this._Title);
        this._Play = new MenuButton(null, "Play", this.PlayClick.bind(this), new TBX.Vertex(960, 550));
        this.Attach(this._Play);
        this._Settings = new MenuButton(null, "Settings", this.SettingsClick.bind(this), new TBX.Vertex(960, 700));
        this.Attach(this._Settings);
        this._Credits = new MenuButton(null, "Credits", this.CreditsClick.bind(this), new TBX.Vertex(960, 850));
        this.Attach(this._Credits);
        this._BackB = new MenuButton(null, "Back", this.BackClick.bind(this), new TBX.Vertex(960, 900));
        this.Attach(this._BackB);
        this._BackB.Active = false;
        this._CreditsText = new Credits();
        this._CreditsText.Connect(this);
        this._CreditsText.Toggle(false);
        this._SSlider = new Slider();
        this._SSlider.Position = new TBX.Vertex(960, 400, 1);
        this._SSlider.Size = new TBX.Vertex(800, 50, 1);
        this._SSlider.Toggle(false);
        this._SSlider.Change.push(this.SliderChange.bind(this));
        this.Attach(this._SSlider);
        let S = new SoundManager();
    }
    private SliderChange(Volume:number) : void
    {
        SoundManager.Single.SetVolume(Math.floor(100 * Volume));
    }
    public PlayClick(G:any, Args:any) : void
    {
        TBX.Runner.Current.SwitchScene("Game", false);
    }
    public CreditsClick(G:any, Args:any) : void
    {
        this._Title.Active = false;
        this._Play.Active = false;
        this._Settings.Active = false;
        this._Credits.Active = false;
        this._CreditsText.Toggle(true);
        this._SSlider.Toggle(false);
        this._BackB.Active = true;
    }
    public SettingsClick(G:any, Args:any) : void
    {
        this._Title.Active = false;
        this._Play.Active = false;
        this._Settings.Active = false;
        this._Credits.Active = false;
        this._CreditsText.Toggle(false);
        this._SSlider.Toggle(true);
        this._BackB.Active = true;
    }
    public BackClick(G:any, Args:any) : void
    {
        this._Title.Active = true;
        this._Play.Active = true;
        this._Settings.Active = true;
        this._Credits.Active = true;
        this._CreditsText.Toggle(false);
        this._SSlider.Toggle(false);
        this._BackB.Active = false;
    }
    private InitBackground() : void
    {
        this._Sky = TBX.SceneObjectUtil.CreateTile("Sky", ["Resources/Textures/Town/Sky.png"], new TBX.Vertex(960, TOWN_CENTER + 824), new TBX.Vertex(1920,4320));
        this._Stars = TBX.SceneObjectUtil.CreateTile("Stars", ["Resources/Textures/Town/Stars.png"], new TBX.Vertex(960, TOWN_CENTER + 824), new TBX.Vertex(1920,4320));
        this._Clouds = TBX.SceneObjectUtil.CreateTile("Stars", ["Resources/Textures/Town/Clouds.png"], new TBX.Vertex(960, TOWN_CENTER + 824), new TBX.Vertex(1920,4320));
        this.Attach(this._Sky);
        this.Attach(this._Stars);
        this.Attach(this._Clouds);
    }
}