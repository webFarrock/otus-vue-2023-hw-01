import axios, { Axios } from 'axios'
import type { IProduct } from '@/types'

class FakeStoreApi {
  private readonly baseUrl = 'https://fakestoreapi.com'
  private request: Axios

  constructor() {
    this.request = axios.create({
      baseURL: this.baseUrl,
    })
  }

  async fetchProducts() {
    const { data } = await this.request.get<IProduct[]>('/products')
    return data || []
  }

  async fetchProduct(id: number) {
    const { data } = await this.request.get<IProduct>(`/products/${id}`)
    return data || null
  }
}

const instance = new FakeStoreApi()
export const fetchProducts = () => instance.fetchProducts()
export const fetchProduct = (id: number) => instance.fetchProduct(id)
