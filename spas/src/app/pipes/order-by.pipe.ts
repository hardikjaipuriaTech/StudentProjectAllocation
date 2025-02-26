import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], field: string): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    array.sort((a: any, b: any) => {
      if (this.isDate(a[field]) && this.isDate(b[field])) {
        const dateA = new Date(a[field]);
        const dateB = new Date(b[field]);
        return dateA.getTime() - dateB.getTime();
      } else if (this.isEmail(a[field]) && this.isEmail(b[field])) {
        const domainA = this.extractUsername(a[field]);
        const domainB = this.extractUsername(b[field]);
        return domainA.localeCompare(domainB);
      } else if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        return a[field].localeCompare(b[field]);
      } else {
        return a[field] - b[field];
      }
    });

    return array;
  }

  private isDate(value: any): boolean {
    return value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)));
  }

  private isEmail(value: any): boolean {
    return typeof value === 'string' && value.includes('@');
  }

  private extractUsername(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.slice(0, atIndex + 1);
    }
    return email;
  }
}
