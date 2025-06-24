import { JsonPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { FormUtils } from '../../../utils/form-utils'

@Component({
    selector: 'app-basic-page',
    imports: [JsonPipe, ReactiveFormsModule],
    templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
    // form = new FormGroup({
    //     name: new FormControl(''),
    //     price: new FormControl(0),
    //     inStorage: new FormControl(0),
    // })

    private fb = inject(FormBuilder)
    formUtils = FormUtils

    form: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: [0, [Validators.required, Validators.min(0)]],
        inStorage: [0, [Validators.required, Validators.min(0)]],
    })

    // isValidField(field: string): boolean {
    //     return (
    //         (this.form.controls[field].errors &&
    //             this.form.controls[field].touched) ||
    //         false
    //     )
    // }

    // getFieldError(field: string): string | null {
    //     if (!this.form.controls[field]) return null
    //     const errors = this.form.controls[field].errors ?? {}

    //     for (const key of Object.keys(errors)) {
    //         switch (key) {
    //             case 'required':
    //                 return 'El campo es requerido'
    //             case 'minlength':
    //                 return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`
    //             case 'min':
    //                 return `El valor mínimo es ${errors['min'].min}`
    //             default:
    //                 return null
    //         }
    //     }

    //     return null
    // }

    // onSave(): void {
    //     if (this.form.invalid) {
    //         this.form.markAllAsTouched()
    //         return
    //     }

    //     this.form.reset({
    //         name: '',
    //         price: 0,
    //         inStorage: 0,
    //     })
    // }
}
