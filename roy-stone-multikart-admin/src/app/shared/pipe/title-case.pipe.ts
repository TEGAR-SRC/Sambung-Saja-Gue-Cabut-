import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'titleCase' })
export class TitleCasePipe implements PipeTransform {
    transform(value: string | undefined): string {
      if (!value) {
        return '';
      }

      const modifiedString = value?.replace(/[_-]/g, ' ');
      const words = modifiedString.split(' ');

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
      }

      return words.join(' ');
    }
}
