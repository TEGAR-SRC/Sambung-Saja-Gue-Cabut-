import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2, ViewChild } from '@angular/core';
import { Params, Router, RouterModule } from '@angular/router';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
  NgApexchartsModule }
  from 'ng-apexcharts';
import { Select2Data, Select2Module, Select2UpdateEvent } from 'ng-select2-component';
import { Observable } from 'rxjs';
import { AccountUser } from '../../shared/interface/account.interface';
import { BlogModel } from '../../shared/interface/blog.interface';
import { RevenueChart, StatisticsCount } from '../../shared/interface/dashboard.interface';
import { Notice } from '../../shared/interface/notice.interface';
import { Order, OrderModel } from '../../shared/interface/order.interface';
import { Product, ProductModel } from '../../shared/interface/product.interface';
import { ReviewModel } from '../../shared/interface/review.interface';
import { StoresModel } from '../../shared/interface/store.interface';
import { TableClickedAction, TableConfig } from '../../shared/interface/table.interface';
import { CurrencySymbolPipe } from '../../shared/pipe/currency-symbol.pipe';
import { GetBlogs } from '../../shared/store/action/blog.action';
import { GetCategories } from '../../shared/store/action/category.action';
import { GetRevenueChart, GetStatisticsCount } from '../../shared/store/action/dashboard.action';
import { MarkAsReadNotice, ResentNotice } from '../../shared/store/action/notice.action';
import { GetOrders } from '../../shared/store/action/order.action';
import { GetProducts } from '../../shared/store/action/product.action';
import { GetReviews } from '../../shared/store/action/review.action';
import { GetStores } from '../../shared/store/action/store.action';
import { AccountState } from '../../shared/store/state/account.state';
import { BlogState } from '../../shared/store/state/blog.state';
import { CategoryState } from '../../shared/store/state/category.state';
import { DashboardState } from '../../shared/store/state/dashboard.state';
import { NoticeState } from '../../shared/store/state/notice.state';
import { OrderState } from '../../shared/store/state/order.state';
import { ProductState } from '../../shared/store/state/product.state';
import { ReviewState } from '../../shared/store/state/review.state';
import { StoreState } from '../../shared/store/state/store.state';
import { PageWrapperComponent } from '../../shared/components/page-wrapper/page-wrapper.component';
import { TableComponent } from '../../shared/components/ui/table/table.component';
import { HasPermissionDirective } from '../../shared/directive/has-permission.directive';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
  markers: ApexMarkers;
  legend: ApexLegend;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule,
            Select2Module, CurrencySymbolPipe, PageWrapperComponent, NgApexchartsModule,
            TableComponent, NgbModule, HasPermissionDirective
  ],
  providers: [CurrencySymbolPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  @Select(DashboardState.statistics) statistics$: Observable<StatisticsCount>;
  @Select(DashboardState.revenueChart) revenueChart$: Observable<RevenueChart>;
  @Select(OrderState.order) order$: Observable<OrderModel>;
  @Select(ProductState.product) product$: Observable<ProductModel>;
  @Select(ProductState.topSellingProducts) topProduct$: Observable<Product[]>;
  @Select(ReviewState.review) review$: Observable<ReviewModel>;
  @Select(BlogState.blog) blog$: Observable<BlogModel>;
  @Select(CategoryState.categories) category$: Observable<Select2Data>;
  @Select(StoreState.store) store$: Observable<StoresModel>;
  @Select(AccountState.user) user$: Observable<AccountUser>;
  @Select(NoticeState.recentNotice) notice$: Observable<Notice>;

  @ViewChild("chart") chart: ChartComponent;

  public today = new Date();

  public chartOptions: Partial<ChartOptions>;
  public charts: any;

  public topProductLoader: boolean = false;
  public productStockLoader: boolean = false;
  public topSellerLoader: boolean = false;
  public notice: Notice;
  public filterType: string;
  public filter: Select2Data = [{
    value: 'today',
    label: 'Today',
  },
  {
    value: 'last_week',
    label: 'Last Week',
  },
  {
    value: 'last_month',
    label: 'Last Month',
  },
  {
    value: 'this_year',
    label: 'This Year',
  },
  {
    value: 'all_time',
    label: 'All Time',
  }];

  public sellerTableConfig: TableConfig = {
    columns: [
      { title: "store_name", dataField: "store_name" },
      { title: "orders", dataField: "orders_count" },
      { title: "earning", dataField: "order_amount" },
    ],
    data: [],
    total: 0
  };

  public orderTableConfig: TableConfig = {
    columns: [
      { title: "number", dataField: "order_id" },
      { title: "date", dataField: "created_at", type: "date", date_format: 'dd MMM yyyy' },
      { title: "name", dataField: "consumer_name" },
      { title: "amount", dataField: "total", type: 'price' },
      { title: "payment", dataField: "order_payment_status" }
    ],
    rowActions: [
      { label: "View", actionToPerform: "view", icon: "ri-eye-line", permission: "order.edit" }
    ],
    data: [],
    total: 0
  };

  public productStockTableConfig: TableConfig = {
    columns: [
      { title: "image", dataField: "product_thumbnail", class: 'tbl-image', type: 'image', placeholder: 'assets/images/product.png' },
      { title: "name",  dataField: "name" },
      { title: "quantity", dataField: "quantity" },
      { title: "stock", dataField: "stock" }
    ],
    rowActions: [
      { label: "Edit", actionToPerform: "edit", icon: "ri-pencil-line", permission: "product.edit"  },
    ],
    data: [] as Product[],
    total: 0
  };

  constructor(private renderer: Renderer2, config: NgbRatingConfig,
    @Inject(DOCUMENT) private document: Document,
    private store: Store, private router: Router, currencySymbolPipe: CurrencySymbolPipe) {
    if(this.store.selectSnapshot(state => state.account && state.account.roleName) !== 'admin'){
      this.store.dispatch(new ResentNotice('recent'));
    }
    this.notice$.subscribe(data => this.notice = data)
    config.max = 5;
    config.readonly = true;

    this.charts = {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61]
        },
      ],
      colors: ['#ec8951'],
      chart: {
        type: "bar",
        height: 410
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
    };

    // this.charts = {
    //   series: [44, 55, 13, 43, 22],
    //   chart: {
    //     width: 420,
    //     type: "donut"
    //   },
    //   colors: ['#86909C', '#568537', '#B3618A', '#495679', '#ec8951'],
    //   labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    //   stroke: {
    //     show: true,
    //     curve: 'straight',
    //     lineCap: 'butt',
    //     colors: undefined,
    //     width: 2,
    //     dashArray: 0, 
    // },
    //   responsive: [
    //     {
    //       breakpoint: 480,
    //       options: { 
    //         chart: {
    //           width: 200
    //         },
    //         legend: {
    //           position: "bottom"
    //         }
    //       }
    //     }
    //   ]
    // };
  
    this.chartOptions = {
      series: [
        {
          name: "Revenue",
          data: [],
          color: '#0da487',
        },
        {
          name: "Comission",
          data: [],
          color: '#FFA53B',
        },
      ],
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          top: 10,
          left: 0,
          blur: 3,
          color: '#720f1e',
          opacity: 0.1
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        strokeWidth: 4,
        strokeColors: "#ffffff",
        hover: {
          size: 9,
        }
      },
      stroke: {
        curve: 'smooth',
        lineCap: 'butt',
        width: 4,
      },
      grid: {
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: false,
          }
        }
      },
      legend: {
        show: false,
      },
      responsive: [{
          breakpoint: 1200,
          options: {
            grid: {
              padding: {
                right: -95,
              }
            },
          },
        },
        {
          breakpoint: 992,
          options: {
            grid: {
              padding: {
                right: -69,
              }
            },
          },
        },
        {
          breakpoint: 767,
          options: {
            chart: {
              height: 200,
            }
          },
        },
        {
          breakpoint: 576,
          options: {
            yaxis: {
              labels: {
                show: false,
              },
            },
          },
        }
      ],
      xaxis: {
        categories: [],
        range: undefined,
        axisBorder: {
          offsetX: 0,
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
    }

    // Revenue & Commision Chart
    this.revenueChart$.subscribe(revenue => {
      if(revenue) {
        this.chartOptions = {
          // series: [
          //   {
          //     name: "Revenue",
          //     data: revenue.revenues,
          //     color: '#0da487',
          //   },
          //   {
          //     name: "Comission",
          //     data: revenue.commissions,
          //     color: '#FFA53B',
          //   },
          // ],
          // chart: {
          //   height: 350,
          //   type: "line",
          //   dropShadow: {
          //     enabled: true,
          //     top: 10,
          //     left: 0,
          //     blur: 3,
          //     color: '#720f1e',
          //     opacity: 0.1
          //   },
          //   zoom: {
          //     enabled: false
          //   }
          // },
          // dataLabels: {
          //   enabled: false
          // },
          // markers: {
          //   strokeWidth: 4,
          //   strokeColors: "#ffffff",
          //   hover: {
          //     size: 9,
          //   }
          // },
          // stroke: {
          //   curve: 'smooth',
          //   lineCap: 'butt',
          //   width: 4,
          // },
          // grid: {
          //   xaxis: {
          //     lines: {
          //       show: true
          //     }
          //   },
          //   yaxis: {
          //     lines: {
          //       show: false,
          //     }
          //   }
          // },
          // legend: {
          //   show: false,
          // },
          // responsive: [{
          //     breakpoint: 1200,
          //     options: {
          //       grid: {
          //         padding: {
          //           right: -95,
          //         }
          //       },
          //     },
          //   },
          //   {
          //     breakpoint: 992,
          //     options: {
          //       grid: {
          //         padding: {
          //           right: -69,
          //         }
          //       },
          //     },
          //   },
          //   {
          //     breakpoint: 767,
          //     options: {
          //       chart: {
          //         height: 200,
          //       }
          //     },
          //   },
          //   {
          //     breakpoint: 576,
          //     options: {
          //       yaxis: {
          //         labels: {
          //           show: false,
          //         },
          //       },
          //     },
          //   }
          // ],
          // yaxis: {
          //   labels: {
          //     formatter: function (value: number) {
          //       return currencySymbolPipe.transform(value);
          //     }
          //   },
          // },
          // xaxis: {
          //   categories: revenue.months,
          //   range: undefined,
          //   axisBorder: {
          //     offsetX: 0,
          //     show: false,
          //   },
          //   axisTicks: {
          //     show: false,
          //   },
          // },
          series: [
            {
              name: "Revenues",
              data: revenue.revenues,
              color: '#ec8951',
            },
            {
              name: "Commission",
              data: revenue.commissions,
              color: '#86909C',
            },
          ],
          chart: {
            type: "line",
            height: 350
          },
          stroke: {
            curve: "stepline"
          },
          dataLabels: {
            enabled: false
          },
          title: {
            text: "Stepline Chart",
            align: "left"
          },
          markers: {
            hover: {
              sizeOffset: 4
            }
          }
        };
      }
    });

    // For Order
    this.order$.subscribe(order => {
      this.orderTableConfig.data = order ? order?.data : [];
      this.orderTableConfig.total = order ? order?.total : 0;
    });

    this.order$.subscribe(order => {
      let orders = order?.data?.filter((element: Order) => {
        element.order_id = `<span class="fw-bolder">#${element.order_number}</span>`;
        element.order_payment_status = element.payment_status ? `<div class="status-${element.payment_status.toLowerCase()}"><span>${element.payment_status.replace(/_/g, " ")}</span></div>` : '-';
        element.consumer_name = `<span class="text-capitalize">${element?.consumer?.name}</span>`;
        return element;
      });
      this.orderTableConfig.data = order ? orders : [];
      this.orderTableConfig.total = order ? order?.total : 0;
    });

    // For Product
    this.product$.subscribe(product => {
      let products = product?.data?.filter((element: Product) => {
        element.stock = element.stock_status ? `<div class="status-${element.stock_status}"><span>${element.stock_status.replace(/_/g, " ")}</span></div>` : '-';
        return element;
      });
      this.productStockTableConfig.data = product ? products : [];
      this.productStockTableConfig.total = product ? product?.total : 0;
    });

    // For Store
    this.store$.subscribe(store => {
      this.sellerTableConfig.data  = store ? store?.data : [];
      this.sellerTableConfig.total = store  ? store?.total : 0;
    });
  }

  ngOnInit() {
    this.store.dispatch(new GetStatisticsCount());
    this.store.dispatch(new GetRevenueChart());
    this.store.dispatch(new GetProducts({ status: 1, top_selling: 1, filter_by: 'this_year', paginate: 5}));
    this.store.dispatch(new GetReviews({ paginate: 5 }));
    this.store.dispatch(new GetBlogs({ status: 1, paginate: 2 }));
    this.store.dispatch(new GetCategories({ type: 'product', status: 1 }));
  }

  markAsRead(id: any){
    this.store.dispatch(new MarkAsReadNotice(id))
  }

  filterTopProduct(data: Select2UpdateEvent) {
    this.topProductLoader = true;
    this.renderer.addClass(this.document.body, 'loader-none');
    let params: Params = { status: 1, top_selling: 1, filter_by: 'this_year', paginate: 5 };
    if(data.value) {
      params['filter_by'] = data.value;
    }
    this.store.dispatch(new GetProducts(params)).subscribe({
      complete: () => { this.topProductLoader = false }
    });
  }

  // For Order

  onOrderTableChange(data?: Params) {
    if(data) {
      data['paginate'] = 7;
    }
    this.store.dispatch(new GetOrders(data!));
  }

  onOrderActionClicked(action: TableClickedAction) {
    if(action.actionToPerform == 'view')
      this.orderView(action.data)
  }

  orderView(data: Order) {
    this.router.navigateByUrl(`/order/details/${data.order_number}`);
  }

  // For Products

  onProductTableChange(data?: Params) {
    if(data) {
      data['paginate'] = 8;
      data['field'] = 'quantity';
      data['sort'] = 'asc';
    }
    this.store.dispatch(new GetProducts(data)).subscribe({
      complete: () => {
        this.productStockLoader = false;
      }
    });
  }

  filterProduct(data: Select2UpdateEvent) {
    this.renderer.addClass(this.document.body, 'loader-none');
    let params: Params = {
      paginate: 8,
      field: 'quantity',
      sort: 'asc'
    };
    if(data.value) {
      params['category_ids'] = data.value;
    }
    this.productStockLoader = true;
    this.onProductTableChange(params);
  }

  onProductActionClicked(action: TableClickedAction) {
    if(action.actionToPerform == 'edit')
      this.productEdit(action.data)
  }

  productEdit(data: Product) {
    this.router.navigateByUrl(`/product/edit/${data.id}`);
  }

  // For Seller

  onSellerTableChange(data?: Params) {
    if(data && !data['filter_by']) {
      data['paginate'] = 6;
      data['top_vendor'] = 1;
      data['filter_by'] = 'this_year';
    }
    this.store.dispatch(new GetStores(data)).subscribe({
      complete: () => {
        this.topSellerLoader = false;
      }
    });
  }

  filterSeller(data: Select2UpdateEvent) {
    this.renderer.addClass(this.document.body, 'loader-none');
    let params: Params = {
      paginate: 6,
      top_vendor: 1,
      filter_by: 'this_year'
    };
    if(data.value) {
      params['filter_by'] = data.value;
    }
    this.topSellerLoader = true;
    this.onSellerTableChange(params);
  }

  filterOrder(data: Select2UpdateEvent) {
    this.filter.map((item:any) => {
      if(item.value == data.value)
        this.filterType = item.label
    })
    this.renderer.addClass(this.document.body, 'loader-none');
    this.store.dispatch(new GetStatisticsCount({'filter_by': String(data.value)}))
  }

  redirectToProduct(id: number) {
    this.router.navigate(['/product/edit', id]);
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'loader-none');
  }


}
