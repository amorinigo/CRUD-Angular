import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  pure: false
})
export class ImagePipe implements PipeTransform {
  private imgRegex: RegExp = /[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;

  transform( url: string ): string {
    return ( this.imgRegex.test(url?.trim()) ) ? url?.trim() : 'assets/img/no-image.png';
  }

}
