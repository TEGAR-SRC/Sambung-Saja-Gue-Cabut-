import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Select2Data } from "ng-select2-component";
import { UpdateBadgeValue } from "../action/sidebar.action";
import { GetProducts, CreateProduct, EditProduct,
         UpdateProduct, UpdateProductStatus, ApproveProductStatus, DeleteProduct,
         DeleteAllProduct, ReplicateProduct, ExportProduct, ImportProduct,
         Download} from "../action/product.action";
import { Product, ProductModel, Variation } from "../../interface/product.interface";
import { ProductService } from "../../services/product.service";
import { NotificationService } from "../../services/notification.service";

export class ProductStateModel {
  product = {
    data: [] as Product[],
    total: 0
  }
  selectedProduct: Product | null;
  topSellingProducts: Product[]
}

@State<ProductStateModel>({
  name: "product",
  defaults: {
    product: {
      data: [],
      total: 0
    },
    selectedProduct: null,
    topSellingProducts: []
  },
})
@Injectable()
export class ProductState {

  constructor(private store: Store,
    private notificationService: NotificationService,
    private productService: ProductService) {}

  @Selector()
  static product(state: ProductStateModel) {
    return state.product;
  }

  @Selector()
  static products(state: ProductStateModel) {
    return state.product.data.filter(data => data.id !== state.selectedProduct?.id).map((res: Product) => {
      return { label: res?.name, value: res?.id, data: {
        type: res.type,
        name: res.name,
        slug: res.slug,
        stock_status: res.stock_status,
        image: res.product_thumbnail ? res.product_thumbnail.original_url : 'assets/images/product.png'
      }}
    })
  }

  @Selector()
  static digitalProducts(state: ProductStateModel) {
    let products: Select2Data = [];
    state.product.data.filter(data => data.id !== state.selectedProduct?.id && data.product_type == 'digital').map((res: Product) => {
      products.push({ label: res?.name, value: res?.id, data: {
        name: res.name,
        product_id: res?.id,
        variation_id: null,
        image: res.product_thumbnail ? res.product_thumbnail.original_url : 'assets/images/product.png'
      }});
      if(res?.variations?.length) {
        res.variations.map((variation: Variation) => {
          products.push({ label: variation?.name, value: variation?.id!, data: {
            name: variation.name,
            product_id: res?.id,
            variation_id: variation?.id,
            image: variation.variation_image ? variation.variation_image.original_url : 'assets/images/product.png'
          }});
        });
      }
    });
    return products;
  }

  @Selector()
  static selectedProduct(state: ProductStateModel) {
    return state.selectedProduct;
  }

  @Selector()
  static topSellingProducts(state: ProductStateModel) {
    return state.topSellingProducts;
  }

  @Action(GetProducts)
  getProducts(ctx: StateContext<ProductStateModel>, action: GetProducts) {
    return this.productService.getProducts(action.payload).pipe(
      tap({
        next: (result: ProductModel) => {
          if(action?.payload!['top_selling']) {
            const state = ctx.getState();
            ctx.patchState({
              ...state,
              topSellingProducts: result.data
            });
          } else {
            ctx.patchState({
              product: {
                data: result.data,
                total: result?.total ? result?.total : result.data?.length
              }
            });
          }
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateProduct)
  create(ctx: StateContext<ProductStateModel>, action: CreateProduct) {
    return this.productService.createProduct(action.payload).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            product: {
              data: [...state.product.data, result],
              total: state?.product.total + 1
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Product Created Successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditProduct)
  edit(ctx: StateContext<ProductStateModel>, { id }: EditProduct) {
    return this.productService.editProduct(id).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedProduct: result
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateProduct)
  update(ctx: StateContext<ProductStateModel>, { payload, id }: UpdateProduct) {
    return this.productService.updateProduct(id, payload).pipe(
      tap({
        next: result => {
          if(typeof result === 'object') {
            const state = ctx.getState();
            const products = [...state.product.data];
            const index = products.findIndex(product => product.id === id);
            products[index] = result;

            ctx.patchState({
              ...state,
              product: {
                data: products,
                total: state.product.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Product Updated Successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateProductStatus)
  updateStatus(ctx: StateContext<ProductStateModel>, { id, status }: UpdateProductStatus) {
    return this.productService.updateProductStatus(id, status).pipe(
      tap({
        next: result => {
          if(typeof result === 'object') {
            const state = ctx.getState();
            const products = [...state.product.data];
            const index = products.findIndex(product => product.id === id);
            products[index] = result;

            ctx.patchState({
              ...state,
              product: {
                data: products,
                total: state.product.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Product Status Updated Successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ApproveProductStatus)
  approveStatus(ctx: StateContext<ProductStateModel>, { id, status }: ApproveProductStatus) {
    return this.productService.approveProductStatus(id, status).pipe(
      tap({
        next: result => {
          if(typeof result === 'object') {
            const state = ctx.getState();
            const products = [...state.product.data];
            const index = products.findIndex(product => product.id === id);
            products[index] = result;
            ctx.patchState({
              ...state,
              product: {
                data: products,
                total: state.product.total
              }
            });
            this.store.dispatch(new UpdateBadgeValue('/product', result?.total_in_approved_products));
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Product Status Updated Successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteProduct)
  delete(ctx: StateContext<ProductStateModel>, { id }: DeleteProduct) {
    return this.productService.deleteProduct(id).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetProducts({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Product Deleted Successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllProduct)
  deleteAll(ctx: StateContext<ProductStateModel>, { ids }: DeleteAllProduct) {
    return this.productService.deleteAllProduct(ids).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetProducts({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Product Deleted Successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ReplicateProduct)
  replicateProduct(ctx: StateContext<ProductStateModel>, { ids }: ReplicateProduct) {
    return this.productService.replicateProduct(ids).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetProducts({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Product Replicated Successfully');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ImportProduct)
  import(ctx: StateContext<ProductStateModel>, action: ImportProduct) {
    return this.productService.importProduct(action.payload).pipe(
      tap({
        next: result => {
          this.store.dispatch(new GetProducts({'page': 1, 'paginate': 15}));
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ExportProduct)
  export(ctx: StateContext<ProductStateModel>, action: ExportProduct) {
    return this.productService.exportProduct(action.payload).pipe(
      tap({
        next: result => {
          const blob = new Blob([result], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'products.csv';
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(Download)
  download(ctx: StateContext<ProductStateModel>, action: Download) {
    return this.productService.download(action.payload).pipe(
      tap({
        next: result => {
          if(result && result.download_link) {
            window.location.assign(result.download_link)
          }
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
