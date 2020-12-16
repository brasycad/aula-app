import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myPipe'
})
export class MyPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    const val = `${Number(value) * 258} $`
    return val;
  }

}
