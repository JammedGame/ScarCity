export { Layout }

import * as TBX from "engineer-js";

class Layout
{
    private _Size:TBX.Vertex;
    private _Fields:number[];
    public get Size():TBX.Vertex { return this._Size; }
    public constructor(Old?:Layout, Size?:TBX.Vertex)
    {
        if(Old)
        {
            this._Size = Old._Size.Copy();
        }
        else
        {
            if(Size) this._Size = Size;
            else this._Size = new TBX.Vertex(2,2);
            this.Init();
        }
    }
    public Copy() : Layout
    {
        return new Layout(this);
    }
    private Init() : void
    {
        this._Fields = [];
        for(let i = 0; i < this._Size.X; i++)
        {
            for(let j = 0; j < this._Size.Y; j++)
            {
                this._Fields.push(0);
            }
        }
    }
    public Invert() : void
    {
        for(let i in this._Fields) this._Fields[i] = (this._Fields[i] == 1) ? 0 : 1;
    }
    public Create(Size:TBX.Vertex, Fields:number[]) : void
    {
        this._Size = Size;
        this._Fields = Fields;
    }
    public ApplyAble(Build:Layout, Position:TBX.Vertex) : boolean
    {
        if(Position.X < 0 || Position.Y < 0) return false;
        if(Position.X + Build.Size.X > this._Size.X) return false;
        if(Position.Y + Build.Size.Y > this._Size.Y) return false;
        for(let i = 0; i < Build.Size.X; i++)
        {
            for(let j = 0; j < Build.Size.Y; j++)
            {
                if(Build._Fields[j * Build._Size.X + i] == 1)
                {
                    if(this._Fields[(j + Position.Y) * Build._Size.X + (i + Position.X)] != 1) return false;
                }
            }
        }
        return true;
    }
    public Apply(Build:Layout, Position:TBX.Vertex) : void
    {
        for(let i = 0; i < Build.Size.X; i++)
        {
            for(let j = 0; j < Build.Size.Y; j++)
            {
                if(Build._Fields[j * Build._Size.X + i] == 1)
                {
                    this._Fields[(j + Position.Y) * Build._Size.X + (i + Position.X)] = 0;
                }
            }
        }
    }
}