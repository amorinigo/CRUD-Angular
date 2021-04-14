import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'offer' })
export class OfferPipe implements PipeTransform {

  transform( inOffer: boolean ): string {
    return ( inOffer ) ? 'Si' : 'No';
  }

}
