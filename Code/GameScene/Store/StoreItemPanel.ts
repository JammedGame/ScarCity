export { StorePanelItem }

import * as TBX from "toybox-engine";
import { Building } from "../../Data/Building/Building";
import { Resource } from "../../Data/Resource/Resource";
import { ResourceSet } from "../../Data/Resource/ResourceSet";

class StorePanelItem extends TBX.UI.Panel {
    public selected: boolean;
    private building: Building;
    private resources: ResourceSet;
    private costPanel: TBX.UI.Panel;
    public get BID(): string { return this.building.BID };

    public constructor(building: Building, resources: ResourceSet) {
        super();
        this.building = building;
        this.resources = resources;
        this.selected = false;
        this.SetupStyle();
        this.SetupChildren();
    }

    public Create(): void {
        super.Create();
        this.Element.classList.add('store-item');
        this.costPanel.Element.classList.add('cost-panel');
    }

    private SetupStyle(): void {
        this.Size = new TBX.Vertex(200, 180);
        this.Style.Background.Color = TBX.Color.FromRGBA(0,0,0,10);
    }

    private SetupChildren(): void {
        const costPanel = this.createCostPanel();
        this.costPanel = costPanel;
        this.Attach(costPanel);

        const icon = new TBX.UI.Panel();
        icon.Size = new TBX.Vertex(130, 130, 1);
        this.addImageToPanel(icon, 'url("Resources/Textures/Buildings/' + this.building.BID + '/' + this.building.BID + '.png")');
        icon.Style.Values.position = 'relative';
        this.Attach(icon);
    }

    public Update(): void {
        const activeClass = 'active';
        const affordableClass = 'affordable';
        if (this.Element) {
            if (this.resources) {
                if (this.resources.PayAble(this.building.Price)) {
                    if (!this.Element.classList.contains(affordableClass)) {
                        this.Element.classList.add(affordableClass);
                    }
                    this.Style.Values.opacity = '1';
                } else {
                    if (this.Element.classList.contains(affordableClass)) {
                        this.Element.classList.remove(affordableClass);
                    }
                    this.Style.Values.opacity = '0.5';
                }
            }
            if (this.selected) {
                if (!this.Element.classList.contains(activeClass)) {
                    this.Element.classList.add(activeClass);
                }
            } else {
                if (this.Element.classList.contains(activeClass)) {
                    this.Element.classList.remove(activeClass);
                }
            }
        }
        super.Update();
    }

    private createCostPanel(): TBX.UI.Panel {
        const costPanel = new TBX.UI.Panel();
        costPanel.Style.Background.Color = TBX.Color.FromRGBA(0,0,0,20);
        costPanel.Size = new TBX.Vertex(50, 180, 1);

        const incomeText = new TBX.UI.Label();
        incomeText.Size = new TBX.Vertex(50, 15, 1);
        incomeText.Style.Text.Size = 15;
        incomeText.Text = 'Income';
        incomeText.Style.Values.position = 'relative';
        incomeText.Style.Values.top = '0';
        incomeText.Style.Values.left = '0';
        incomeText.Style.Values.fontWeight = '600';
        costPanel.Attach(incomeText);

        const incomeIcon = this.createCostItemPanel(this.building.Income.Name, this.building.Income.Income, true);
        costPanel.Attach(incomeIcon);

        const costText = new TBX.UI.Label();
        costText.Size = new TBX.Vertex(50, 15, 1);
        costText.Style.Text.Size = 15;
        costText.Text = 'Cost';
        costText.Style.Values.position = 'relative';
        costText.Style.Values.top = '0';
        costText.Style.Values.left = '0';
        costText.Style.Values.fontWeight = '600';
        costPanel.Attach(costText);

        this.building.Price.Bundle.forEach((res: Resource) => {
            const costResourceIcon = this.createCostItemPanel(res.Name, res.Amount);
            costPanel.Attach(costResourceIcon);
        });

        return costPanel;
    }

    private createCostItemPanel(resourceName: string, amount: number, isIncome?: boolean): TBX.UI.Panel {
        const constItemPanel = new TBX.UI.Panel();
        constItemPanel.Style.Background.Color = TBX.Color.Empty;
        constItemPanel.Size = isIncome ? new TBX.Vertex(40, 40, 1) : new TBX.Vertex(36, 25, 1);
        constItemPanel.Style.Values.position = 'relative';

        const resource = new TBX.UI.Panel();
        resource.Size = isIncome ? new TBX.Vertex(36, 36, 1) : new TBX.Vertex(25, 25, 1);
        resource.Position = new TBX.Vertex(0, 0, 1);
        resource.Dock = TBX.UI.DockType.TopRight;
        this.addImageToPanel(resource, 'url("Resources/Textures/Resources/' + resourceName + '.png")');
        constItemPanel.Attach(resource);

        const resourceValue = new TBX.UI.Label();
        resourceValue.BackColor = isIncome ? TBX.Color.FromRGBA(88, 140, 99, 255) : TBX.Color.FromRGBA(203, 80, 80, 255);
        resourceValue.Size = isIncome ? new TBX.Vertex(20, 20, 1) : new TBX.Vertex(16, 16, 1);
        resourceValue.Position = new TBX.Vertex(0, 0, 1);
        resourceValue.Style.Text.Size = isIncome ? 20 : 16;
        resourceValue.Dock = TBX.UI.DockType.BottomLeft;
        resourceValue.Text = amount.toString();
        resourceValue.Style.Values.borderRadius = '50%';
        constItemPanel.Attach(resourceValue);

        return constItemPanel;
    }

    private addImageToPanel(panel: TBX.UI.Panel, imageUrl: string): void {
        panel.Style.Background.Color = TBX.Color.Empty;
        panel.Style.Values.backgroundImage = imageUrl;
        panel.Style.Values.backgroundSize = 'contain';
        panel.Style.Values.backgroundRepeat = 'no-repeat';
        panel.Style.Values.backgroundPosition = 'center';
    }
}
