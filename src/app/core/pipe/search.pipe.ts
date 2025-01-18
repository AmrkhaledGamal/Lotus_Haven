import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interface/products';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: Products[], character: string): Products[] {
    return value.filter((item) =>
      item.brand.name.toLowerCase().includes(character.toLowerCase())
    );
  }
}
