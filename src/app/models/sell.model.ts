export interface Sell {
    total: number,
    observation?: String,
    date: Date,
    dueDate?: Date,
    status: number,
    user?: string,
    paymentMethod?: string,
    items?: Item[],
    _id?: string,
}

interface Item {
    quantity: number,
    discount: number,
    totalItem: number,
    sellId: string,
    perfumeId: string,
}