export interface Istudent{
    fname: string;
    lname: string;
    email: string;
    contact: string;
    stdid: string;
    isActive: boolean;
}
export interface Iresstudent{
    msg:string;
    data:Istudent;    

}

export interface Ires<T>{
    msg:string;
    data:T
}






