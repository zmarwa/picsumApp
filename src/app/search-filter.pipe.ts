import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from './photo';
@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: Photo[], search: string): Photo[] {
	//the image ID, author, and description.
    if(!value) return [];
    if(!search) return value;
    
      const regexp = new RegExp(search, 'i');
      const properties = Object.keys(value[0]);

        return [
        ...value.filter((item)=> {
            return ((item.id==search) || item.author.match(regexp) || item.description.match(regexp) );
        }),
        ];

  }

}
