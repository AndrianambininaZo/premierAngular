export interface Produit{
    id:string,
    nom:string,
    prix:number
}
export interface PageProduit{
    produit:Produit[];
    page:number;
    size:number;
    totalPages:number;
}