import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  pure: false
})
export class ImagePipe implements PipeTransform {
  private imageRegex = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;

  transform(url: string): string {
    if( url === '' ) {
      return 'assets/img/no-image.png';
    } else if( this.imageRegex.test(url) ) {
      return url;
    } else if( url.substring(0,9) === '../assets' ) {
      return url;
    } else {
      return 'assets/img/no-image.png';
    }
  }

}
