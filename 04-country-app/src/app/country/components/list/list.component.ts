import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { RESTCountry } from '../../interfaces/rest-countries.interface'

@Component({
    selector: 'country-list',
    imports: [],
    templateUrl: './list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
    countries = input<RESTCountry[]>()
}
