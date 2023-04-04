import { PhotoService } from '../photo.service';
import { Photo } from '../photo';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StorageService } from '../storage.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { Utils } from '../utils';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  title = 'picsumApp';
  totalCount = 1085;
  photoIndex=0;
  photos:Photo[]=[];
  searchForm:any;
  favorite:any;

  constructor(private photoService: PhotoService, private formBuilder: FormBuilder, private storageService: StorageService) {
    this.searchForm = this.formBuilder.group({
      search: '',
    });
  }
  
  async getInfo(): Promise<void>  {
   this.photoService.getInfo(this.photoIndex).subscribe(data => {

   	let photo = data;
    photo.description=Utils.randomString(400);
    photo.img = "https://picsum.photos/id/"+photo.id+"/500/250.jpg";
	this.photos.push(photo);
	  
   	});

  }
  async ngOnInit(): Promise<void> {
    for(var j=0; j<3; j++)
    {
      await this.getInfo();
      this.photoIndex+=1;
    }
    this.loadFav();
  }
  included(id: any)
  {

    if(!this.favorite.length )
    {
      return false;
    }
    else if (this.favorite.includes(id))
    {
      return true;

    } 
    else
    {
      return false ;
    }
      
  }

	@HostListener("window:scroll", ["$event"])
	async onWindowScroll(event:any) {
   if (window.innerHeight + window.scrollY > document.body.scrollHeight && this.photoIndex <= this.totalCount) {
        await this.getInfo();
        this.photoIndex+=1;
   }
	}

  add(item:any)
  {
    this.storageService.save(item.id, item).then(()=>this.loadFav());
  }
  remove(item:any)
  {
  	this.storageService.remove(item.id).then(()=>this.loadFav());
  }
  loadFav()
  {
     this.storageService.allStorage().then((response) => {
      this.favorite= response;
    }
    );
    //console.log(this.favorite );
  }

}
