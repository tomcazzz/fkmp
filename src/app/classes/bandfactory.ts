import { BandRaw } from "./bandraw";
import { Band } from "./band";

export class BandFactory {
    static empty() {
        return new Band(0,"","");
    }
    static newBand(rawBand: BandRaw | any): Band {
        //console.log("BandFactory. rawBand.title: " + rawBand.title)
        return new Band(
            rawBand.id,
            rawBand.title,
            rawBand.city
        );
    }
}
