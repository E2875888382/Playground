declare interface IMusicItem {
    name: string;
    id: number;
    ar: Array<any>;
    al: any;
    [propName: string]: any;
}
declare type IMusicList = Array<IMusicItem>

declare interface IMusicState {
    playlist: IMusicList;
    history: IMusicList;
    currentMusicIndex: number;
    volume: number;
    allLyric: string;
    lyricLine: string;
    lyricIndex: number;
    fullSreen: boolean;
    pause: boolean;
}