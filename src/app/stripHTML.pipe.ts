import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml',
})
export class StripHtmlPipe implements PipeTransform {
  transform(value: string, type: string): any {
    if (value) {
      switch (type) {
        case 'tag':
          // replace tags
          return value.replace(/<.*?>/g, '');
        case 'comment':
          // replace comment tags
          return value.replace(/<!--[^>]*-->/g, '');
        case 'advComment':
          // replace comment tags
          return value.replace(/<!--(.*?)-->/g, '');
        case 'strTagComment':
          // replace string format html comment
          return value.replace(/&lt;!--(.*?)--&gt;/g, '');
        default:
          throw new Error(`Invalid strip type specified: ${type}`);
      }
    }
  }
}
