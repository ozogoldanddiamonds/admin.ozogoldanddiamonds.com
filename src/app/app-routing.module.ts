import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './CategoryConteroller/category/category.component';
import { LoginComponent } from './login/login.component';
import { CreateCategoryComponent } from './CategoryConteroller/create-category/create-category.component';
import { UpdateCategoryComponent } from './CategoryConteroller/update-category/update-category.component';
import { SubCategoryListComponent } from './SubCategory/sub-category-list/sub-category-list.component';
import { CreateSubcategoryComponent } from './SubCategory/create-subcategory/create-subcategory.component';
import { UpdateSubcategoryComponent } from './SubCategory/update-subcategory/update-subcategory.component';
import { SubSubCategoryListComponent } from './SubSubCategory/sub-sub-category-list/sub-sub-category-list.component';
import { SubSubCategoryCreateComponent } from './SubSubCategory/sub-sub-category-create/sub-sub-category-create.component';
import { SubSubCategoryUpdateComponent } from './SubSubCategory/sub-sub-category-update/sub-sub-category-update.component';
import { ProductListComponent } from './ProductController/product-list/product-list.component';
import { ProductCreateComponent } from './ProductController/product-create/product-create.component';
import { ProductUpdateComponent } from './ProductController/product-update/product-update.component';
import { AddressComponent } from './address/address.component';
import { ListBannerComponent } from './Banners/list-banner/list-banner.component';
import { CreateBannerComponent } from './Banners/create-banner/create-banner.component';
import { UpdateBannerComponent } from './Banners/update-banner/update-banner.component';
import { UserListComponent } from './user-list/user-list.component';
import { GoldListComponent } from './Gold-Rate/gold-list/gold-list.component';
import { GoldCreateComponent } from './Gold-Rate/gold-create/gold-create.component';
import { GoldUpdateComponent } from './Gold-Rate/gold-update/gold-update.component';
import { CouponListComponent } from './coupon/coupon-list/coupon-list.component';
import { CouponCreateComponent } from './coupon/coupon-create/coupon-create.component';
import { CouponUpdateComponent } from './coupon/coupon-update/coupon-update.component';
import { ReviewComponent } from './review/review.component';
import { MetalCreateComponent } from './metal/metal-create/metal-create.component';
import { MetalListComponent } from './metal/metal-list/metal-list.component';
import { MetalUpdateComponent } from './metal/metal-update/metal-update.component';
import { StonesCreateComponent } from './stones/stones-create/stones-create.component';
import { StonesListComponent } from './stones/stones-list/stones-list.component';
import { StonesUpdateComponent } from './stones/stones-update/stones-update.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { ListOrderComponent } from './order/list-order/list-order.component';
import { AdsListComponent } from './AdsController/ads-list/ads-list.component';
import { AdsUpdateComponent } from './AdsController/ads-update/ads-update.component';
import { SubBranchSidebarComponent } from './sub-branch-sidebar/sub-branch-sidebar.component';
import { SubbranchDashboardComponent } from './subbranch-dashboard/subbranch-dashboard.component';
import { SubBranchComponent } from './SubBrabch/sub-branch/sub-branch.component';
import { SubBranchListComponent } from './SubBrabch/sub-branch-list/sub-branch-list.component';
import { SubBranchUpdateComponent } from './SubBrabch/sub-branch-update/sub-branch-update.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee/employee-update/employee-update.component';
import { ProfileComponent } from './profile/profile.component';
import { AssignedProductsComponent } from './AssignedProducts/assigned-products/assigned-products.component';
import { ListSchemaComponent } from './schema/list-schema/list-schema.component';
import { CreateScheemaComponent } from './schema/create-scheema/create-scheema.component';
import { UpdateScheemaComponent } from './schema/update-scheema/update-scheema.component';
import { UserSchemaComponent } from './user-scheema/user-schema/user-schema.component';
import { CreateUserscheemaComponent } from './user-scheema/create-userscheema/create-userscheema.component';
import { UpdateUserscheemaComponent } from './user-scheema/update-userscheema/update-userscheema.component';
import { ViewScheemaComponent } from './View-dialog-Controllers/view-scheema/view-scheema.component';
import { SchemaPaymentListComponent } from './scheme-payment/schema-payment-list/schema-payment-list.component';
import { SizeChatListComponent } from './size-chat/size-chat-list/size-chat-list.component';
import { SizeChatCreateComponent } from './size-chat/size-chat-create/size-chat-create.component';
import { SuppliersListComponent } from './suppliers/suppliers-list/suppliers-list.component';
import { CreateSuppliersComponent } from './suppliers/create-suppliers/create-suppliers.component';
import { UpdateSuppliersComponent } from './suppliers/update-suppliers/update-suppliers.component';
import { ViewSupplierDetailsComponent } from './suppliers/view-supplier-details/view-supplier-details.component';
import { SupplierPurchaseListComponent } from './suppliers-purchase/supplier-purchase-list/supplier-purchase-list.component';
import { AddSupplierPurchaseComponent } from './suppliers-purchase/add-supplier-purchase/add-supplier-purchase.component';
import { UpdateSupplierPurchaseComponent } from './suppliers-purchase/update-supplier-purchase/update-supplier-purchase.component';
import { SupplierPurchaseItemComponent } from './suppliers-purchase-item/supplier-purchase-item/supplier-purchase-item.component';
import { CreateSupplierPurchaseItemComponent } from './suppliers-purchase-item/create-supplier-purchase-item/create-supplier-purchase-item.component';
import { UpdateSupplierPurchaseItemComponent } from './suppliers-purchase-item/update-supplier-purchase-item/update-supplier-purchase-item.component';
import { MakersListComponent } from './makers/makers-list/makers-list.component';
import { CreateMakersComponent } from './makers/create-makers/create-makers.component';
import { UpadateMakersComponent } from './makers/upadate-makers/upadate-makers.component';
import { MakersProductionListComponent } from './makers/makers-production-list/makers-production-list.component';
import { CreateMakersProductionComponent } from './makers/create-makers-production/create-makers-production.component';
import { UpdateMakersProductionComponent } from './makers/update-makers-production/update-makers-production.component';
import { MakersProductionItemListComponent } from './makers/makers-production-item-list/makers-production-item-list.component';
import { CreateMakersProductionItemComponent } from './makers/create-makers-production-item/create-makers-production-item.component';
import { UpdateMakersProductionItemComponent } from './makers/update-makers-production-item/update-makers-production-item.component';
import { OrderViewDialogComponent } from './order-view-dialog/order-view-dialog.component';

