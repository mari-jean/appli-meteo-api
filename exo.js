// Clé d'API pour accéder à l'API OpenWeather
const apiKey = "29ba255143055ae900f630039afa0296";

// Ville par défaut
let ville = "Paris";

// Appeler la fonction recevoirTemperature avec la ville par défaut au chargement de la page
recevoirTemperature(ville);

// Gestionnaire d'événement pour le bouton "Changer de ville"
const changerVilleBtn = document.getElementById(`changer`);
changerVilleBtn.addEventListener(`click`, () => {
  // Demander à l'utilisateur d'entrer le nom d'une nouvelle ville
  let ville = prompt(`Entrez le nom d'une ville :`);
  // Appeler la fonction recevoirTemperature avec la nouvelle ville choisie par l'utilisateur
  recevoirTemperature(ville);
});

// Fonction pour récupérer les données météorologiques de la ville choisie
function recevoirTemperature(ville) {
  // Construire l'URL de l'API OpenWeather en utilisant la clé d'API et le nom de la ville
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=" + apiKey + "&units=metric";

  // Créer une requête XMLHttpRequest
  let requete = new XMLHttpRequest();
  requete.open(`GET`, url);
  requete.responseType = `json`;
  requete.send();

  // Gestionnaire d'événement pour traiter la réponse de la requête
  requete.onload = function () {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        // Si la requête a réussi (statut 200), récupérer la réponse JSON
        let reponse = requete.response;

        // Extraire la température et le nom de la ville de la réponse
        let temperature = reponse.main.temp;
        let nomVille = reponse.name;

        // Mettre à jour les éléments HTML correspondants avec la température et le nom de la ville
        document.getElementById("temperature_label").textContent = temperature;
        document.getElementById(`ville`).textContent = nomVille;
      } else {
        // Si la requête a échoué (statut autre que 200), afficher une alerte
        alert(`Un problème est intervenu, merci de revenir plus tard.`);
      }
    }
  };
}

