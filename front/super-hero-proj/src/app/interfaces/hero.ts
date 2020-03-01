import { HeroImage } from './hero-image';
export class Superhero {
    // tslint:disable-next-line: variable-name
    _id?: number;
    superheroNickname: string;
    superheroRealname: string;
    superheroOriginDescription: string;
    superPowers: string;
    catchPhrase: string;
    // heroImage?: Array<HeroImage>;
    heroImage?: string;
}
