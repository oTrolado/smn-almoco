import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTroca'
})
export class FiltroTrocaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      let retorno = value.filter(item => item.pratoPrincipal === args);
      if (retorno.length < 1) return true;
      return false;

  }

}