const routes: Routes = [

  // First screen
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // Dashboard Layout
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },

      { path: 'Gold-list', component: GoldListComponent },
      { path: 'Gold-create', component: GoldCreateComponent },
      { path: 'Gold-update/:id', component: GoldUpdateComponent },

      { path: 'metal-list', component: MetalListComponent },
      { path: 'metal-create', component: MetalCreateComponent },
      { path: 'metal-update/:id', component: MetalUpdateComponent },

      { path: 'stones-list', component: StonesListComponent },
      { path: 'stones-create', component: StonesCreateComponent },
      { path: 'stones-update/:id', component: StonesUpdateComponent },
      { path: 'Coupon-lists', component: CouponListComponent },
      { path: 'Coupon-Crate', component: CouponCreateComponent },
      { path: 'update-coupon/:id', component: CouponUpdateComponent },
      { path: 'get-all-review', component: ReviewComponent },


      { path: 'category', component: CategoryComponent },
      { path: 'create-category', component: CreateCategoryComponent },
      { path: 'update-category/:id', component: UpdateCategoryComponent },
      { path: 'list_subcategory', component: SubCategoryListComponent },
      { path: 'create-subcategory', component: CreateSubcategoryComponent },
      { path: 'update-subcategory/:id', component: UpdateSubcategoryComponent },
      { path: 'subsubcategory', component: SubSubCategoryListComponent },
      { path: 'Create-subsubcategory', component: SubSubCategoryCreateComponent },
      { path: 'update-subsubcategory/:id', component: SubSubCategoryUpdateComponent },
      { path: 'product', component: ProductListComponent },
      { path: 'create-product', component: ProductCreateComponent },
      { path: 'edit-product/:id', component: ProductUpdateComponent },
      { path: 'address', component: AddressComponent },
      { path: "banners", component: ListBannerComponent },
      { path: "create-banner", component: CreateBannerComponent },
      { path: "update-banner/:id", component: UpdateBannerComponent },
      { path: "user", component: UserListComponent },
      { path: "order-list", component: ListOrderComponent },
      { path: "Order-create", component: CreateOrderComponent },
      { path: 'view-order/:id', component: OrderViewDialogComponent },
      { path: "Ads", component: AdsListComponent },
      { path: "update-Ads/:id/:section", component: AdsUpdateComponent },
      { path: "subbranch", component: SubBranchComponent },
      { path: "subranch-list", component: SubBranchListComponent },
      { path: 'update-subbranch/:id', component: SubBranchUpdateComponent },
      { path: 'employee-list', component: EmployeeListComponent },
      { path: 'employee-create', component: EmployeeCreateComponent },
      { path: 'employee-update/:id', component: EmployeeUpdateComponent },
      { path: 'assign-products/:subBranchId', component: AssignedProductsComponent },
      { path: 'supplier-list', component: SuppliersListComponent },
      { path: 'create-supplier', component: CreateSuppliersComponent },
      { path: 'update-supplier/:id', component: UpdateSuppliersComponent },
      { path: 'view-supplier-details/:id', component: ViewSupplierDetailsComponent },

      { path: 'supplier-purchase-list', component: SupplierPurchaseListComponent },
      { path: 'add-supplier-purchase', component: AddSupplierPurchaseComponent },
      { path: 'update-supplier-purchase/:id', component: UpdateSupplierPurchaseComponent },

      { path: 'supplier-purchase-item', component: SupplierPurchaseItemComponent },
      { path: 'create-supplier-purchase-item', component: CreateSupplierPurchaseItemComponent },
      { path: 'update-supplier-purchase-item/:purchaseId/:itemId', component: UpdateSupplierPurchaseItemComponent },

      { path: 'gold-smith-list', component: MakersListComponent },
      { path: 'create-gold-smith', component: CreateMakersComponent },
      { path: 'update-gold-smith/:id', component: UpadateMakersComponent },

      { path: 'gold-smiths-production-list', component: MakersProductionListComponent },
      { path: 'create-gold-smiths-production', component: CreateMakersProductionComponent },
      { path: 'update-gold-smiths-production/:id', component: UpdateMakersProductionComponent },

      { path: 'gold-smith-production-item-list', component: MakersProductionItemListComponent },
      { path: 'create-gold-smith-production-item', component: CreateMakersProductionItemComponent },
      { path: 'update-gold-smith-production-item/:id', component: UpdateMakersProductionItemComponent },

      { path: "scheme-list", component: ListSchemaComponent },
      { path: "CreateScheema", component: CreateScheemaComponent },
      { path: 'edit-scheme/:id', component: UpdateScheemaComponent },
      { path: "user-scheema-list", component: UserSchemaComponent },
      { path: "user-scheema-Create", component: CreateUserscheemaComponent },
      { path: "user-scheema-update/:id", component: UpdateUserscheemaComponent },
      { path: 'view-scheme/:id', component: ViewScheemaComponent },
      { path: "userpayment-scheema-list", component: SchemaPaymentListComponent },
      { path: "sizechat-list", component: SizeChatListComponent },
      { path: "create-sizechat", component: SizeChatCreateComponent },








      {
        path: 'product/:subBranchId',
        component: ProductListComponent
      }




    ]
  },
  {
    path: 'SUB_BRANCH',
    component: SubBranchSidebarComponent,
    children: [

      {
        path: 'dashboard',
        component: SubbranchDashboardComponent
      },
      { path: 'metal-list', component: MetalListComponent },


      {
        path: 'AssignedProducts',
        component: AssignedProductsComponent
      },
      // Category
      {
        path: 'category',
        component: CategoryComponent
      },

      // Sub Category
      {
        path: 'list_subcategory',
        component: SubCategoryListComponent
      },

      // Sub Sub Category
      {
        path: 'subsubcategory',
        component: SubSubCategoryListComponent
      },

      {
        path: 'view-order/:id',
        component: OrderViewDialogComponent
      },
      {
        path: 'order-list',
        component: ListOrderComponent
      },

      {
        path: 'Order-create',
        component: CreateOrderComponent
      },

      {
        path: 'stones-list',
        component: StonesListComponent
      },
      { path: "Profile", component: ProfileComponent }

    ]
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
