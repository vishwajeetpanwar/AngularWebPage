import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../student';

@Pipe({
  name: 'filterByStudentCategory'
})
export class FilterByStudentCategoryPipe implements PipeTransform {

  transform(value: Student[], searchText?: string): Student[] {
    return searchText === 'All' ? value : value.filter(
      record => record.studentCategoryType.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      );
  }

}
