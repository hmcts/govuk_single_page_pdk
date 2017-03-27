import {Input, Component} from "@angular/core";
import {uuid} from "../../util/helpers";

@Component({
    selector: "pdk-tab",
    template: `
        <section class="tabs-content" [id]="id" [attr.aria-hidden]="!selected" role="tabpanel">
            <ng-content></ng-content>
        </section>`
})
export class TabComponent {
    @Input() heading: string;

    private _selected: boolean = false;
    @Input() set selected(value: boolean) {
        this._selected = value;
    }

    get selected() {
        return this._selected;
    }

    private _id: string = uuid();
    get id(): string {
        return this._id;
    }
}