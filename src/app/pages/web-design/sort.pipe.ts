import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class ArraySortPipe implements PipeTransform {
  transform(array: any[], property: string, reverse: boolean): any[] {
    function sortOn(prop) {
      return function(a, b){
        if (a[prop] < b[prop]) {
          return -1;
        } else if (a[prop] > b[prop]) {
          return 1;
        } else {
          return 0;
        }
      };
    }

    if (reverse === false) {
      return array.sort(sortOn(property));
    } else {
      return array.sort(sortOn(property)).reverse();
    }
  }
}
