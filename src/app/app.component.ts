import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CellClickedEvent, GridOptions, RangeSelectionChangedEvent} from "ag-grid-community";
import {RangeSelectionModule} from "@ag-grid-enterprise/all-modules";

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
    public gridOptions: GridOptions = {};
    private gridApi: any;
    private gridColumnApi: any;
    private results: any[] = [];
    private cellRanges: any;
    private cellValue: string = '';
    private column: any;

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
        this.columnDefs = [
            {field: 'athlete'},
            {field: 'age'},
            {field: 'country'},
            {field: 'year'},
            {field: 'date'},
            {field: 'sport'}
        ];
        this.defaultColDef = {
            width: 200,
            sortable: true,
            filter: true,
            resizable: true
        };
        this.modules = [
            RangeSelectionModule
        ]

        this.gridOptions = {
            suppressContextMenu: true,
            columnDefs: this.columnDefs,
            enableRangeSelection: true,
        }
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

    public cellClickHandler(ev: CellClickedEvent): void {
        this.cellValue = ev.value;
        this.column = ev.column;
    }

    public rangeSelectionChanged(e: RangeSelectionChangedEvent): void {
        this.cellRanges = this.gridApi.getCellRanges();
        if (!e.started && e.finished) {
            const api = this.gridApi;
            this.cellRanges.forEach((range: any) => {
                const startRow = Math.min(range.startRow.rowIndex, range.endRow.rowIndex);
                const endRow = Math.max(range.startRow.rowIndex, range.endRow.rowIndex);
                for (let rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
                    const rowModel = api.getModel();
                    const rowNode = rowModel.getRow(rowIndex);
                    rowNode.setDataValue(this.column, this.cellValue);
                }
            });
        }
    }
}
