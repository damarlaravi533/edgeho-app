import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomRowFrozeComponent} from "./custom-row-froze/custom-row-froze.component";
import {GridOptions} from "ag-grid-community";
import {MenuModule} from '@ag-grid-enterprise/menu';
import {AppEnum} from "./app.enum";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public columnDefs: any[] = [];
    public defaultColDef: any;
    public getRowStyle: any;
    public modules: any[] = [];
    public pinnedTopRowData: any;
    public pinnedBottomRowData: any;
    public frameworkComponents: any;
    public gridOptions: GridOptions = {};
    private gridApi: any;
    private gridColumnApi: any;
    private results: any[] = [];

    constructor(private http: HttpClient) {
    }

    private static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    ngOnInit(): void {
        this.modules = [
            MenuModule
        ]
        this.columnDefs = [
            {
                field: 'athlete',
                cellRendererSelector: (params: any) => {
                    if (params.node.rowPinned) {
                        return {
                            component: 'customPinnedRowRenderer',
                            params: {style: {color: 'blue'}},
                        };
                    } else {
                        return undefined;
                    }
                },
            },
            {
                field: 'age',
                cellRendererSelector: (params: any) => {
                    if (params.node.rowPinned) {
                        return {
                            component: 'customPinnedRowRenderer',
                            params: {style: {'font-style': 'italic'}},
                        };
                    } else {
                        return undefined;
                    }
                },
            },
            {field: 'country'},
            {field: 'year'},
            {field: 'date'},
            {field: 'sport'},
        ];
        this.defaultColDef = {
            width: 200,
            sortable: true,
            filter: true,
            resizable: true,
        };

        this.gridOptions = {
            suppressContextMenu: true,
            columnDefs: this.columnDefs,
            enableRangeSelection: true,
            getContextMenuItems: (params) => this.getContextMenuItems(params),
            allowContextMenuWithControlKey: true
        }

        // @ts-ignore
        this.getRowStyle = (params: any) => {
            if (params.node.rowPinned) {
                return {'font-weight': 'bold'};
            }
        };
        this.frameworkComponents = {
            customPinnedRowRenderer: CustomRowFrozeComponent,
        };
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        const url: string = 'https://www.ag-grid.com/example-assets/olympic-winners.json';
        this.http.get(url).subscribe((data: any) => {
            this.results = data;
            this.results.forEach((item: any) => {
                item.id = AppComponent.newGuid();
            })
            this.gridApi.setRowData(this.results);
        });
    }

    public getContextMenuItems(params: any = {}): any {
        return [
            {
                name: 'Froze Row',
                action: () => this.frozeAndUnfrozeRows(params.node.data, 'froze'),
                cssClasses: ['redFont', 'bold'],
            },
            {
                name: 'Unfroze Row',
                action: () => this.frozeAndUnfrozeRows(params.node.data, 'unfroze'),
            },
        ];
    }

    private frozeAndUnfrozeRows(data: any, action: string) {
        let rowNumber: number = this.results.findIndex(d => d.id === data.id);
        rowNumber = action === AppEnum.UNFROZE_ROW ? rowNumber : rowNumber + 1;
        const rows = this.results.slice(0, rowNumber);
        this.gridApi.setPinnedTopRowData(rows);
    }
}
