export { StorePanel }

import * as TBX from "toybox-engine";
import { BuildingsPool } from "../../Data/Building/BuildingsPool";
import { Building } from "../../Data/Building/Building";
import { StorePanelItem } from "./StoreItemPanel";
import { ResourceSet } from "../../Data/Resource/ResourceSet";
import { GameScene } from "../GameScene";

class StorePanel extends TBX.UI.Panel {
    private selectedBID: string;
    private _Scene: TBX.Scene;
    private _Pool: BuildingsPool;
    private _subPanel: TBX.UI.Panel;
    private _resources: ResourceSet;
    private _indicators: StorePanelItem[];

    public constructor(resources: ResourceSet) {
        super();
        this.selectedBID = '';
        this._Pool = new BuildingsPool();
        this._subPanel = new TBX.UI.Panel();
        this._resources = resources;
        this.Attach(this._subPanel);
        this.SetupStyle();
        this.InitBuildings();
    }

    public OnAttach(Args: any): void {
        this._Scene = Args.Scene;
    }

    private InitBuildings(): void {
        this._indicators = [];
        this._Pool.Pool.forEach((entry: Building) => {
            const buildingItem = new StorePanelItem(entry, this._resources);
            buildingItem.Events.Click.push(() => this.onSelect(entry))
            this._subPanel.Attach(buildingItem);
            this._indicators.push(buildingItem);
        })
    }

    private onSelect(building: Building): void {
        (this._Scene as GameScene).SetSelection(building);
    }

    public UpdateAll(): void {
        this._indicators.forEach((indicator: StorePanelItem) => indicator.Update());
    }

    public SetSelected(BID: string | null): void {
        if (BID === null) {
            this.SetIndicatorSelected(this.selectedBID, false);
            this.selectedBID = '';
        }
        else {
            if (this.selectedBID !== '') {
                this.SetIndicatorSelected(this.selectedBID, false);
            }
            this.selectedBID = BID;
            this.SetIndicatorSelected(this.selectedBID, true);
        }
        this.UpdateAll();
    }

    private SetIndicatorSelected(indicatorBID: string, selected: boolean): void {
        const indicator = this._indicators.find((entry: StorePanelItem) => entry.BID === indicatorBID);
        if (indicator) {
            indicator.selected = selected;
        }
    }

    private SetupStyle(): void {
        this.Size = new TBX.Vertex(250,0,1);
        this.Style.Layout.Dock = TBX.UI.DockType.TopLeft;
        this.Position = new TBX.Vertex(25, 0, 0);
        this.Style.Background.Color = TBX.Color.FromRGBA(50,50,50,50);
        this.Style.Values.overflowY = 'scroll';
        this.Style.Values.height = '100vh';
        this.Style.Values.flexDirection = 'column';
        this.Style.Values.justifyContent = 'flex-start';
        this._subPanel.Style.Values.width = '100%';
        this._subPanel.Style.Values.padding = '2vh 0';
        this._subPanel.Style.Values.display = 'flex';
        this._subPanel.Style.Values.flexDirection = 'column';
        this._subPanel.Style.Values.alignItems = 'center';
        this._subPanel.Style.Values.gap = '2vh';
        this._subPanel.Style.Values.position = 'relative';
        this._subPanel.Style.Values.height = 'auto';
        this._subPanel.Style.Background.Color = TBX.Color.Empty;
    }
}
