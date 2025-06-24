import { Component, signal } from '@angular/core'
import { ToggleCasePipe } from '../../pipes/toggle-case.pipe'
import { heros } from '../../data/heros.data'
import { CanFlyPipe } from '../../pipes/can-fly.pipe'
import { ColorPipe } from '../../pipes/color.pipe'
import { HeroTextColorPipe } from '../../pipes/hero-text-color.pipe'
import { TitleCasePipe } from '@angular/common'
import { HeroCreatorPipe } from '../../pipes/hero-creator.pipe'
import { HeroSortByPipe } from '../../pipes/hero-sort-by.pipe'
import { Hero } from '../../interfaces/hero.interface'
import { HeroFilterPipe } from '../../pipes/hero-filter.pipe'

@Component({
    selector: 'app-custom-page',
    imports: [
        ToggleCasePipe,
        CanFlyPipe,
        ColorPipe,
        HeroTextColorPipe,
        TitleCasePipe,
        HeroCreatorPipe,
        HeroSortByPipe,
        HeroFilterPipe,
    ],
    templateUrl: './custom-page.component.html',
})
export default class CustomPageComponent {
    name = signal('fabian gomez')
    toggle = signal(false)
    sortBy = signal<keyof Hero | null>(null)
    searchQuery = signal('')

    toggleCase = () => {
        this.toggle.set(this.toggle() ? false : true)
    }

    heros = signal(heros)
}
