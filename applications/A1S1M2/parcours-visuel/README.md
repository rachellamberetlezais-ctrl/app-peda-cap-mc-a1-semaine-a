# Parcours visuel de statistiques S1 — pilote

Complément au cours, proposé à tout le groupe. Trois étapes : reconnaître les prestations illustrées, regrouper chaque ticket avec son dessin, choisir les effectifs et le total dans un tableau. Une dernière question porte sur le groupe le plus représenté. Aucun nom, score ou résultat individuel n’est stocké ni transmis. Les fréquences et pourcentages ne sont pas couverts par ce premier parcours.

## Séries et contrôle du comptage

- Série découverte : 12 prestations, dont 5 coupes, 4 brushings et 3 colorations.
- Série complète : les 40 codes de la variable rawPrestations du cours d’origine sont repris exactement dans data.js. Ils contiennent 14 coupes, 8 colorations, 6 balayages, 6 soins et 6 brushings ; le total vaut 40.
- Incohérence préexistante : les compteurs du cours d’origine annoncent 16 coupes, 8 colorations, 5 balayages, 6 soins et 5 brushings. Cette différence reste à harmoniser dans le cours, qui n’est pas réécrit par l’ajout du parcours visuel.
- Les résultats du nouveau parcours sont calculés à partir des images affichées, sans reprendre les compteurs incohérents.

Une image représente une prestation. Ne pas assimiler systématiquement une prestation à une personne distincte. Les noms et dessins des catégories doivent être expliqués et vérifiés avec l’apprenante avant le premier essai. Les formes des équipements et leurs libellés permettent de distinguer les services sans dépendre uniquement des couleurs.

Le bouton Voir un exemple sélectionne une image et montre son groupe. Le placement reste déclenché par l’apprenant : pas de défilement automatique. Toute image placée ne peut plus être comptée une deuxième fois. Le tableau représente l’ensemble de la série, même lorsque l’on décide d’y accéder avant d’avoir fini le tri. Les bonnes réponses d’une ligne sont conservées jusqu’à une réinitialisation ou un changement de série.

## LSF et limites

Ce pilote n’est pas encore un parcours autonome pour une personne non lectrice utilisant la LSF. Les vidéos sont absentes ; les boutons restent désactivés et un avis l’annonce. Prévoir un premier essai accompagné par la formatrice et, si possible, une personne maîtrisant la LSF.

Trois vidéos sont prévues : observer (une image représente une prestation), trier (toucher un ticket puis son groupe, comprendre les corrections), tableau (effectif, total, comparaison). Après réalisation, autorisation de diffusion publique et validation du contenu signé, déposer les MP4 dans lsf/ puis renseigner dans lsf.json le chemin et `validee: true`, par exemple `"src": "lsf/observer.mp4"`. Le visage, les mains et le buste doivent rester visibles. Les boutons ne s’activent que pour des chemins locaux MP4 validés et effectivement disponibles.

L’activité peut être reprise librement. Changer de série ou Recommencer réinitialise cet entraînement, sans toucher au cours d’origine ni à d’autres applications.
