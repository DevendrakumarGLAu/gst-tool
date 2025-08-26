import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, NgIf, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  showModal = false;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }
  openPlatformModal() {
    this.showModal = true;
  }

  closePlatformModal() {
    this.showModal = false;
  }
  selectPlatform(platform: string) {
    this.showModal = false;

    this.router.navigate(['/main/tools/gst-tool'], {
      queryParams: { platform }
    });
  }
}
