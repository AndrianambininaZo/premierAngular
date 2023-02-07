import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Produit } from '../model/produit.model';
import { AuthenticationService } from '../services/authentication.service';
import { ProquitService } from '../services/proquit.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produit!:Array<Produit>;
  rechercheFormGroup!:FormGroup;
  currentPage:number=0;
  pageSige:number=8;
  totalPages:number=0;
  currentSearch:string="all";
  
  constructor( private servicesProduit:ProquitService, private fb:FormBuilder, public autheservice:AuthenticationService) {}
//affichage 
  ngOnInit(): void {
    this.rechercheFormGroup=this.fb.group({
      keyword:this.fb.control(null),
    })
    this.handleGetPages();    
  }

  handleGetAlls(){
    this.servicesProduit.getAllProduits().subscribe({
      next:(data)=>{
        this.produit=data;
      }
    });

  }
  handleGetPages(){
    this.servicesProduit.getAllPage(this.currentPage,this.pageSige).subscribe({
      next:(data)=>{
        this.produit=data.produit;
        this.totalPages=data.totalPages;
        console.log(this.totalPages + "salut");
      }
    });

  }
  handelSearch() {
    this.currentSearch="search";
    this.currentPage=0;
    let keyword=this.rechercheFormGroup.value.keyword;
    
    this.servicesProduit.recherche(keyword,this.currentPage,this.pageSige).subscribe({
      next:(data)=>{
        this.produit=data.produit;
        this.totalPages=data.totalPages
      }
    })
    }

  handleDelete(p:Produit){
    let con=confirm("voulez vous supprimmer");
    if(con==false)return;
    this.servicesProduit.deleteProduit(p.id).subscribe({
      next :(data)=>{
        this.handleGetAlls();
      }
    })

  }
  gotoPage(i:number){
    this.currentPage=i;
    
    if(this.currentSearch==="all")
    this.handleGetPages();
    else this.handelSearch();
  }

  

}
