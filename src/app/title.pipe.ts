import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nestedTitle',
})
export class NestedTitlePipe implements PipeTransform {
  transform(value) {
    return value.split('.').length > 1 ? value.split('.')[1] : value;
  }
}
