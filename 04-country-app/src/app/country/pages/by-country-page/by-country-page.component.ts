import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
    linkedSignal,
    resource,
    signal,
} from '@angular/core'
import { SearchInputComponent } from '../../components/search-input/search-input.component'
import { ListComponent } from '../../components/list/list.component'
import { CountryService } from '../../services/country.service'
import { firstValueFrom, of } from 'rxjs'
import { rxResource } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-by-country-page',
    imports: [SearchInputComponent, ListComponent],
    templateUrl: './by-country-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {
    countryService = inject(CountryService)
    initialValue = input<string>('')
    activatedRoute = inject(ActivatedRoute)

    router = inject(Router)
    queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') || ''

    query = linkedSignal(() => this.queryParam)

    countryResource = rxResource({
        request: () => ({ query: this.query() }),
        loader: ({ request }) => {
            if (!request.query) return of([]) // empty array observable

            this.router.navigate(['/country/by-country'], {
                queryParams: { query: request.query },
            })
            return this.countryService.searchByCountry(request.query)
        },
    })
}
