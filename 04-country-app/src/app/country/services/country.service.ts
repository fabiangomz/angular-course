import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { RESTCountry } from '../interfaces/rest-countries.interface'
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs'
import { Country } from '../interfaces/country.interface'
import { CountryMapper } from '../mappers/country.mapper'

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    private http = inject(HttpClient)
    private queryCacheCapital = new Map<string, Country[]>()
    private queryCacheCountry = new Map<string, Country[]>()
    private queryCacheRegion = new Map<string, Country[]>()

    searchByCapital(query: string): Observable<Country[]> {
        query = query.toLowerCase()

        if (this.queryCacheCapital.has(query)) {
            return of(this.queryCacheCapital.get(query) ?? [])
        }
        return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
            map((restCountries) =>
                CountryMapper.mapCountryItemsToCountryArray(restCountries)
            ),
            tap((countries) => {
                this.queryCacheCapital.set(query, countries)
            }),
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

        if (this.queryCacheCountry.has(query)) {
            return of(this.queryCacheCountry.get(query) ?? [])
        }
        return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
            map((restCountries) =>
                CountryMapper.mapCountryItemsToCountryArray(restCountries)
            ),
            tap((countries) => {
                this.queryCacheCountry.set(query, countries)
            }),
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

    searchByRegion(region: string): Observable<Country[]> {
        region = region.toLowerCase()
        const url = `${API_URL}/region/${region}`

        if (this.queryCacheRegion.has(region)) {
            return of(this.queryCacheRegion.get(region) ?? [])
        }

        return this.http.get<RESTCountry[]>(url).pipe(
            map((resp) => CountryMapper.mapCountryItemsToCountryArray(resp)),
            tap((countries) => {
                this.queryCacheRegion.set(region, countries)
            }),
            catchError((error) => {
                return throwError(
                    () => new Error('No se pudieron obtener paises')
                )
            })
        )
    }
}
