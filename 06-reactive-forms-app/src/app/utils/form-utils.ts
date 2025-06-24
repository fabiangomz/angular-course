import { Form, FormGroup } from '@angular/forms'

export class FormUtils {
    static isValidField(form: FormGroup, field: string): boolean {
        return !!form.controls[field].errors && form.controls[field].touched
    }

    static getFieldError(form: FormGroup, field: string): string | null {
        if (!form.controls[field]) return null
        const errors = form.controls[field].errors ?? {}

        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'El campo es requerido'
                case 'minlength':
                    return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`
                case 'min':
                    return `El valor mínimo es ${errors['min'].min}`
                default:
                    return null
            }
        }

        return null
    }

    static onSave(form: FormGroup): void {
        if (form.invalid) {
            form.markAllAsTouched()
            return
        }

        form.reset({
            name: '',
            price: 0,
            inStorage: 0,
        })
    }
}
