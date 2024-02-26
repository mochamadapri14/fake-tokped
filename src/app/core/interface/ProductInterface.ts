export interface Rating {
    rate: number, count: number
}

export interface Product {
    id: number,
    title: string,
    category: string,
    description: string,
    image: string,
    price: number,
    rating: Rating,
    quantity: number;
    sale: boolean;
    total: number | 0;
}