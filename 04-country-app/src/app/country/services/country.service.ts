import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { RESTCountry } from '../interfaces/rest-countries.interface'
import { map, Observable, catchError, throwError, delay } from 'rxjs'
import { Country } from '../interfaces/country.interface'
import { CountryMapper } from '../mappers/country.mapper'

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    private http = inject(HttpClient)

    searchByCapital(query: string): Observable<Country[]> {
        query = query.toLowerCase()
        return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
            map((restCountries) =>
                CountryMapper.mapCountryItemsToCountryArray(restCountries)
            ),

            catchError((error) => {
                console.log('error fetching', error)

                return throwError(
                    () => new Error('No se pudieron obtener paises')
                )
            })
        )
    }

    searchByCountry(query: string): Observable<Country[]> {
        query = query.toLowerCase()
        return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
            map((restCountries) =>
                CountryMapper.mapCountryItemsToCountryArray(restCountries)
            ),
            catchError((error) => {
                console.log('error fetching', error)

                return throwError(
                    () => new Error('No se pudieron obtener paises')
                )
            })
        )
    }

    searchByAlphaCode(code: string) {
        code = code.toLowerCase()
        const url = `${API_URL}/alpha/${code}`
        console.log('url', url)
        return this.http.get<RESTCountry[]>(url).pipe(
            map((resp) => CountryMapper.mapCountryItemsToCountryArray(resp)),
            map((countries) => countries.at(0)),
            catchError((error) => {
                console.log('error fetching', error)

                return throwError(
                    () => new Error('No se pudieron obtener paises')
                )
            })
        )
    }
}
