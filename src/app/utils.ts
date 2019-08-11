import { Post } from './interfaces/post.interface';
import * as moment from 'moment';

export const findByProperty = (input: any, propertyName: any, propertyValue: any) => {
    let l = input.length;

    for (let i = 0; i < l; i++) {
        // tslint:disable-next-line
        if (input[i][propertyName] == propertyValue) return input[i];
    }
};

export const findById = (input: any, object: any) => {
    return findByProperty(input, 'id', object && object.id || object);
};

export const getIndexById = (input: any, id: any) => {
    return getIndexByProperty(input, 'id', id);
};

export const getIndexByProperty = (input: any, propertyName: any, propertyValue: any) => {
    let l = input.length;

    for (let i = 0; i < l; i++) {
        if (input[i][propertyName] === propertyValue) return i;

    }

};

export const getDateData  = (post: Post) => {
    const date = moment(post.date);

    return {
        year: date.year(),
        month: date.month(),
        day: date.date()
    };
};

export const twoDigit = (item: string|number) => ('00' + item).slice(-2);

export const hasSubstring = (a: string, b: string, isCaseSens: boolean = false) => {
    return (a && b) ? isCaseSens ? a.indexOf(b) > -1 : a.toLowerCase().indexOf(b.toLowerCase()) > -1 : false;
};
