import { HeroImage } from './hero-image';
export class Superhero {
    id?: number;
    superheroNickname: string;
    superheroRealname: string;
    superheroOriginDescription: string;
    superPowers: string;
    catchPhrase: string;
    // heroImage?: Array<HeroImage>;
    heroImage?: any;
}
