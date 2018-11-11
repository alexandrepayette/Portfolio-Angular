import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public isEmailInput = false;
  public contactForm: FormGroup;
  private emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  private commentRegEx = /^[^<>|`~%*[\]{}\^]+$/;

  ngOnInit() {
    this.contactForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.pattern(this.emailRegEx)]),
      'comment': new FormControl(null, [Validators.required, Validators.pattern(this.commentRegEx)]),
    });
  }

  eventEmailFocus() {
    this.isEmailInput = true;
  }

  eventEmailBlur() {
    this.isEmailInput = false;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.contactForm.value);
  }
}
