export { Resource }

class Resource
{
    private _Name:string;
    private _Amount:number;
    private _Income:number;
    public get Name():string { return this._Name; }
    public get Amount():number { return this._Amount; }
    public set Amount(value:number) { this._Amount = value; }
    public get Income():number { return this._Income; }
    public constructor(Old?:Resource, Name?:string, Income?:number, Amount?:number)
    {
        if(Old)
        {
            this._Name = Old._Name;
            this._Amount = Old._Amount;
            this._Income = Old._Income;
        }
        else
        {
            if(Name) this._Name = Name;
            else this._Name = "";
            if(Amount) this._Amount = Amount;
            else this._Amount = 0;
            if(Income) this._Income = Income;
            else this._Income = 1;
        }
    }
    public Copy() : Resource
    {
        return new Resource(this);
    }
    public PayAble(Order:Resource) : boolean
    {
        return this._Amount >= Order._Amount;
    }
    public Pay(Order:Resource) : void
    {
        this._Amount -= Order.Amount;
    }
}