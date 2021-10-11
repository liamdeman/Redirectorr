import { getLocaleDateTimeFormat } from "@angular/common";
import { Clickdate, ClickdateJson } from "./clickdate.model";


export interface LinkJson{
    linkExtension: string;
    destination: string;
    dateCreated: string;
    clickDates: ClickdateJson[];

}
export class Link {
    constructor (
        private _linkExtension: string,
        private _destination: string,
        private _dateCreated= new Date(),
        private _clickDates = new Array<Clickdate>()
    ) {}

    static fromJSON(json: LinkJson): Link {
        const link = new Link(
            json.linkExtension,
            json.destination,
            new Date(json.dateCreated),
            json.clickDates.map(Clickdate.fromJSON)
            
        );
        return link;
    }

    toJSON() : LinkJson {
        return {
            linkExtension: this.linkExtension,
            destination: this.destination,
            dateCreated:  "2021-08-10T20:29:29.321Z",
            clickDates: this.clickDates.map((x) => x.toJSON())
            }
    }
    



    get linkExtension(): string {
        return this._linkExtension
    }

    get destination(): string{
        return this._destination
    }

    get dateCreated(): Date {
        return this._dateCreated
    }

    get clickDates(): Clickdate[]{
        return this._clickDates
    }

    
}