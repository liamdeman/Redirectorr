export interface ClickdateJson{
    id: number;
    dateClicked: string;
}
export class Clickdate {
    constructor (
        private _id : number,
        private _dateClicked : Date,
        ) {}

    static fromJSON(json: ClickdateJson): Clickdate {
        const clickdate = new Clickdate(
            json.id,
            new Date(json.dateClicked)
            
        );
        return clickdate;
    }

    toJSON() : ClickdateJson {
        return {
            id: this.id,
            dateClicked: this.dateclicked.toDateString()            
            }
    }




    

    get dateclicked(): Date {
        return this._dateClicked
    }

    get id(): number{
        return this._id
    }

   
    
}