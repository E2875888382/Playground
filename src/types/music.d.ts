declare interface IMusicItem {
    name: string;
    id: number;
    ar: Array<any>;
    al: any;
    [propName: string]: any;
}
declare type IMusicList = Array<IMusicItem>