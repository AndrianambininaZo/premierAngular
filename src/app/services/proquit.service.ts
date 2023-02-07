import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of } from 'rxjs';
import {  PageProduit, Produit } from '../model/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProquitService {
  private produit!:Array<Produit>;
  constructor() {
    this.produit=[
      {id:UUID.UUID(),nom:"voanjo",prix:3000},
      {id:UUID.UUID(),nom:"Fary",prix:300},
      {id:UUID.UUID(),nom:"Tsaramaso",prix:1500},
    ];
    for (let index = 0; index < 8; index++) {
      this.produit.push({id:UUID.UUID(),nom:"voanjo",prix:3000});
      this.produit.push({id:UUID.UUID(),nom:"Fary",prix:300});
      this.produit.push({id:UUID.UUID(),nom:"Tsaramaso",prix:1500});
      
    }
   }
   public getAllProduits():Observable<Produit[]>{
    return of (this.produit);
   }

   public getAllPage(page:number, size:number):Observable<PageProduit>{
    let index=page*size;
    let totalPages=~~(this.produit.length/size);
    if(this.produit.length % size !=0)
    totalPages++;
    let pagePageProduit=this.produit.slice(index, index + size);
    return of ({page:page,size:size,totalPages:totalPages,produit:pagePageProduit});
   }
   
   public deleteProduit(id:string):Observable<boolean>{
    this.produit=this.produit.filter(p=>p.id!=id);
    return of(true);


   }
   public recherche(keyword:string,page:number,size:number):Observable<PageProduit>{
    let index=page*size;
    
    let resultat=this.produit.filter(p=>p.nom.includes(keyword));
    let totalPages=~~(resultat.length/size);
    if(this.produit.length % size !=0)
    totalPages++;
    let pagePageProduit=resultat.slice(index, index + size);
    return of ({page:page,size:size,totalPages:totalPages,produit:pagePageProduit});
   }
}
