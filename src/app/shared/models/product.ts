export interface Iproduct{
    productId: string;
    productName: string;
    brand: string;
    price: number;
    imageUrl: string;
}

export interface IresProduct{
    msg:string;
    data:Iproduct;
}