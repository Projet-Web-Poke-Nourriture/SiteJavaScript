/*
    Attribut : 
        - val : string, value à chercher dans la chaine
        - proto : tableau contenant les objets ayant nom comme attribut dans lesquels chercher
*/
function search(val,proto){
    let liste = [];
    for(let valProto in proto){
        if (proto[valProto].nom.includes(val)){
            liste.push(proto[valProto]);
        }
    }
    return liste;
}