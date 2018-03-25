export { Floor }

import * as TBX from "engineer-js";

import { Layout } from "./Layout/Layout";
import { Building } from "./Building/Building";

class Floor
{
    private _Index:number;
    private _Layout:Layout;
    private _Buildings:Building[];
    public get Index():number { return this._Index; }
    public get Layout():Layout { return this._Layout; }
    public get Buildings():Building[] { return this._Buildings; }
    public constructor(Old?:Floor, Index?:number)
    {
        this._Buildings = [];
        if(Old)
        {
            this._Layout = Old._Layout.Copy();
            for(let i in this._Buildings) this._Buildings.push(Old._Buildings[i].Copy());
        }
        else
        {
            if(Index) this._Index = Index;
            this._Layout = new Layout(null, new TBX.Vertex(4,4));
        }
    }
    public Copy() : Floor
    {
        return new Floor(this);
    }
}