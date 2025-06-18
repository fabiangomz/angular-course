import {
    ChangeDetectionStrategy,
    Component,
    effect,
    EventEmitter,
    input,
    linkedSignal,
    output,
    Output,
    signal,
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

    initialValue = input<string>() // Default value for the search input

    inputValue = linkedSignal<string>(() => this.initialValue() ?? '')

    debounceEffect = effect((onCleanup) => {
        const value = this.inputValue() // every time inputValue changes, this effect runs
        if (value.length < 3) return

        const timeout = setTimeout(() => {
            this.value.emit(value)
        }, 500)

        onCleanup(() => {
            clearTimeout(timeout)
        })
    })
}
