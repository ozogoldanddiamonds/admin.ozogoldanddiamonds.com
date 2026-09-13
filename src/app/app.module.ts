import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './CategoryConteroller/category/category.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { CreateCategoryComponent } from './CategoryConteroller/create-category/create-category.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GoldListComponent } from './Gold-Rate/gold-list/gold-list.component';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateCategoryComponent } from './CategoryConteroller/update-category/update-category.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { SubCategoryListComponent } from './SubCategory/sub-category-list/sub-category-list.component';
import { CreateSubcategoryComponent } from './SubCategory/create-subcategory/create-subcategory.component';
import { UpdateSubcategoryComponent } from './SubCategory/update-subcategory/update-subcategory.component';
import { SubSubCategoryListComponent } from './SubSubCategory/sub-sub-category-list/sub-sub-category-list.component';
import { SubSubCategoryCreateComponent } from './SubSubCategory/sub-sub-category-create/sub-sub-category-create.component';
import { SubSubCategoryUpdateComponent } from './SubSubCategory/sub-sub-category-update/sub-sub-category-update.component';
import { MatSelectModule } from '@angular/material/select';
import { ProductListComponent } from './ProductController/product-list/product-list.component';
import { ProductCreateComponent } from './ProductController/product-create/product-create.component';
import { ProductUpdateComponent } from './ProductController/product-update/product-update.component';
import { AddressComponent } from './address/address.component';
import { ListBannerComponent } from './Banners/list-banner/list-banner.component';
import { CreateBannerComponent } from './Banners/create-banner/create-banner.component';
import { UpdateBannerComponent } from './Banners/update-banner/update-banner.component';
import { UserListComponent } from './user-list/user-list.component';
import { ViewCategoryComponent } from './View-dialog-Controllers/view-category/view-category.component';
import { ViewSubCategoryComponent } from './View-dialog-Controllers/view-sub-category/view-sub-category.component';
import { ViewSubSubCategoryComponent } from './View-dialog-Controllers/view-sub-sub-category/view-sub-sub-category.component';
import { ViewProductComponent } from './View-dialog-Controllers/view-product/view-product.component';
import { MatButtonModule } from '@angular/material/button';
import { GoldCreateComponent } from './Gold-Rate/gold-create/gold-create.component';
import { GoldUpdateComponent } from './Gold-Rate/gold-update/gold-update.component';
import { CouponListComponent } from './coupon/coupon-list/coupon-list.component';
import { CouponCreateComponent } from './coupon/coupon-create/coupon-create.component';
import { CouponUpdateComponent } from './coupon/coupon-update/coupon-update.component';
import { ReviewComponent } from './review/review.component';
import { MetalCreateComponent } from './metal/metal-create/metal-create.component';
import { MetalListComponent } from './metal/metal-list/metal-list.component';
import { MetalUpdateComponent } from './metal/metal-update/metal-update.component';
import { StonesUpdateComponent } from './stones/stones-update/stones-update.component';
import { StonesCreateComponent } from './stones/stones-create/stones-create.component';
import { StonesListComponent } from './stones/stones-list/stones-list.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { ListOrderComponent } from './order/list-order/list-order.component';
import { AdsListComponent } from './AdsController/ads-list/ads-list.component';
import { AdsUpdateComponent } from './AdsController/ads-update/ads-update.component';
import { SubbranchDashboardComponent } from './subbranch-dashboard/subbranch-dashboard.component';
import { SubBranchSidebarComponent } from './sub-branch-sidebar/sub-branch-sidebar.component';
import { SubBranchComponent } from './SubBrabch/sub-branch/sub-branch.component';
import { SubBranchListComponent } from './SubBrabch/sub-branch-list/sub-branch-list.component';
import { SubBranchUpdateComponent } from './SubBrabch/sub-branch-update/sub-branch-update.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee/employee-update/employee-update.component';
import { ViewEmployeeComponent } from './View-dialog-Controllers/view-employee/view-employee.component';
import { ViewBranchComponent } from './View-dialog-Controllers/view-branch/view-branch.component';
import { ProfileComponent } from './profile/profile.component';
import { AssignedProductsComponent } from './AssignedProducts/assigned-products/assigned-products.component';
import { AssignVariantComponent } from './assign-variant/assign-variant.component';
import { ViewOrdersComponent } from './View-dialog-Controllers/view-orders/view-orders.component';
import { ViewOrderItemComponent } from './View-dialog-Controllers/view-order-item/view-order-item.component';
import { ListSchemaComponent } from './schema/list-schema/list-schema.component';
import { CreateScheemaComponent } from './schema/create-scheema/create-scheema.component';
import { UpdateScheemaComponent } from './schema/update-scheema/update-scheema.component';
import { UserSchemaComponent } from './user-scheema/user-schema/user-schema.component';
import { CreateUserscheemaComponent } from './user-scheema/create-userscheema/create-userscheema.component';
import { UpdateUserscheemaComponent } from './user-scheema/update-userscheema/update-userscheema.component';
import { ViewScheemaComponent } from './View-dialog-Controllers/view-scheema/view-scheema.component';
import { ViewUserscheemaComponent } from './View-dialog-Controllers/view-userscheema/view-userscheema.component';
import { SchemaPaymentListComponent } from './scheme-payment/schema-payment-list/schema-payment-list.component';
import { ViewPaymentSchemeComponent } from './View-dialog-Controllers/view-payment-scheme/view-payment-scheme.component';
import { SizeChatListComponent } from './size-chat/size-chat-list/size-chat-list.component';
import { SizeChatCreateComponent } from './size-chat/size-chat-create/size-chat-create.component';
import { SizeChatUpdateComponent } from './size-chat/size-chat-update/size-chat-update.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SuppliersListComponent } from './suppliers/suppliers-list/suppliers-list.component';
import { CreateSuppliersComponent } from './suppliers/create-suppliers/create-suppliers.component';
import { UpdateSuppliersComponent } from './suppliers/update-suppliers/update-suppliers.component';
import { ViewSupplierDetailsComponent } from './suppliers/view-supplier-details/view-supplier-details.component';
import { SupplierPurchaseListComponent } from './suppliers-purchase/supplier-purchase-list/supplier-purchase-list.component';
import { AddSupplierPurchaseComponent } from './suppliers-purchase/add-supplier-purchase/add-supplier-purchase.component';
import { UpdateSupplierPurchaseComponent } from './suppliers-purchase/update-supplier-purchase/update-supplier-purchase.component';
import { UpdateSupplierPurchaseItemComponent } from './suppliers-purchase-item/update-supplier-purchase-item/update-supplier-purchase-item.component';
import { CreateSupplierPurchaseItemComponent } from './suppliers-purchase-item/create-supplier-purchase-item/create-supplier-purchase-item.component';
import { SupplierPurchaseItemComponent } from './suppliers-purchase-item/supplier-purchase-item/supplier-purchase-item.component';
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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    CategoryComponent,
    LoginComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    DeleteConfirmationComponent,
    SubCategoryListComponent,
    CreateSubcategoryComponent,
    UpdateSubcategoryComponent,
    SubSubCategoryListComponent,
    SubSubCategoryCreateComponent,
    SubSubCategoryUpdateComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    AddressComponent,
    ListBannerComponent,
    CreateBannerComponent,
    UpdateBannerComponent,
    UserListComponent,
    ViewCategoryComponent,
    ViewSubCategoryComponent,
    ViewSubSubCategoryComponent,
    ViewProductComponent, GoldListComponent,
    GoldCreateComponent,
    GoldUpdateComponent,
    CouponListComponent,
    CouponCreateComponent,
    CouponUpdateComponent,
    ReviewComponent,
    MetalCreateComponent,
    MetalListComponent,
    MetalUpdateComponent,
    StonesUpdateComponent,
    StonesCreateComponent,
    StonesListComponent,
    CreateOrderComponent,
    ListOrderComponent,
    OrderViewDialogComponent,
    AdsListComponent,
    AdsUpdateComponent,
    SubbranchDashboardComponent,
    SubBranchSidebarComponent,
    SubBranchComponent,
    SubBranchListComponent,
    SubBranchUpdateComponent,
    EmployeeListComponent,
    EmployeeCreateComponent,
    EmployeeUpdateComponent,
    ViewEmployeeComponent,
    ViewBranchComponent,
    ProfileComponent,
    AssignedProductsComponent,
    AssignVariantComponent,
    ViewOrdersComponent,
    ViewOrderItemComponent,
    ListSchemaComponent,
    CreateScheemaComponent,
    UpdateScheemaComponent,
    UserSchemaComponent,
    CreateUserscheemaComponent,
    UpdateUserscheemaComponent,
    ViewScheemaComponent,
    ViewUserscheemaComponent,
    SchemaPaymentListComponent,
    ViewPaymentSchemeComponent,
    SizeChatListComponent,
    SizeChatCreateComponent,
    SizeChatUpdateComponent,
    SuppliersListComponent,
    CreateSuppliersComponent,
    UpdateSuppliersComponent,
    ViewSupplierDetailsComponent,
    SupplierPurchaseListComponent,
    AddSupplierPurchaseComponent,
    UpdateSupplierPurchaseComponent,
    UpdateSupplierPurchaseItemComponent,
    CreateSupplierPurchaseItemComponent,
    SupplierPurchaseItemComponent,
    MakersListComponent,
    CreateMakersComponent,
    UpadateMakersComponent,
    MakersProductionListComponent,
    CreateMakersProductionComponent,
    UpdateMakersProductionComponent,
    MakersProductionItemListComponent,
    CreateMakersProductionItemComponent,
    UpdateMakersProductionItemComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule, MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    NgSelectModule,
    //  MatButtonModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
