import { Species } from "./Species";
import { Stat } from "./Stat";

export class PokemonWithStats {
    name: String
    height: number
    base_experience: number
    averageBaseExperience: number
    id: number
    sprite_img: string
    species: Species
    url: string
    stats: Array<Stat>
    constructor(name: String, height: number, base_experience: number, averageBaseExperience: number, id: number, sprite_img: string, species: Species, url: string, stats: Array<Stat>) { 
        this.name=name
        this.height=height
        this.base_experience=base_experience
        this.averageBaseExperience=averageBaseExperience
        this.id=id
        this.sprite_img=sprite_img
        this.species=species
        this.url=url
        this.stats=stats
    }
} 