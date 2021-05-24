declare namespace news {
    export interface newImgs {
        alt: string;
        pixel: string;
        ref: string;
        src: string;
    }
    export interface newVideo {
        ref: string;
        url_m3u8: string;
        cover: string;
    }
    export interface newLink {
        ref: string;
        title: string;
        href: string;
    }
    export interface newContent {
        body: string;
        img: Array<newImgs>;
        link: Array<newLink>;
        video?: Array<newVideo>;
    }
    export interface map {
        [propsName: string]: any;
    }
}