export const ROUTE_BASKET = 'basket'
export const ROUTE_HOME = 'home'
export const ROUTE_PRODUCT_ADD = 'product-add'
export const ROUTE_PRODUCT_DETAIL = 'product'
export const ROUTE_CHECKOUT = 'checkout'

export const routeHome = { name: ROUTE_HOME }
export const routeBasket = { name: ROUTE_BASKET }
export const routeProductAdd = { name: ROUTE_PRODUCT_ADD }
export const routeCheckout = { name: ROUTE_CHECKOUT }
export const productPath = (id: number) => ({ name: ROUTE_PRODUCT_DETAIL, params: { id } })
