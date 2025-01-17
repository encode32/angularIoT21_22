import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { SeriesService } from 'src/app/services/series.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public seriesData: any = [];
  public peliculasData: any = [];
  constructor(private router: Router, 
    private peliculasService: PeliculasService,
    private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.peliculasService.getUpcoming().subscribe((data: any) => {
      console.log(data);
      this.peliculasData = data;
    });

    this.seriesService.getTopRated().subscribe((data: any) => {
      console.log(data);
      this.seriesData = data;
    })
  }

  goToPelicula(id: string, title: string) {
    this.router.navigate(['/pelicula'], {queryParams: {'id' :id, 'title' : title}});
  }

  goToSerie(id: string, name: string) {
    this.router.navigate(['/serie'], {queryParams: {'id' :id, 'name' : name}});
  }

}
