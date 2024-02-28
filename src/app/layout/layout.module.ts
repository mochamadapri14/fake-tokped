import { NgModule } from "@angular/core";
import { FooterPageComponent } from "./footer-page/footer-page.component";
import { HeaderPageComponent } from "./header-page/header-page.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        HeaderPageComponent,
        FooterPageComponent
    ],
    imports: [CommonModule],
    exports: [
        HeaderPageComponent,
        FooterPageComponent
    ]
})

export class LayoutModule { }