import { Component, computed, signal } from '@angular/core'

interface Character {
    id: number
    name: string
    power: number
}
@Component({
    selector: 'app-dragonball-page',
    imports: [],
    templateUrl: './dragonball-page.component.html',
})
export class DragonballPageComponent {
    name = signal('Gohan')
    power = signal(100)
    characters = signal<Character[]>([
        { id: 1, name: 'Goku', power: 9001 },
        { id: 2, name: 'Vegeta', power: 8001 },
        { id: 3, name: 'Piccolo', power: 7001 },
        { id: 4, name: 'Yamcha', power: 500 },
    ])

    addCharacter = () => {
        if (!this.name || !this.power() || this.power() <= 0) {
            return
        }

        const newCharacter: Character = {
            id: this.characters().length + 1,
            name: this.name(),
            power: this.power(),
        }
        this.characters.update((list) => [...list, newCharacter])
        this.resetFields()
    }

    powerClasses = computed(() => {
        return {
            'text-danger': true,
        }
    })

    resetFields() {
        this.name.set('')
        this.power.set(0)
    }
}
