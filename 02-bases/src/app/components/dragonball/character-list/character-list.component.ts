import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import type { Character } from '../../../interfaces/character.interface'

@Component({
    selector: 'dragonball-character-list',
    templateUrl: './character-list.component.html',
})
export class CharacterListComponent {
    listname = input.required<string>()
    characters = input.required<Character[]>()
}
