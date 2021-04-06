declare interface IParams {
    [index:string]: any;
}
declare interface IGetParams {
    url: string;
    params?: Params;
    apiName?: string;
}
declare interface IPostParams {
    url: string;
    data?: any;
    apiName?: string;
}

declare module 'request'