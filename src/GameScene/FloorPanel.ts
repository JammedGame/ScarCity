export { FloorPanel }

import * as TBX from "toybox-engine";

import { Town } from "../Data/Town";
import { GameScene } from "./GameScene";

class FloorPanel extends TBX.UI.Panel {
    private town: Town;
    private scene: TBX.Scene;
    private up: TBX.UI.Panel;
    private down: TBX.UI.Panel;
    private floorLabel: TBX.UI.Label;

    public constructor(town: Town) {
        super();
        this.town = town;
        this.SetupStyle();
        this.InitElements();
    }

    public OnAttach(Args: any): void {
        this.scene = Args.Scene;
    }

    public Update(): void {
        super.Update();
        if (this.up && this.down && this.floorLabel) {
            this.up.Style.Values.opacity = this.town.currentFloor + 1 < this.town.numberOfFloors ? '1' : '0.5';
            this.down.Style.Values.opacity = this.town.currentFloor > 0 ? '1' : '0.5';
            this.floorLabel.Text = (this.town.currentFloor + 1).toString();
            this.up.Update();
            this.down.Update();
        }
    }

    private SetupStyle(): void {
        this.Size = new TBX.Vertex(250, 150, 1);
        this.Style.Layout.Dock = TBX.UI.DockType.BottomRight;
        this.Position = new TBX.Vertex(25, 25, 2);
        this.Style.Background.Color = TBX.Color.Empty;
        this.Style.Values.justifyContent = 'flex-start';
        this.Style.Values.flexDirection = 'column';
        this.Style.Values.padding = '1vh';
    }

    private InitElements(): void {
        const resourceInfo = new TBX.UI.Panel();
        resourceInfo.Size = new TBX.Vertex(160, 60, 1);
        resourceInfo.Style.Background.Color = TBX.Color.FromRGBA(0,0,0,10);
        resourceInfo.Style.Values.display = 'flex';
        resourceInfo.Style.Values.alignItems = 'center';
        resourceInfo.Style.Values.justifyContent = 'space-between';
        resourceInfo.Style.Values.gap = '0.5vh';
        resourceInfo.Style.Values.padding = '1vh';
        resourceInfo.Style.Values.position = 'relative';
        resourceInfo.Style.Values.borderRadius = '1vh';

        const resourceLabel = new TBX.UI.Label();
        resourceLabel.Size = new TBX.Vertex(60, 28, 1);
        resourceLabel.Style.Text.Size = 28;
        resourceLabel.Text = 'Floor: ';
        resourceLabel.Style.Values.position = 'relative';
        resourceLabel.Style.Values.top = '0';
        resourceLabel.Style.Values.left = '0';

        const resourceValue = new TBX.UI.Label();
        resourceValue.BackColor = TBX.Color.FromRGBA(0,0,0,30);
        resourceValue.Size = new TBX.Vertex(32, 32, 1);
        resourceValue.Position = new TBX.Vertex(0, 0, 1);
        resourceValue.Style.Text.Size = 30;
        resourceValue.Style.Values.position = 'relative';
        resourceValue.Text = (this.town.currentFloor + 1).toString();
        resourceValue.Style.Values.borderRadius = '50%';
        this.floorLabel = resourceValue;

        resourceInfo.Attach(resourceLabel);
        resourceInfo.Attach(resourceValue);

        this.Attach(resourceInfo);

        const up = new TBX.UI.Panel();
        up.Size = new TBX.Vertex(48, 48, 1);
        up.Position = new TBX.Vertex(-50, 35, 1);
        up.Dock = TBX.UI.DockType.Center;
        up.Style.Values.cursor = 'pointer';
        this.addImageToPanel(up, 'url("/Textures/Icons/Up.png")');
        up.Events.Click.push(() => {
            if (this.town.currentFloor + 1 < this.town.numberOfFloors) {
                this.town.UpClick();
                this.Update();
            }
        });
        this.up = up;
        this.Attach(up);

        const down = new TBX.UI.Panel();
        down.Size = new TBX.Vertex(48, 48, 1);
        down.Position = new TBX.Vertex(50, 35, 1);
        down.Dock = TBX.UI.DockType.Center;
        down.Style.Values.cursor = 'pointer';
        this.addImageToPanel(down, 'url("/Textures/Icons/Down.png")');
        down.Events.Click.push(() => {
            if (this.town.currentFloor > 0) {
                this.town.DownClick();
                this.Update();
            }
        });
        this.down = down;
        this.Attach(down);
    }

    private addImageToPanel(panel: TBX.UI.Panel, imageUrl: string): void {
        panel.Style.Background.Color = TBX.Color.Empty;
        panel.Style.Values.backgroundImage = imageUrl;
        panel.Style.Values.backgroundSize = 'contain';
        panel.Style.Values.backgroundRepeat = 'no-repeat';
        panel.Style.Values.backgroundPosition = 'center';
    }
}
