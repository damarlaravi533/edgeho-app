import {Component} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'app-custom-row-froze',
    templateUrl: './custom-row-froze.component.html',
    styleUrls: ['./custom-row-froze.component.css']
})
export class CustomRowFrozeComponent implements ICellRendererAngularComp {
    public params: any;
    public style: any;

    agInit(params: any): void {
        this.params = params;
        this.style = this.params.style;
    }

    refresh(): boolean {
        return false;
    }
}
