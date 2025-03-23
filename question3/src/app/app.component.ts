import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlOptions, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatTabsModule, CommonModule, MatError, MatFormField, MatCard, MatInput, MatIconModule, MatToolbarModule, MatCardModule],
})
export class AppComponent {
  title = 'reactive.form';
  form: FormGroup<any>;

  formData?: Data;



  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      numRue: ["", [Validators.required, this.numValidator]],
      codePostal: ["", [Validators.pattern("^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$")]],
      commentaire: ["", [this.commentValidator]],
    },
      { validators: this.nameInCommentValidator }
    );

    this.form.valueChanges.subscribe(() => {
      this.formData = this.form.value;
    });
  }

  numValidator(control: AbstractControl): ValidationErrors | null {
    const num = control.value;

    if (!num) {
      return null;
    }

    let formValid = (!isNaN(num) && num > 1000 && num < 9999 && Number.isInteger(Number(num)));

    return !formValid ? { numValidator: true } : null;
  }

  commentValidator(control: AbstractControl): ValidationErrors | null {
    const commentaire = control.value;

    if (!commentaire) {
      return null;
    }

    let formValid = (commentaire.split(" ").length >= 10);

    return !formValid ? { commentValidator: true } : null;
  }

  nameInCommentValidator(form: AbstractControl): ValidationErrors | null {
    const commentaire = form.get("commentaire")?.value;
    const name = form.get("name")?.value;

    if (!commentaire || !name) {
      return null;
    }

    let formValid = !commentaire.includes(name);

    return !formValid ? { nameInComment: true } : null;
  }
}

interface Data {
  name?: string | null;
  numRue?: string | null;
  codePostal?: string | null;
  commentaire?: string | null;
}



