import { Country } from '../interfaces/country.interface'
import { RESTCountry } from '../interfaces/rest-countries.interface'

export class CountryMapper {
    static mapCountryItemToCountry(item: RESTCountry): Country {
        return {
            cca2: item.cca2,
            flag: item.flag,
            flagSvg: item.flags.svg,
            name: item.translations['spa'].official,
            capital: item.capital?.join(','),
            population: item.population,
        }
    }

    static mapCountryItemsToCountryArray(items: RESTCountry[]): Country[] {
        return items.map(this.mapCountryItemToCountry)

        //  return items.map((country) => this.mapCountryItemToCountry(country))
    }
}
