export interface Categorie {
  id: number;
  nom: string;
  couleur: string;
}

export interface Utilisateur {
  id: number;
  login: string;
  adresseEmail: string;
  premium: boolean;
  roles: string[];
}

export interface Ingredient {
  id: number;
  nom: string;
}

export interface Recette {
  id: number;
  nom: string;
  recommande: boolean;
  date: Date;
  auteur: Utilisateur;
  tempsPreparation: number;
  ingredients: {
    ingredient: Ingredient;
    nombreNecessaire: number;
    poidsNecessaire: number;
  }[];
  etapes: string;
}
