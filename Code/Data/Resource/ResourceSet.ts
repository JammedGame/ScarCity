export { ResourceSet }

import { Resource } from "./Resource";

class ResourceSet
{
    private _Hash:any;
    private _Resources:Resource[];
    public get Bundle():Resource[] { return this._Resources; }
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
    public InitGlobal() : void
    {
        this.Add(new Resource(null, "Wood", 0, 10));
        this.Add(new Resource(null, "Stone", 0, 10));
        this.Add(new Resource(null, "Sand", 0, 0));
        this.Add(new Resource(null, "Metal", 0, 0));
        this.Add(new Resource(null, "Concrete", 0, 0));
        this.Add(new Resource(null, "Glass", 0, 0));
        this.Add(new Resource(null, "Marble", 0, 0));
        this.Add(new Resource(null, "Gold", 0, 0));
        this.Add(new Resource(null, "Jewel", 0, 0));
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
    public Receive(Income:Resource) : void
    {
        this.Get(Income.Name).Amount += Income.Income;
    }
}