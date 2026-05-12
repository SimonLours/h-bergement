const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // 🔴 Une seule application pour tout le backend !

app.use(cors());
app.use(express.json());

// --- Connexion à la base de données locale ---
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
  quantite: { type: Number, default: 1 }
}));


// --- 2. CRÉATION DES JEUX VIDÉO DE DÉPART ---
async function initialiserJeux() {
  const count = await Produit.countDocuments();
  if (count === 0) {
    await Produit.insertMany([
      { titre: 'Zelda: Breath of the Wild', imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.png', prix: 59.99, buttonColor: '#e60012' },
      { titre: 'Elden Ring', imageUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.png', prix: 69.99, buttonColor: '#bfa15f' },
      { titre: 'Mario Kart 8', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvVq_CW6VTb9anM0OayOGby6d6iy6pzRjDsA&s', prix: 49.99, buttonColor: '#00aae4' }
    ]);
    console.log("🎮 3 jeux vidéos ont été ajoutés à la base !");
  }
}


// --- 3. LES ROUTES (APIs) ---

// Le catalogue de produits
app.get('/api/produits', async (req, res) => {
  res.json(await Produit.find()); 
});

// Le Panier
app.get('/api/panier', async (req, res) => {
  res.json(await Panier.find()); 
});

// Ajouter au panier
app.post('/api/panier', async (req, res) => {
  const jeuExistant = await Panier.findOne({ titre: req.body.titre });
  
  if (jeuExistant) {
    jeuExistant.quantite += 1;
    await jeuExistant.save();
  } else {
    const nouvelArticle = new Panier({ ...req.body, quantite: 1 });
    await nouvelArticle.save();
  }
  res.json({ message: "Jeu ajouté au panier avec succès !" });
});

// Supprimer UN jeu précis
app.delete('/api/panier/:id', async (req, res) => {
  await Panier.findByIdAndDelete(req.params.id);
  res.json({ message: "Jeu retiré du panier" });
});

// Vider TOUT le panier
app.delete('/api/panier', async (req, res) => {
  await Panier.deleteMany({});
  res.json({ message: "Paiement validé, panier vidé !" });
});


// --- Lancement du serveur unique ---
app.listen(8000, () => console.log("🚀 API Serveur démarré sur le port 8000"));