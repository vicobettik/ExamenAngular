import { Product } from "./product";

export interface Cart{
    products:Product[];
    idUsuario:number;
}

export interface Order {
    id:       number;
    products: Product[];
    total: number;
}