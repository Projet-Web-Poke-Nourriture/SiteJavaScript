export interface Categorie {
  id: number;
  nom: string;
  couleur: string;
}

export interface Utilisateur {
  id: number;
  login: string;
  email: string;
  password: string;
  premium: boolean;
  roles: string[];
}

export interface Ingredient {
  id: number;
  nom: string;
  type: Categorie;
}

export interface Recette {
  id: number;
  nom: string;
  recommander: boolean;
  date: Date;
  auteur: Utilisateur;
  tempsPrepa: number;
  ingredients: {
    ingredient: Ingredient;
    nombreNecessaire: number;
    poidsNecessaire: number;
  }[];
  etapes: { numero: number; descriptif: string }[];
}
