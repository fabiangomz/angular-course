import { UpperCasePipe } from '@angular/common'
import { Component, computed, signal } from '@angular/core'

@Component({
    templateUrl: './hero-page.component.html',
    imports: [UpperCasePipe],
})
export class HeroPageComponent {
    name = signal('Ironman')
    age = signal(45)

    heroDescription = computed(() => {
        const description = `${this.name()} - ${this.age()}`
        return description
    })

    capitalisedName = computed(() => this.name().toUpperCase())

    /* getHeroDescription = (): string => {
        return `${this.name()} - ${this.age()}`
    } */

    changeHero = (): void => {
        this.name.set('Spiderman')
        this.age.set(25)
    }

    resetForm = (): void => {
        this.name.set('Ironman')
        this.age.set(45)
    }

    changeAge = (): void => {
        this.age.set(60)
    }

    showInCapital = (): void => {
        this.name.set(this.name().toUpperCase())
    }
}
