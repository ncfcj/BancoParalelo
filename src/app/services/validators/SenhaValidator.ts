import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class SenhaValidator {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control!.get(source);
      const targetCtrl = control!.get(target);

      if(sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value){
        return { mismatch: true };
      }else{
        return {mismatch: false };
      }

    };
  }
}
