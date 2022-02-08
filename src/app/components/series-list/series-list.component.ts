import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {
  seriesData: any = [];
  page = 1;
  totalPages = 0;
  numSeries = 0;

  constructor(private router: Router, private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.seriesService.getPopular().subscribe((data => {
      console.log(data);
      this.seriesData = data;
    }))
  }

  goToSerie(id: string, name: string) {
    this.router.navigate(['/serie'], {queryParams: {'id' :id, 'name' : name}});
  }

  loadMoreSeries() {
    this.page += 1;
    this.numSeries = this.seriesData.length;
    this.seriesService.getPopular(this.page).subscribe((data: any) => {
      this.seriesData = this.seriesData.concat(data.results);
      this.totalPages = data.total_pages;
    });
  }
}
