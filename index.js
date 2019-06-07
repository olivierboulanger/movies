function valeur() {
  const input = document.getElementById("search");
  const affiche = document.getElementById("contenu");

  affiche.innerHTML = "";
  const valeur = input.value;
  if (valeur == "") {
    alert("Veuillez entrer un titre de film");
  } else {
    const req = new XMLHttpRequest();
    req.open("GET", "http://www.omdbapi.com/?apikey=74556bd0&s=" + valeur);
    req.addEventListener("load", function() {
      input.value = "";
      // Affiche la réponse reçue pour la requête
      const results = JSON.parse(req.responseText);
      if (results.Response == "False" && results.Error == "Movie not found!") {
        alert("Veuillez entrer un titre valide");
      } else if (
        results.Response == "False" &&
        results.Error == "Invalid API key!"
      ) {
        alert("Votre clé API n'est pas valide");
      } else {
        const movies = results.Search;
        movies.forEach(function(element) {
          console.log(element);
          const ensemble = document.createElement("div");
          const title = document.createElement("h2");
          const year = document.createElement("p");
          const photo = document.createElement("img");
          const lien = document.createElement("a").setAttribute("href", "#");
          // créer élément a
          // set href attribute
          // append a dans photo
          title.textContent = element.Title;
          year.textContent = element.Year;
          if (element.Poster !== "N/A") {
            photo.src = element.Poster;
          }
          photo.alt = element.Title;

          affiche.appendChild(ensemble);
          ensemble.appendChild(title);
          ensemble.appendChild(year);
          ensemble.appendChild(photo);
        });
      }
    });
    req.send(null);
  }
}
