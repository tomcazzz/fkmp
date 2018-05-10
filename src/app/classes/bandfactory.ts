import { BandRaw } from "./bandraw";
import { Band } from "./band";

export class BandFactory {
    static newBand(rawBand: BandRaw | any): Band {
        console.log("rawBand: " + rawBand +
                    "typeof(rawBand): " + typeof(rawBand) +
                    "rawBand.title: " + rawBand.title);
        return new Band(
            rawBand.title,
            rawBand.city
        );
    }
}
