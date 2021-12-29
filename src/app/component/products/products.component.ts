import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 
public productList:any;
public searchKey:string = '';
public filterCategory:any;
  constructor(private api:ApiService,private cartService:CartService, private route : Router ) { }

  ngOnInit(): void {

    this.getProducts()

    this.cartService.search.subscribe((val:any)=>{this.searchKey = val})

  }

 getProducts(){
  this.api.getProduct()
  .subscribe(res=>{
    this.productList=res;
   this.filterCategory = res;
    console.log("PRODUCT PAGE", res)
    this.productList.forEach((a:any) => {
      if(a.category === "men's clothing" || a.category === "women's clothing"){
        a.category = "fashion"
      }
      Object.assign(a,{quantity:1,total:a.price});
      
    });
  })
 }

  addtocart(item:any){
    this.cartService.addtoCart(item)
  }


  filter(cat:string){
    this.filterCategory = this.productList.filter((a:any)=>{
      if(a.category == cat || cat ==''){
        return a
      }
     } )
  }

}
