import { Component } from '@angular/core';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})

export class HeaderNavComponent {

  public isBlackThemeEnabled = false;
  private htmlRoot = document.querySelector(':root');

  toggleTheme() {
    this.isBlackThemeEnabled = !this.isBlackThemeEnabled;

    if (this.isBlackThemeEnabled) {
      this.htmlRoot.classList.add('dark-theme');
    } else {
      this.htmlRoot.classList.remove('dark-theme');
    }
  }
}
