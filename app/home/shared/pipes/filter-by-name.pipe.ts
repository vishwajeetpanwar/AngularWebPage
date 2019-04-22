import { Pipe, PipeTransform } from '@angular/core';

import { Student } from '../student';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(value: Student[], searchText?: string): Student[] {
    return searchText === '' ? value : value.filter(
      record => record.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      );
  }

}
