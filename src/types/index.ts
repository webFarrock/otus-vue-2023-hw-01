export interface IProductRating {
    rate: number
    count: number
}

export interface IProduct {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: IProductRating
}

export interface ISearchData {
    name: string
    priceFrom: number | null
    priceTo: number | null
}
