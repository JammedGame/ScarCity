export { GameScene };

import * as TBX from "toybox-engine";

import { Town } from "../Data/Town";
import { ResourceSet } from "../Data/Resource/ResourceSet";
import { ResourcePanel } from "./ResourcePanel";
import { StorePanel } from "./Store/StorePanel";
import { Building } from "../Data/Building/Building";
import { FloorPanel } from "./FloorPanel";

class GameScene extends TBX.Scene2D
{
    private town: Town;
    private storePanel: StorePanel;
    private floorPanel: FloorPanel;
    private restartButton: TBX.UI.Panel;
    private resourcePanel: ResourcePanel;
    public resources: ResourceSet;

    public constructor(Old?:GameScene) {
        super(Old);
        this.town = new Town(null, this);
        this.resources = new ResourceSet();
        this.resources.InitGlobal();
        this.storePanel = new StorePanel(this.resources);
        this.floorPanel = new FloorPanel(this.town);
        this.resourcePanel = new ResourcePanel(this.resources);
        this.restartButton = this.CreateRestartButton();
        this.Attach(this.storePanel);
        this.Attach(this.floorPanel);
        this.Attach(this.resourcePanel);
        this.Attach(this.restartButton);
        this.Events.KeyPress.push(this.KeyPress.bind(this));
        this.Init();
    }
    
    public Init(): void {
        this.Name = "Game";
        this.BackColor = TBX.Color.FromRGBA(0, 0, 0, 255);
    }

    public FinishBuild(): void {
        this.SetSelection(null);
        this.storePanel.Update();
        this.floorPanel.Update();
        this.resourcePanel.Update();
    }

    public Restart(): void {
        this.resources.InitGlobal();
        this.resourcePanel.Update();
        this.town.Restart();
        this.floorPanel.Update();
        this.SetSelection(null);
    }

    public SetSelection(Selected: Building | null) : void {
        if(Selected !== null && !this.resources.PayAble(Selected.Price)) return;
        this.town.SetPointer(Selected);
        this.storePanel.SetSelected(Selected ? Selected.BID : null);
    }

    private CreateRestartButton(): TBX.UI.Panel {
        const restartButton = new TBX.UI.Panel(null);
        restartButton.BackColor = TBX.Color.Empty;
        restartButton.Position = new TBX.Vertex(70, 220, 2);
        restartButton.Dock = TBX.UI.DockType.BottomRight;
        restartButton.Style.Border.Color = TBX.Color.White;
        restartButton.Style.Border.Width = 3;
        restartButton.Style.Border.Radius = 20;
        restartButton.Style.Padding.All = 5;
        restartButton.Style.Values.cursor = 'pointer';
        restartButton.Size = new TBX.Vertex(160, 50);
        restartButton.Events.Click.push(() => this.Restart());

        const restartIcon = new TBX.UI.Panel();
        restartIcon.Size = new TBX.Vertex(25, 25, 1);
        restartIcon.Position = new TBX.Vertex(20, 0, 1);
        restartIcon.Dock = TBX.UI.DockType.Left;
        this.AddImageToPanel(restartIcon, 'url("/Textures/Icons/Restart.png")');
        restartButton.Attach(restartIcon);

        const label = new TBX.UI.Label();
        label.BackColor = TBX.Color.Empty;
        label.Size = new TBX.Vertex(60, 20, 1);
        label.Position = new TBX.Vertex(60, 0, 1);
        label.Style.Text.Size = 28;
        label.Dock = TBX.UI.DockType.Left;
        label.Text = 'Restart';
        restartButton.Attach(label);

        return restartButton;
    }

    private KeyPress(G: any, Args: any): void {
        if (Args.KeyCode === 119) {
            this.town.UpClick();
            this.floorPanel.Update();
        } else if (Args.KeyCode === 115) {
            this.town.DownClick();
            this.floorPanel.Update();
        }
    }

    private AddImageToPanel(panel: TBX.UI.Panel, imageUrl: string): void {
        panel.Style.Background.Color = TBX.Color.Empty;
        panel.Style.Values.backgroundImage = imageUrl;
        panel.Style.Values.backgroundSize = 'contain';
        panel.Style.Values.backgroundRepeat = 'no-repeat';
        panel.Style.Values.backgroundPosition = 'center';
    }
}
