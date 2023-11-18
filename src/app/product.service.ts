import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios, { AxiosInstance } from 'axios'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = environment.apiUrl;
  private axios?: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: `${this.apiUrl}/api`,
      timeout: 1000000
    })
  }

  fetchProducts = (params: Record<string, any>) => {
    return this.axios?.get('/product', { params })
  }

  fetchCategories = () => {
    return this.axios?.get('/product/categories')
  }

  fetchBrands = () => {
    return this.axios?.get('/product/brands')
  }
}
