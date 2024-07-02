import { Perfume } from "./perfume.model";

export interface CartProduct extends Perfume {
    quantity: number;
    _v?: Date
}