import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeriesService } from 'src/app/services/series.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {
  idSerie: string = '';
  titulo: string = '';
  serie: any;
  backUrl: string = '';
  credits: any = [1];
  episodes: any = [1];
  constructor(private route: ActivatedRoute,
    private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.idSerie = params.id;
      this.titulo = params.name;
      this.seriesService.getSerieDetails(this.idSerie).subscribe((data: any) => {
        this.serie = data;
        this.backUrl = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path}`;
        
        this.credits[0] = [];
        this.episodes[0] = [];
        for(let season of this.serie.seasons) {
          this.seriesService.getCredits(this.idSerie, season.season_number).subscribe((data: any) => {
            if(season.season_number == '0') {
              this.credits[0] = data.cast;
            }
            this.credits.push(data.cast);
          });

          this.seriesService.getSeasonDetails(this.idSerie, season.season_number).subscribe((data: any) => {
            if(season.season_number == '0') {
              this.episodes[0] = data.episodes;
            }
            this.episodes.push(data.episodes);
          });
        }
        console.log(this.serie);
      });
    });
  }
}
