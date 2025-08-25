import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../common/footer/footer.component";

@Component({
  selector: 'app-publiclayout',
   standalone:true,
    imports: [RouterModule, FooterComponent],
  templateUrl: './publiclayout.component.html',
  styleUrl: './publiclayout.component.scss'
})
export class PubliclayoutComponent {

}
