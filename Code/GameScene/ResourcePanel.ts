export { ResourcePanel }

import * as TBX from "toybox-engine";

import { Resource } from "../Data/Resource/Resource";
import { ResourceSet } from "./../Data/Resource/ResourceSet";

class ResourcePanel extends TBX.UI.Panel {
    private scene: TBX.Scene;
    private resources: ResourceSet;
    private resourceIndicators: TBX.UI.Panel[];

    public constructor(resources: ResourceSet) {
        super();
        this.resources = resources;
        this.SetupStyle();
        this.InitValues();
    }

    public OnAttach(Args: any): void {
        this.scene = Args.Scene;
    }

    public Update(): void {
        super.Update();
        if (this.resourceIndicators) {
            this.resourceIndicators.forEach((indicator: TBX.UI.Panel) => {
                const label = indicator.Data['Label'];
                if (label) {
                    label.Text = this.resources.Get(indicator.Data['ResType']).Amount;
                    label.Update();
                }
            });
        }
    }

    private SetupStyle(): void {
        this.Size = new TBX.Vertex(250,0,1);
        this.Style.Layout.Dock = TBX.UI.DockType.TopRight;
        this.Position = new TBX.Vertex(25, 0, 0);
        this.Style.Background.Color = TBX.Color.FromRGBA(50,50,50,50);
        this.Style.Values.height = '100vh';
        this.Style.Values.flexDirection = 'column';
        this.Style.Values.justifyContent = 'flex-start';
        this.Style.Values.padding = '2vh';
        this.Style.Values.gap = '2vh';
        this.Style.Values.backdropFilter = 'blur(10px)';
    }

    private InitValues(): void {
        this.resourceIndicators = [];
        this.resources.Bundle.forEach((resource: Resource) => {
            const resourceIndicator = this.CreateResourceItem(resource);
            this.resourceIndicators.push(resourceIndicator);
            this.Attach(resourceIndicator);
        });
    }

    private CreateResourceItem(resource: Resource): TBX.UI.Panel {
        const resourcePanel = new TBX.UI.Panel();
        resourcePanel.Size = new TBX.Vertex(160, 60, 1);
        resourcePanel.Style.Background.Color = TBX.Color.FromRGBA(0,0,0,10);
        resourcePanel.Style.Values.display = 'flex';
        resourcePanel.Style.Values.gap = '0.2vh';
        resourcePanel.Style.Values.position = 'relative';
        resourcePanel.Style.Values.top = '0';
        resourcePanel.Style.Values.left = '0';
        resourcePanel.Style.Values.padding = '1vh 1vh 1vh 2vh';
        resourcePanel.Style.Values.borderRadius = '1vh';
        resourcePanel.Data['ResType'] = resource.Name;

        const resourceIcon = new TBX.UI.Panel();
        resourceIcon.Size = new TBX.Vertex(48, 48, 1);
        resourceIcon.Position = new TBX.Vertex(0, 0, 1);
        resourceIcon.Dock = TBX.UI.DockType.TopRight;
        resourceIcon.Style.Values.position = 'relative';
        this.addImageToPanel(resourceIcon, 'url("Resources/Textures/Resources/' + resource.Name + '.png")');
        resourcePanel.Attach(resourceIcon);

        const resourceInfo = new TBX.UI.Panel();
        resourceInfo.Size = new TBX.Vertex(80, 40, 1);
        resourceInfo.Style.Background.Color = TBX.Color.Empty;
        resourceInfo.Style.Values.display = 'flex';
        resourceInfo.Style.Values.flexDirection = 'column';
        resourceInfo.Style.Values.justifyContent = 'space-between';
        resourceInfo.Style.Values.gap = '0.5vh';
        resourceInfo.Style.Values.position = 'relative';

        const resourceLabel = new TBX.UI.Label();
        resourceLabel.Size = new TBX.Vertex(80, 24, 1);
        resourceLabel.Style.Text.Size = 24;
        resourceLabel.Text = resource.Name;
        resourceLabel.Style.Values.position = 'relative';
        resourceLabel.Style.Values.top = '0';
        resourceLabel.Style.Values.left = '0';

        const resourceValue = new TBX.UI.Label();
        resourceValue.BackColor = TBX.Color.FromRGBA(0,0,0,30);
        resourceValue.Size = new TBX.Vertex(50, 25, 1);
        resourceValue.Position = new TBX.Vertex(0, 0, 1);
        resourceValue.Style.Text.Size = 20;
        resourceValue.Style.Values.position = 'relative';
        resourceValue.Text = resource.Amount.toString();
        resourceValue.Style.Values.borderRadius = '10px';

        resourceInfo.Attach(resourceLabel);
        resourceInfo.Attach(resourceValue);

        resourcePanel.Data['Label'] = resourceValue;

        resourcePanel.Attach(resourceInfo);

        return resourcePanel;
    }

    private addImageToPanel(panel: TBX.UI.Panel, imageUrl: string): void {
        panel.Style.Background.Color = TBX.Color.Empty;
        panel.Style.Values.backgroundImage = imageUrl;
        panel.Style.Values.backgroundSize = 'contain';
        panel.Style.Values.backgroundRepeat = 'no-repeat';
        panel.Style.Values.backgroundPosition = 'center';
    }
}
