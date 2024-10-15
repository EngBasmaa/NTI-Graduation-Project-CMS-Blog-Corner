import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { ImageService } from '../services/image.service';
import { AuthorData, AuthService } from '../services/auth.service';

interface Author {
  _id: string;
  name: string;
  email: string;
  about: string; // Assuming this exists
  lastname?: string; // Optional description
  image: string; // The image filename or path
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {


  public imageUrls: Map<string, string> = new Map();
  imgUrl: string | undefined;
  authors: AuthorData[] = []; // Array to hold authors


  constructor(private dataS: DataService, private imageService: ImageService, private authService: AuthService) { }

  // ngOnInit(): void {
  //   this.dataS.getAllArticles().subscribe(
  //     (res) => {
  //       this.authors = res as Author[];  // Typecast the response

  //       // Iterate through the articles and fetch images
  //       this.authors.forEach((author: Author) => {
  //         if (author.image) {
  //           this.imgUrl = this.getImageUrl(author._id);
  //           console.log(this.getImageUrl(author._id));

  //           console.log(this.getImageUrl(author._id)
  //           );
  //           this.imageService.getImage(author.image).subscribe(blob => {
  //             const url = URL.createObjectURL(blob); // Create a local URL for the blob
  //             this.imageUrls.set(author._id, url);
  //           }, err => {
  //             console.error(`Failed to load image for Article ID: ${author._id}`, err);
  //           });
  //         }
  //       });
  //     },
  //     err => {
  //       console.error('Failed to load articles:', err);
  //     }
  //   );
  // }



  // // Getter method to access the image URL in the template
  // getImageUrl(authorId: string): string | undefined {
  //   console.log(authorId);
  //   return this.imageUrls.get(authorId);
  // }

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.authService.getAllAuthors().subscribe(
      (res: AuthorData[]) => {
        this.authors = res; // Store authors in the component property

      },
      error => {
        console.error('Error fetching authors:', error);
      }
    );
  }
}
