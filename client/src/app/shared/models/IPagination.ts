import { IProduct } from './IProduct';

export interface IPagnation
{
    pageIndex:number,
    pageSize:number,
    count:number,
    data:IProduct[]
}