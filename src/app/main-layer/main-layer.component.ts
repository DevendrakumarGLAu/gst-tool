import { Component } from '@angular/core';
import { HeaderComponent } from '../common/header/header.component';
import { FooterComponent } from '../common/footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthHeaderComponent } from '../common/auth-header/auth-header.component';

@Component({
  selector: 'app-main-layer',
  standalone:true,
  imports: [RouterModule,AuthHeaderComponent,FooterComponent],
  templateUrl: './main-layer.component.html',
  styleUrl: './main-layer.component.scss'
})
export class MainLayerComponent {

}
