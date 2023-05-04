import {ref} from "vue";
import ProductsRaw from '@/data/products.json'
import type {IProduct} from "@/types";

export default () => {
    const products = ref<Map<number, IProduct>>(new Map());
    (ProductsRaw as IProduct[]).forEach(item => products.value.set(item.id, item))

    return {
        products
    }
}
