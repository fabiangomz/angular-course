import {
    ChangeDetectionStrategy,
    Component,
    inject,
    resource,
} from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { CountryService } from '../../services/country.service'
import { NotFoundComponent } from '../../components/not-found/not-found.component'
import { DecimalPipe } from '@angular/common'

@Component({
    selector: 'app-country-page',
    imports: [NotFoundComponent, DecimalPipe],
    templateUrl: './country-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
    countryCode = inject(ActivatedRoute).snapshot.params['code']
    countryService = inject(CountryService)

    countryResource = rxResource({
        request: () => ({ code: this.countryCode }),
        loader: ({ request }) => {
            return this.countryService.searchByAlphaCode(request.code)
        },
    })
}
