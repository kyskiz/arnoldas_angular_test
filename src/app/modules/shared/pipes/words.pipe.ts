import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'words' })

export class WordsPipe implements PipeTransform {

    constructor() {}

    transform(text: string, wordCount: number, suffix: string = '...') {
        let parts = text.split(' ');

        return `${parts.slice(0, 5).join(' ')}${suffix}`;
    }
}
