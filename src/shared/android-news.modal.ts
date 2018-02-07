

export class AndroidNews{
    title: string;
    created: number;
    num_comments: number;
    author: string;
    domain: string;
    thumbnail: string;
    thumbnail_height: number;
    selftext: string;
    name: string;
    
}
export class RedditApiClass{
    kind: string;
    data: AndroidNews;
}