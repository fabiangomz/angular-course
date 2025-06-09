import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { SearchInputComponent } from '../../components/search-input/search-input.component'
import { ListComponent } from '../../components/list/list.component'
import { CountryService } from '../../services/country.service'

@Component({
    selector: 'app-by-capital-page',
    imports: [SearchInputComponent, ListComponent],
    templateUrl: './by-capital-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {
    countryService = inject(CountryService)
    onSearch(value: string): void {
        this.countryService.searchByCapital(value).subscribe((resp) => {
            console.log(resp)
        })
    }
}
