import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../services/product-service.service';
import { productData } from '../datatype';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult:undefined|productData[];
  constructor(private activeRoute:ActivatedRoute,private product:ProductServiceService){};
  ngOnInit(){
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.product.getsearchProduct(query).subscribe((result)=>{
      this.searchResult=result;
      console.log(result);
      
    });
  }
}
