import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayerComponent } from "./main-layer/main-layer.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gst-tool-ui';
}
