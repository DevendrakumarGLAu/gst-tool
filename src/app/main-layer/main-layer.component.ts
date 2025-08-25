import { Component } from '@angular/core';
import { HeaderComponent } from '../common/header/header.component';
import { FooterComponent } from '../common/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layer',
  standalone:true,
  imports: [RouterModule,HeaderComponent,FooterComponent],
  templateUrl: './main-layer.component.html',
  styleUrl: './main-layer.component.scss'
})
export class MainLayerComponent {

}
