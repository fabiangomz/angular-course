import { JsonPipe } from '@angular/common'
import { Component, effect, inject, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { count, filter, switchMap, tap } from 'rxjs'
import { CountryService } from '../../services/country.service'
import { Country } from '../../interfaces/country.interface'

@Component({
    selector: 'app-country-page',
    imports: [ReactiveFormsModule, JsonPipe],
    templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
    private fb = inject(FormBuilder)

    countryService = inject(CountryService)

    regions = signal(this.countryService.regions)
    countriesByRegion = signal<Country[]>([])
    borders = signal<Country[]>([])

    form = this.fb.group({
        region: ['', Validators.required],
        country: ['', Validators.required],
        border: ['', Validators.required],
    })

    onFormChanged = effect((onCleanup) => {
        const regionSubscription = this.onRegionChanged()
        const countrySubscription = this.onCountryChanged()

        onCleanup(() => {
            regionSubscription?.unsubscribe()
            countrySubscription?.unsubscribe()
        })
    })

    onRegionChanged() {
        return this.form
            .get('region')!
            .valueChanges.pipe(
                tap(() => this.form.get('country')!.setValue('')),
                tap(() => this.form.get('border')!.setValue('')),
                tap(() => {
                    this.borders.set([])
                    this.countriesByRegion.set([])
                }),
                switchMap((region) =>
                    this.countryService.getCountriesByRegion(region ?? '')
                )
            )
            .subscribe((countries) => {
                this.countriesByRegion.set(countries)
            })
    }
}
