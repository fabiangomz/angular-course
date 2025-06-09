import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    input,
    output,
    Output,
} from '@angular/core'

@Component({
    selector: 'country-search-input',
    imports: [],
    templateUrl: './search-input.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
    value = output<string>()
    placeholder = input<string>('Search...')
}
