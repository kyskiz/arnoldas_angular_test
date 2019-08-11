import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reverse' })

export class ReversePipe implements PipeTransform {

    transform(value: any[], isReverse: boolean = true): any[] {
        return isReverse ? value.reverse() : value;
    }

}
