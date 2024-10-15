import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static passwordValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) return null;

            const hasNumber = /[0-9]/.test(value);
            const hasUpper = /[A-Z]/.test(value);
            const hasLower = /a-z]/.test(value);
            const hasSpecialChar = /[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]/.test(value);
            const isValidLength = value.length >= 5;

            const passwordValid = hasLower && hasUpper && hasNumber && hasSpecialChar && isValidLength

            return !passwordValid ? { passwordStrength: true } : null
        }
    }

    static matchPassword(form: AbstractControl): ValidationErrors | null {
        const password = form.get('password')?.value;
        const retypePass = form.get('retypePassword')?.value;

        if ((password !== retypePass)) {
            return { passwordMismatch: true }
        }
        return null

    }
}