import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayerComponent } from "./main-layer/main-layer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gst-tool-ui';
}
