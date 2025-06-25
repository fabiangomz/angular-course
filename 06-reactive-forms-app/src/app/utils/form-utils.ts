import {
    AbstractControl,
    Form,
    FormArray,
    FormGroup,
    ValidationErrors,
} from '@angular/forms'

async function sleep() {
    return new Promise((resolve) => setTimeout(resolve, 2000))
}
export class FormUtils {
    static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)'
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$'

    static isValidField(form: FormGroup, field: string): boolean {
        return !!form.controls[field].errors && form.controls[field].touched
    }

    static getTextError(errors: ValidationErrors) {
        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'El campo es requerido'
                case 'minlength':
                    return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`
                case 'min':
                    return `El valor mínimo es ${errors['min'].min}`
                default:
                    return 'Error de validación desconocido'
            }
        }
        return null
    }

    static getFieldError(form: FormGroup, field: string): string | null {
        if (!form.controls[field]) return null
        const errors = form.controls[field].errors ?? {}

        return FormUtils.getTextError(errors)
    }

    static isFieldOneEqualFieldTwo(field1: string, field2: string) {
        return (formGroup: AbstractControl) => {
            const field1Value = formGroup.get(field1)?.value
            const field2Value = formGroup.get(field2)?.value

            return field1Value === field2Value
                ? null
                : { passwordsNotEqual: true }
        }
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

    static isValidFieldInArray(formArray: FormArray, index: number) {
        return (
            formArray.controls[index].errors &&
            formArray.controls[index].touched
        )
    }

    static getFieldErrorInArray(
        formArray: FormArray,
        index: number
    ): string | null {
        if (formArray.controls.length === 0) return null

        const errors = formArray.controls[index].errors ?? {}

        return FormUtils.getTextError(errors)
    }

    static async checkingServerResponse(
        control: AbstractControl
    ): Promise<ValidationErrors | null> {
        await sleep()

        const formValue = control.value

        if (formValue === 'hola@mundo.com') {
            return { emailTaken: true }
        }

        return null
    }

    static notStrider(control: AbstractControl): ValidationErrors | null {
        const value = control.value

        if (value === 'strider') {
            return { notStrider: true }
        }

        return null
    }
}
