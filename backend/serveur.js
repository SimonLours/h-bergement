const express = require('express'); // Framework pour créer notre serveur API REST
const mongoose = require('mongoose'); // Outil pour simplifier la communication avec MongoDB
const cors = require('cors'); // Middleware pour autoriser notre Frontend Angular à nous parler sans blocage de sécurité

const app = express(); // 🔴 Une seule application pour tout le backend !

app.use(cors());
app.use(express.json()); // Middleware indispensable pour que le serveur comprenne les données envoyées en POST (format JSON)

// --- Connexion à la base de données locale ---
// On utilise la variable d'environnement définie dans notre docker-compose, ou une adresse locale par défaut
const lienMongoDB = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/magasin-jeux";

mongoose.connect(lienMongoDB)
  .then(() => {
    console.log("✅ Connexion à MongoDB réussie !");
    initialiserJeux(); // On remplit la base de données au démarrage si elle est vide
  })
  .catch((erreur) => console.log("❌ Erreur MongoDB :", erreur));


// --- 1. MODÈLES DE LA BASE DE DONNÉES ---
// Définition de la structure (Schéma Mongoose) de nos documents dans les collections
const Produit = mongoose.model('Produit', new mongoose.Schema({
  titre: String,
  imageUrl: String,
  prix: Number,
  buttonColor: String
}));

const Panier = mongoose.model('Panier', new mongoose.Schema({
  titre: String,
  prix: Number,
  quantite: { type: Number, default: 1 } // Par défaut, la quantité ajoutée est 1
}));


// --- 2. CRÉATION DES JEUX VIDÉO DE DÉPART ---
// Utilisation de async/await (promesses) pour attendre la réponse de la BDD avant de continuer
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

// Route GET : Renvoie tout le catalogue de produits
app.get('/api/produits', async (req, res) => {
  res.json(await Produit.find()); 
});

// Route GET : Renvoie le contenu actuel de la collection Panier
app.get('/api/panier', async (req, res) => {
  res.json(await Panier.find()); 
});

// Route POST : Ajouter un jeu au panier (ou augmenter sa quantité)
app.post('/api/panier', async (req, res) => {
  // On cherche dans la BDD si ce jeu est déjà présent dans le panier
  const jeuExistant = await Panier.findOne({ titre: req.body.titre });
  
  if (jeuExistant) {
    jeuExistant.quantite += 1; // Si oui, on incrémente juste sa quantité
    await jeuExistant.save();
  } else {
    // Sinon, on crée un tout nouveau document dans la collection Panier
    const nouvelArticle = new Panier({ ...req.body, quantite: 1 });
    await nouvelArticle.save();
  }
  res.json({ message: "Jeu ajouté au panier avec succès !" });
});

// Route DELETE (avec paramètre dynamique :id) : Supprimer UN SEUL jeu précis
app.delete('/api/panier/:id', async (req, res) => {
  await Panier.findByIdAndDelete(req.params.id);
  res.json({ message: "Jeu retiré du panier" });
});

// Route DELETE générale : Vider TOUT le panier
app.delete('/api/panier', async (req, res) => {
  await Panier.deleteMany({}); // Supprime tous les documents de la collection sans exception
  res.json({ message: "Paiement validé, panier vidé !" });
});


// --- Lancement du serveur unique ---
// Notre API écoute sur le port interne 8000 (C'est ce port que Nginx va rediriger)
app.listen(8000, () => console.log("🚀 API Serveur démarré sur le port 8000"));