import { NgModule } from "@angular/core";
import { FooterPageComponent } from "./footer-page/footer-page.component";
import { HeaderPageComponent } from "./header-page/header-page.component";
import { CommonModule } from "@angular/common";
import { BannerComponent } from "./banner/banner.component";
import { MenuCategoryComponent } from "./menu-category/menu-category.component";

@NgModule({
    declarations: [
        HeaderPageComponent,
        FooterPageComponent,
        BannerComponent,
        MenuCategoryComponent
    ],
    imports: [CommonModule],
    exports: [
        HeaderPageComponent,
        FooterPageComponent,
        BannerComponent,
        MenuCategoryComponent
    ]
})

export class LayoutModule { }