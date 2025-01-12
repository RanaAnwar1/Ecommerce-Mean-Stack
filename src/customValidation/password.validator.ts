import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class passwordVaildators{
    static passwordValidation():ValidatorFn{
        return (control:AbstractControl):ValidationErrors|null => {
            const value = control.value
            //  if(!control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
            //     return {passwordInvalid: true};
            // }
            // return null;
            if(!value){
                return null
            }
            const hasNumber = /[0-9]/.test(value)
            const hasUpperCase = /[A-Z]/.test(value)
            const hasLowerCase = /[a-z]/.test(value)
            const hasSpecialChar = /[@$!%*?&_]/.test(value)
            const isValidLength = value.length >=8
            const isValid = hasLowerCase && hasSpecialChar && hasNumber && isValidLength
            &&isValidLength && hasUpperCase
            return isValid? null : {validation: true}
        }
    }
    static matchPassword() : ValidatorFn{
        return(control: AbstractControl):ValidationErrors|null =>{
            const password = control.parent?.get('password')!.value
            const retypePassword = control.value
            if(password === retypePassword){
                return null
            }
            return {passwordmismatch: true}
        }
    }
}