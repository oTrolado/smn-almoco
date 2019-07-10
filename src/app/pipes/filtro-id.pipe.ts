import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroId'
})
export class FiltroIdPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.filter(item => item.cardapio._id === args);
  }

}
