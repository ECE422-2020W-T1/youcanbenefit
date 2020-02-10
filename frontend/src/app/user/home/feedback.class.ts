import { Feedback } from '../../shared/models'
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
    FormArray
} from '@angular/forms';

export class UserFeedback {
    data: Feedback;
    _form: FormGroup;

    constructor(opts, fb: FormBuilder){

        const obj = {
            feedback:  opts.feedback ? opts.feedback : ''
        };

        this.data = Object.assign({}, obj);

        this._initForm(fb);
    }

    private _initForm(fb: FormBuilder) {
        this._form = fb.group({
            feedback: new FormControl(this.data.feedback, Validators.required),
        })

    }

    commit() {
        this.data = {...this._form.value};
    }
}

