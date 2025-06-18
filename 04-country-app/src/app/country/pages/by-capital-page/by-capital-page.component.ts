import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    inject,
    input,
    linkedSignal,
    resource,
    signal,
} from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { SearchInputComponent } from '../../components/search-input/search-input.component'
import { ListComponent } from '../../components/list/list.component'
import { CountryService } from '../../services/country.service'
import { of } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-by-capital-page',
    imports: [SearchInputComponent, ListComponent],
    templateUrl: './by-capital-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {
    countryService = inject(CountryService)
    initialValue = input<string>('') // Default value for the search input

    activatedRoute = inject(ActivatedRoute)

    router = inject(Router)
    queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') || ''

    query = linkedSignal(() => this.queryParam)

    countryResource = rxResource({
        request: () => ({ query: this.query() }),
        loader: ({ request }) => {
            console.log('Requesting countries by capital:', request.query)
            if (!request.query) return of([]) //empty array observable

            this.router.navigate(['/country/by-capital'], {
                queryParams: { query: request.query },
            })
            return this.countryService.searchByCapital(request.query)
        },
    })

    /*countryResource = resource({
        request: () => ({ query: this.query() }),
        loader: async ({ request }) => {
            if (!request.query) return []

            return await firstValueFrom(
                this.countryService.searchByCapital(request.query)
            )
        },
    })
*/
    /*
    isLoading = signal(false)
    isError = signal<string | null>(null)
    countries = signal<Country[]>([])

    onSearch(value: string): void {
        console.log('buscando')
        if (this.isLoading()) return
        this.isLoading.set(true)
        this.isError.set(null)
        this.countryService.searchByCapital(value).subscribe({
            next: (countries) => {
                this.isLoading.set(false)
                this.countries.set(countries)
            },
            error: (err) => {
                this.isLoading.set(false)
                this.countries.set([])
                this.isError.set(
                    `No se encontró un páis con esa capital: ${err}`
                )
            },
        })
    }
        */
}
