export { ResourceSet }

import { Resource } from "./Resource";

class ResourceSet
{
    private _Hash:any;
    private _Resources:Resource[];
    public constructor(Old?:ResourceSet)
    {
        this._Hash = {};
        this._Resources = [];
        if(Old)
        {
            for(let i in Old._Resources)
            {
                let OldResource = Old._Resources[i].Copy();
                this._Hash[OldResource.Name] = OldResource;
                this._Resources.push(OldResource);
            }
        }
        else
        {
        }
    }
    public Copy() : ResourceSet
    {
        return new ResourceSet(this);
    }
    public Add(New:Resource) : void
    {
        this._Hash[New.Name] = New;
        this._Resources.push(New);
    }
    public Get(Name:string) : Resource
    {
        return this._Hash[Name];
    }
    public PayAble(Order:ResourceSet) : boolean
    {
        for(let i in Order._Resources)
        {
            let Current:Resource = this._Hash[Order._Resources[i].Name];
            if(!Current) return false;
            if(!Current.PayAble(Order._Resources[i])) return false;
        }
        return true;
    }
    public Pay(Order:ResourceSet) : void
    {
        for(let i in Order._Resources)
        {
            let Current:Resource = this._Hash[Order._Resources[i].Name];
            Current.Pay(Order._Resources[i]);
        }
    }
}