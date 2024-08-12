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
    quantity:undefined| number,
    productId:undefined|string
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
export interface cartSummery{
    Price:number,
    Discount:number,
    Tax:number,
    Delevery:number,
    Total:number,
}
export interface checkoutDataType{
    email:string,
    address:string,
    contact:string,
    TotalPrice:number,
    userId:string,
    id:number|undefined
}