import { PhotoService } from './photo.service';
import { Photo } from './photo';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StorageService } from './storage.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'picsumApp';
}
