import { Pipe, PipeTransform } from '@angular/core';

interface KeysPipeResult {
    key: string,
    value: any
}

@Pipe({ name: 'keys' })

export class KeysPipe implements PipeTransform {

    transform(value: any): KeysPipeResult[] {
        let keys: KeysPipeResult[] = [];

        for (let key in value) {
            keys.push({ key, value: value[key]});
        }

        return keys;
    }

}
