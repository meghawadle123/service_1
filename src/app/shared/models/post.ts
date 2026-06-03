export interface Ipost{
    id: string;
    title: string;
    body: string;
    userId: string;
}

export interface IresPost{
    msg:string;
    data:Ipost;
}