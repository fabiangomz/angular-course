import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core'
import { ListComponent } from '../../components/list/list.component'
import { Region } from '../../interfaces/country.interface'
import { CountryService } from '../../services/country.service'
import { rxResource } from '@angular/core/rxjs-interop'
import { of } from 'rxjs'

@Component({
    selector: 'app-by-region-page',
    imports: [ListComponent],
    templateUrl: './by-region-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {
    public regions: Region[] = [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania',
        'Antarctic',
    ]

    countryService = inject(CountryService)
    query = signal<string>('Africa')

    countryResource = rxResource({
        request: () => ({ query: this.query() }),
        loader: ({ request }) => {
            if (!request.query) return of([])

            return this.countryService.searchByRegion(request.query)
        },
    })

    constructor() {
        // Log the country resource data directly
        console.log('Country Resource:', this.countryResource.value)
    }
}
