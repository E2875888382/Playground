declare namespace config {
    export interface ITabItem {
        name: string;
        icon: string;
        path: string;
    }
    export interface ITitleBarsItemEvent {
        ():void;
    }
    export interface ITitleBarsItem {
        icon: string;
        event?: ITitleBarsItemEvent;
    }
    export interface IConfigState {
        tabs: Array<ITabItem>;
        titleBars: Array<ITitleBarsItem>;
        title: any;
        readMode: string;
        backgroundImg: string;
        browserBackgroundImg: string
    }
}