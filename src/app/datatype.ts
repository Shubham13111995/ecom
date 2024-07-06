export interface SignUp{
    Name:string,
    Password:string,
    Email:string
}
export interface logIn{
    Password:string,
    Email:string
}
export interface productData{
    Name:string,
    Price:number,
    Category:string,
    Color:string,
    Description:string,
    Image:string,
    id:number,
    quantity:undefined| number
}
export interface cartDataType{
    Name:string,
    Price:number,
    Category:string,
    Color:string,
    Description:string,
    Image:string,
    id:number|undefined,
    quantity:undefined| number,
    userid:number|string,
    productId:number|string
}