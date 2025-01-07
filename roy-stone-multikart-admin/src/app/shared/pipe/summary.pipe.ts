import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'summary',
  standalone: true
})
export class SummaryPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, maxLength: number): SafeHtml {
    if (!value) {
      return '';
    }

    let summarizedValue: string = value.substring(0, maxLength);

    if (value.length > maxLength) {
      summarizedValue += '...';
    }

    if (this.containsHtmlTags(value)) {
      const sanitizedValue = this.sanitizer.bypassSecurityTrustHtml(summarizedValue);
      return sanitizedValue as SafeHtml;
    } else {
      return summarizedValue;
    }

  }

  containsHtmlTags(value: string): boolean {
    const htmlRegex = /<[a-z][\s\S]*>/i;
    return htmlRegex.test(value);
  }

}
