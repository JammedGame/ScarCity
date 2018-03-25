export { BuildingsPool }

import * as TBX from "engineer-js";

import { Building } from "./Building";
import { BuildingsList } from "./BuildingsList";

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
        for(let i in BuildingsList)
        {
            let New = new Building(null, BuildingsList[i].Name);
            New.Size = new TBX.Vertex(BuildingsList[i].SizeX,BuildingsList[i].SizeY);
            New.Offset = new TBX.Vertex(BuildingsList[i].OffsetX, BuildingsList[i].OffsetY);
            New.Structure.Create(new TBX.Vertex(BuildingsList[i].Structure.X, BuildingsList[i].Structure.Y), BuildingsList[i].Structure.Fields);
            New.Foundations.Create(new TBX.Vertex(BuildingsList[i].Foundations.X, BuildingsList[i].Foundations.Y), BuildingsList[i].Foundations.Fields);
            New.Init();
            this._Pool.push(New);
        }
    }
}