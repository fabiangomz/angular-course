import { JsonPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { FormUtils } from '../../../utils/form-utils'

@Component({
    selector: 'app-dynamic-page',
    imports: [JsonPipe, ReactiveFormsModule],
    templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
    private fb = inject(FormBuilder)
    formUtils = FormUtils

    form: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        favoriteGames: this.fb.array(
            [
                ['Metal Gear Solid', Validators.required],
                ['The Legend of Zelda', Validators.required],
            ],
            Validators.minLength(3)
        ),
    })

    newFavorite = new FormControl('', Validators.required)
    //newFavorite = this.fb.control([]) is the same as the above line
    get favoriteGames() {
        return this.form.get('favoriteGames') as FormArray
    }

    onAddFavorite() {
        if (this.newFavorite.invalid) {
            return
        }

        const newGame = this.newFavorite.value
        this.favoriteGames.push(this.fb.control(newGame, Validators.required))
        this.newFavorite.reset()
    }

    onDeleteFavorite(index: number) {
        this.favoriteGames.removeAt(index)
    }
}
