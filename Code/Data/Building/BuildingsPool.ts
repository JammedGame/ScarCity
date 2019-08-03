export { BuildingsPool }

import * as TBX from "toybox-engine";

import { Layout } from "./../Layout/Layout";
import { Building } from "./Building";
import { BuildingsList } from "./BuildingsList";
import { Resource } from "./../Resource/Resource";
import { ResourceArt } from "./../Resource/ResourceArt";

class BuildingsPool
{
    private _Pool:Building[];
    public get Pool():Building[] { return this._Pool; }
    public constructor(Old?:BuildingsPool)
    {
        this._Pool = [];
        if(Old)
        {
            for(let i in Old._Pool) this._Pool.push(Old._Pool[i].Copy());
        }
        else
        {
            this.Init();
        }
    }
    public Copy() : BuildingsPool
    {
        return new BuildingsPool(this);
    }
    private Init() : void
    {
        let RA = new ResourceArt();
        for(let i in BuildingsList)
        {
            let New = new Building(null, BuildingsList[i].Name);
            New.Unitar = BuildingsList[i].Unitar;
            New.Material.Sampling = TBX.TextureSamplingType.Linear;
            New.Structure.Create(new TBX.Vertex(BuildingsList[i].Structure.X, BuildingsList[i].Structure.Y), BuildingsList[i].Structure.Fields);
            for(let j in BuildingsList[i].Foundations)
            {
                let Fond = BuildingsList[i].Foundations[j];
                let ResFon = new Layout(null);
                ResFon.Create(new TBX.Vertex(Fond.X, Fond.Y), Fond.Fields);
                New.Foundations.push(ResFon);
            }
            New.Init();
            New.Income = new Resource(null, BuildingsList[i].Income.Name, BuildingsList[i].Income.Income);
            for(let j in BuildingsList[i].Price)
            {
                New.Price.Add(new Resource(null, BuildingsList[i].Price[j].Name, 0, BuildingsList[i].Price[j].Amount));
            }
            this._Pool.push(New);
        }
    }
}