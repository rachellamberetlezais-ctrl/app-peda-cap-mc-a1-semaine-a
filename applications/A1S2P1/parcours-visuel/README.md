# Parcours visuel EPI — pilote pour tout le groupe

Ce pilote propose trois associations illustrées (mains/gants, yeux/lunettes de protection, corps/tablier), trois réponses par sélection d’image et une démonstration cumulative que l’on avance manuellement. Aucun score, nom ou résultat n’est enregistré. Les illustrations vectorielles sont originales. Elles ne représentent pas des signes LSF et ne constituent pas un protocole complet de manipulation d’un produit chimique.

## Limites et premier essai

Ce prototype ne permet pas encore de revendiquer un accès autonome pour une personne non lectrice utilisant la LSF. Les vidéos sont absentes. L’indisponibilité est annoncée ; les boutons LSF restent désactivés, sans faux lecteur.

Faire le premier essai avec la formatrice et, si possible, une personne maîtrisant la LSF : montrer comment toucher les images et naviguer ; vérifier la reconnaissance des zones du corps et des équipements ; observer si l’apprenante comprend la relation et non seulement l’emplacement des boutons. Tous les outils sont proposés au groupe entier.

Les réponses sont accompagnées de formes et symboles, pas seulement de couleurs. Après une erreur, une association illustrée s’affiche et le bouton Réessayer donne un nouvel essai. La démonstration reste silencieuse, ne défile pas automatiquement et respecte la préférence de réduction des animations. Navigation clavier et libellés accessibles sont prévus.

## Ajouter trois courtes vidéos LSF

1. Préparer une explication signée et validée pour chacune des trois parties : intro (observer les associations), choix (toucher une image, comprendre les retours et réessayer), equipement (observer, avancer et revoir la démonstration).
2. Filmer visage, mains et buste dans un cadre stable, contrasté et bien éclairé. Faire vérifier le sens, le vocabulaire professionnel et le cadrage par une personne compétente en LSF. Obtenir l’accord de la personne filmée pour une diffusion dans ce dépôt public.
3. Déposer les MP4 autorisés dans le sous-dossier lsf/ : intro.mp4, choix.mp4, equipement.mp4.
4. Dans lsf.json, renseigner pour chaque rubrique le chemin local, par exemple `"src": "lsf/intro.mp4"`, puis `"validee": true` uniquement après validation. Le bouton correspondant devient disponible. Les chemins externes et les remontées de dossier sont refusés.
5. Tester les trois lecteurs sur téléphone, le bouton fermer, la pause et la relecture. Ne marquer une vidéo validée qu’une fois son fichier effectivement déposé et lu.

Les consignes du produit et le choix des EPI doivent être expliqués en LSF lors de l’accompagnement. Les écrans n’affirment pas que nitrile ou masque conviennent universellement : le choix dépend du produit, de la tâche et des consignes de prévention. Les EPI ne remplacent pas la prévention collective, notamment le captage ou la ventilation.

## Références de prévention

- INRS, Coiffure — Passez à l’action : https://www.inrs.fr/metiers/commerce-service/coiffure/coiffure-agir.html
- INRS, Protection individuelle contre les risques chimiques : https://www.inrs.fr/risques/chimiques/protection-individuelle.html

Le contenu pédagogique de l’application EPI principale reste conservé ; un bouton donne accès à ce parcours séparé.
