import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Post } from '../../../interfaces/post.interface';
import { LoremIpsum } from 'lorem-ipsum';
import * as moment from 'moment';
import { findById, getDateData, getIndexById, hasSubstring } from '../../../utils';
import { BehaviorSubject, Subject } from 'rxjs';

const BLOG_POSTS = 'blogPosts';

export enum PostSortType {
    DESC = 'desc',
    ASC = 'asc'
}

declare type sortDir = PostSortType.ASC | PostSortType.DESC;

export interface PostSort {
    year: sortDir,
    month: sortDir,
    day: sortDir
}

@Injectable()
export class PostsService {
    sort: BehaviorSubject<PostSort> = new BehaviorSubject({
        year: PostSortType.DESC,
        month: PostSortType.DESC,
        day: PostSortType.DESC
    });
    sortTimestamp: Subject<number> = new Subject();
    private posts: Post[];

    constructor(
        private LocalStorage: LocalStorageService,
    ) {
        this.init();
    }

    init() {
        this.posts = this.LocalStorage.getItem(BLOG_POSTS) || [];

        if (!this.posts.length) {
            this.generateRandomPosts();
        }

        this.sortPosts();

    }

    generateNextId = () => {
        return Math.max(...[0].concat(this.posts.map((post) => post.id))) + 1;
    };

    generateRandomPosts() {

        const getTitle = () => {
            const randomEl = (list: any[]) => {
                let i = Math.floor(Math.random() * list.length);
                return list[i];
            };

            const capitalize = (name: string) => name.replace(/^\w/, (c: string) => c.toUpperCase());

            const adjectives = ['adamant', 'adroit', 'amatory', 'animistic', 'antic', 'arcadian', 'baleful', 'bellicose', 'bilious', 'boorish', 'calamitous', 'caustic', 'cerulean', 'comely', 'concomitant', 'contumacious', 'corpulent', 'crapulous', 'defamatory', 'didactic', 'dilatory', 'dowdy', 'efficacious', 'effulgent', 'egregious', 'endemic', 'equanimous', 'execrable', 'fastidious', 'feckless', 'fecund', 'friable', 'fulsome', 'garrulous', 'guileless', 'gustatory', 'heuristic', 'histrionic', 'hubristic', 'incendiary', 'insidious', 'insolent', 'intransigent', 'inveterate', 'invidious', 'irksome', 'jejune', 'jocular', 'judicious', 'lachrymose', 'limpid', 'loquacious', 'luminous', 'mannered', 'mendacious', 'meretricious', 'minatory', 'mordant', 'munificent', 'nefarious', 'noxious', 'obtuse', 'parsimonious', 'pendulous', 'pernicious', 'pervasive', 'petulant', 'platitudinous', 'precipitate', 'propitious', 'puckish', 'querulous', 'quiescent', 'rebarbative', 'recalcitant', 'redolent', 'rhadamanthine', 'risible', 'ruminative', 'sagacious', 'salubrious', 'sartorial', 'sclerotic', 'serpentine', 'spasmodic', 'strident', 'taciturn', 'tenacious', 'tremulous', 'trenchant', 'turbulent', 'turgid', 'ubiquitous', 'uxorious', 'verdant', 'voluble', 'voracious', 'wheedling', 'withering', 'zealous'];
            const nouns = ['ninja', 'chair', 'pancake', 'statue', 'unicorn', 'rainbows', 'laser', 'senor', 'bunny', 'captain', 'nibblets', 'cupcake', 'carrot', 'gnomes', 'glitter', 'potato', 'salad', 'toejam', 'curtains', 'beets', 'toilet', 'exorcism', 'stick figures', 'mermaid eggs', 'sea barnacles', 'dragons', 'jellybeans', 'snakes', 'dolls', 'bushes', 'cookies', 'apples', 'ice cream', 'ukulele', 'kazoo', 'banjo', 'opera singer', 'circus', 'trampoline', 'carousel', 'carnival', 'locomotive', 'hot air balloon', 'praying mantis', 'animator', 'artisan', 'artist', 'colorist', 'inker', 'coppersmith', 'director', 'designer', 'flatter', 'stylist', 'leadman', 'limner', 'make-up artist', 'model', 'musician', 'penciller', 'producer', 'scenographer', 'set decorator', 'silversmith', 'teacher', 'auto mechanic', 'beader', 'bobbin boy', 'clerk of the chapel', 'filling station attendant', 'foreman', 'maintenance engineering', 'mechanic', 'miller', 'moldmaker', 'panel beater', 'patternmaker', 'plant operator', 'plumber', 'sawfiler', 'shop foreman', 'soaper', 'stationary engineer', 'wheelwright', 'woodworkers'];

            return `${capitalize(randomEl(adjectives))} ${capitalize(randomEl(nouns))}`;
        };

        const getParagraph = () => {
            const lorem = new LoremIpsum({
                sentencesPerParagraph: {
                    max: 8,
                    min: 4
                },
                wordsPerSentence: {
                    max: 16,
                    min: 4
                }
            });

            return lorem.generateParagraphs(Math.ceil(Math.random() * 4));
        };
        
        const getDate = () => moment(new Date(+(new Date()) - Math.floor(Math.random() * 10000000000 * 5))).format('YYYY-MM-DD HH:mm');

        for (let i = 0; i < 50; i++) {
            this.posts.push({
                id: this.generateNextId(),
                text: getParagraph(),
                title: getTitle(),
                date: getDate()
            });

        }

        this.savePosts();

    }

    createPost(post: Post) {
        const id = this.generateNextId();
        this.posts.push(Object.assign(post, { id }));

        this.savePosts();

        return Promise.resolve(id);
    }

    savePosts() {
        this.LocalStorage.setItem(BLOG_POSTS, this.posts);
    }

    getPosts() {
        return this.posts;
    }

    getPaginated(count: number, offset: number = 0, filter: string = '') {
        return this.posts
            .filter((post) => !filter || hasSubstring(post.date, filter))
            .slice(offset, offset + Math.min(...[(this.posts.length - offset), count ]));
    }

    savePost(post: Post) {
        let postData = findById(this.posts, post);

        Object.assign(post, postData);

        this.savePosts();

    }

    deletePost(post: Post) {
        let index = getIndexById(this.posts, post.id);

        this.posts.splice(index, 1);

        this.savePosts();

        return Promise.resolve();
    }

    handleSort(data) {
        this.sort.next(Object.assign(this.sort.getValue(), data));
        this.sortPosts();
    }

    sortPosts() {

        this.posts.sort((postA, postB) => {
            const sortData = this.sort.getValue();
            const dateA = getDateData(postA);
            const dateB = getDateData(postB);

            if (dateA.year > dateB.year) return sortData.year === PostSortType.ASC ? 1 : -1;
            if (dateA.year < dateB.year) return sortData.year === PostSortType.ASC ? -1 : 1;

            if (dateA.month > dateB.month) return sortData.month === PostSortType.ASC ? 1 : -1;
            if (dateA.month < dateB.month) return sortData.month === PostSortType.ASC ? -1 : 1;

            if (dateA.day > dateB.day) return sortData.day === PostSortType.ASC ? 1 : -1;
            if (dateA.day < dateB.day) return sortData.day === PostSortType.ASC ? -1 : 1;

            return 0;
        });

        this.sortTimestamp.next(new Date().getTime());

    }

}
