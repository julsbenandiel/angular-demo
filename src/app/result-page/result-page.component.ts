import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PaginationMetadata, Product } from 'src/types/product';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.less'],
})
export class ResultPageComponent implements OnInit {
  loading: boolean = false;
  categories: string[] = []
  brands: string[] = []
  products: Array<Product> = [];
  
  metadata: PaginationMetadata = {
    page: 0,
    total: 0,
    pageCount: 0,
  }

  reactiveForm = new FormGroup({
    page: new FormControl<number>(0),
    category: new FormControl(''),
    brand: new FormControl(''),
    sort: new FormControl(''),
  });

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.reactiveForm.valueChanges.subscribe(() => {
      this.getProducts()
    })

    this.reactiveForm.get('brand')?.valueChanges.subscribe(() => this.reactiveForm.patchValue({ page: 1 }))
    this.reactiveForm.get('category')?.valueChanges.subscribe(() => this.reactiveForm.patchValue({ page: 1 }))

    this.reactiveForm.patchValue({
      page: 1,
      brand: "",
      category: "",
      sort: ""
    })

    this.getCategories()
    this.getBrands()
  }

  setPageIndex (index: number) {
    this.reactiveForm.patchValue({
      page: index
    })
  }

  async getProducts() {
    this.loading = true
    const params = {
      name: this.reactiveForm.get('name')?.value,
      page: this.reactiveForm.get('page')?.value,
      brand: this.reactiveForm.get("brand")?.value,
      category: this.reactiveForm.get("category")?.value,
      sort: this.reactiveForm.get("sort")?.value,
    }
    
    this.productService.fetchProducts(params)?.then((res) => {
      this.products = res.data.products
      this.metadata = res.data.metadata
      setTimeout(() => {
        this.loading = false
      }, 500)
    })
  }

  clearFilters() {
    this.reactiveForm.reset({
      page: 1,
      brand: "",
      category: "",
      sort: ""
    })
  }

  async getBrands() {
    this.productService.fetchBrands()?.then((res) => {
      this.brands = res.data.brands
    })
  }

  async getCategories() {
    this.productService.fetchCategories()?.then((res) => {
      this.categories = res.data.categories
    })
  }

}
