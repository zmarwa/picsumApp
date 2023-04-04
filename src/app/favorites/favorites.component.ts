import { PhotoService } from '../photo.service';
import { Photo } from '../photo';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StorageService } from '../storage.service';
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Utils } from '../utils';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})


export class FavoritesComponent implements OnInit {
  photos:Photo[]=[];
  favorite:any;
  info: Photo| undefined;


  constructor(private photoService: PhotoService, private storageService: StorageService) {

  }
  
  ngOnInit(): void{
  	this.loadFav();
  }

  loadFav()
  {
     this.storageService.allStorage()
     .then((response) => this.getPhotos(response));
     //.then((data)=>this.photos = data);
  }

  getPhotos(ids:any)
  {
  	for(var j=0; j<ids.length; j++)
  	{
  	this.photoService.getInfo(ids[j]).subscribe(info => {
   		this.info = info;
    	this.info.description = Utils.randomString(400);
	  	this.photos.push(this.info);
   	});
  }
  }

  remove(photo:Photo){

  }

}
