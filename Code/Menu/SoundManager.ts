export { SoundManager }

import * as TBX from "engineer-js";

class SoundManager
{
    public static Single:SoundManager;
    private _Music:TBX.SoundObject;
    public constructor()
    {
        this._Music = new TBX.SoundObject("Resources/Sound/music.mp3");
        this._Music.Looped = true;
        this._Music.Play();
        SoundManager.Single = this;
    }
    public SetVolume(Volume:number) : void
    {
        this._Music.Volume = Volume / 100;
    }
}