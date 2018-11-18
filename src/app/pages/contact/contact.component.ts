import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public isEmailInput = false;
  public contactForm: FormGroup;
  public displayServerMessage = false;
  public isSumited = false;
  public serverMessage: string;
  private emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  private commentRegEx = /^[^<>|`~%*[\]{}\^]+$/;

  constructor(private contactService: ContactService) { }

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

  setServerMessage(message: string): void {
    this.serverMessage = message;
  }

  onSubmit() {
    this.isSumited = true;
    this.contactService.postRequest(this.contactForm.value).subscribe(
      data => {
        this.displayServerMessage = true;
        this.setServerMessage(String(data));
        this.isSumited = false;
        this.contactForm.reset();
      },
      err => {
        console.log('Sorry an error occured: ' + err);
        this.setServerMessage('Sorry an error occured: ' + (String(err)));
      }
    );
  }
}
