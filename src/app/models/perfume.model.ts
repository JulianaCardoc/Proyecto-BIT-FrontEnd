import { Category } from "./category.model";
import { Images } from "./images.model";

export interface Perfume {
    _id: string,
    name: string,
    price: number,
    description: string,
    essence: string,
    durability: string,
    concentration: number,
    brand: string,
    volume: number,
    onSale: boolean,
    onSaleDiscount: number,
    category: Category[],
    images: Images[],
    deletedAt: string | null,
}