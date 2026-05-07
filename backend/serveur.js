const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const appProduits = express(); 
const appPanier = express();   

appProduits.use(cors());
appPanier.use(cors());
appProduits.use(express.json());
appPanier.use(express.json());

// Connexion à la base de données locale
const lienMongoDB = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/magasin-jeux";

mongoose.connect(lienMongoDB)
  .then(() => {
    console.log("✅ Connexion à MongoDB réussie !");
    initialiserJeux(); 
  })
  .catch((erreur) => console.log("❌ Erreur MongoDB :", erreur));


// --- 1. MODÈLES DE LA BASE DE DONNÉES ---
const Produit = mongoose.model('Produit', new mongoose.Schema({
  titre: String,
  imageUrl: String,
  prix: Number,
  buttonColor: String
}));

const Panier = mongoose.model('Panier', new mongoose.Schema({
  titre: String,
  prix: Number,
  quantite: { type: Number, default: 1 } // Gestion de la quantité (x2, x3...)
}));


// --- 2. CRÉATION DES JEUX VIDÉO DE DÉPART ---
async function initialiserJeux() {
  const count = await Produit.countDocuments();
  if (count === 0) {
    await Produit.insertMany([
      { titre: 'Zelda: Breath of the Wild', imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.png', prix: 59.99, buttonColor: '#e60012' },
      { titre: 'Elden Ring', imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.png', prix: 69.99, buttonColor: '#bfa15f' },
      // Une image de Mario Kart très fiable issue d'une base de données de jeux (IGDB)
      { titre: 'Mario Kart 8', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvVq_CW6VTb9anM0OayOGby6d6iy6pzRjDsA&s', prix: 49.99, buttonColor: '#00aae4' }
    ]);
    console.log("🎮 3 jeux vidéos ont été ajoutés à la base !");
  }
}


// --- 3. LES ROUTES (APIs) ---

// PORT 8080 : Le catalogue de produits
appProduits.get('/api/produits', async (req, res) => {
  res.json(await Produit.find()); 
});

// PORT 8000 : Le Panier
appPanier.get('/api/panier', async (req, res) => {
  res.json(await Panier.find()); 
});

// Ajouter au panier (Avec la logique pour augmenter la quantité)
appPanier.post('/api/panier', async (req, res) => {
  const jeuExistant = await Panier.findOne({ titre: req.body.titre });
  
  if (jeuExistant) {
    jeuExistant.quantite += 1;
    await jeuExistant.save();
  } else {
    const nouvelArticle = new Panier({ ...req.body, quantite: 1 }); // Sinon on le crée
    await nouvelArticle.save();
  }
  res.json({ message: "Jeu ajouté au panier avec succès !" });
});

// Supprimer UN jeu précis du panier (grâce à son ID)
appPanier.delete('/api/panier/:id', async (req, res) => {
  await Panier.findByIdAndDelete(req.params.id);
  res.json({ message: "Jeu retiré du panier" });
});

// Vider TOUT le panier (pour le bouton Payer)
appPanier.delete('/api/panier', async (req, res) => {
  await Panier.deleteMany({}); // Supprime tout le contenu de la collection Panier
  res.json({ message: "Paiement validé, panier vidé !" });
});


// --- Lancement des serveurs ---
appProduits.listen(8080, () => console.log("🚀 PRODUITS sur le port 8080"));
appPanier.listen(8000, () => console.log("🛒 PANIER sur le port 8000"));