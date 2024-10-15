import { Component, OnInit } from '@angular/core';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear!: number;
  constructor() { }

  ngOnInit(): void {
    this.updateCurrentYear();
  }

  facebookIcon = faFacebookF;
  twitterIcon = faTwitter;
  linkedinIcon = faLinkedinIn;
  instagramIcon = faInstagram;
  tiktokIcon = faTiktok;

  private updateCurrentYear(): void {
    this.currentYear = new Date().getFullYear();
  }
}