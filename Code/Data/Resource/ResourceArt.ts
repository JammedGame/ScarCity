export { ResourceArt }

import * as TBX from "engineer-js";

class ResourceArt extends TBX.ImageCollection
{
    public static Single:ResourceArt;
    public constructor(Old?:ResourceArt)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {
            this.Init();
        }
    }
    private Init() : void
    {
        this.Images.push("Resources/Textures/Resources/Wood.png");
        this.Images.push("Resources/Textures/Resources/Stone.png");
        this.Images.push("Resources/Textures/Resources/Sand.png");
        this.Images.push("Resources/Textures/Resources/Metal.png");
        this.Images.push("Resources/Textures/Resources/Concrete.png");
        this.Images.push("Resources/Textures/Resources/Glass.png");
        this.Images.push("Resources/Textures/Resources/Marble.png");
        this.Images.push("Resources/Textures/Resources/Gold.png");
        this.Images.push("Resources/Textures/Resources/Jewel.png");
        ResourceArt.Single = this;
    }
    public static FindIndex(ResourceID:string) : number
    {
        if(ResourceID == "Wood") return 0;
        if(ResourceID == "Stone") return 1;
        if(ResourceID == "Sand") return 2;
        if(ResourceID == "Metal") return 3;
        if(ResourceID == "Concrete") return 4;
        if(ResourceID == "Glass") return 5;
        if(ResourceID == "Marble") return 6;
        if(ResourceID == "Gold") return 7;
        if(ResourceID == "Jewel") return 8;
    }
}