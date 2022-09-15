# SymfonyModule

Ce projet a été réalisé dans le cadre d'un test de compétences en développement pour m'évaluer en tant que candidat pour le poste d'alternant Développeur FullStack chez WeBreathe

Prérequis : 
Composer (pour installer les dépendances et lancer le projet Symfony)
npm (Pour installer les dépendances et lancer la partie ReactJS)
Une invite de commande (example : Cmder)
Un serveur local MYSQL (exemple : XAMPP)

Tout d'abord, commencez par ouvrir 2 invites de commandes dans ce dossier
Sur la première, exécutez la commande composer install afin d'installer les dépendances Symfony
Sur la deuxièpe, exécutez la commande npm install afin d'installer les dépendances ReactJS

Une fois ceci-fait, vérifiez dans le fichier .env ligne 32/33 que les informations sont correctes pour se connecter à la base de données.
Ensuite, exécutez les commandes suivante dans la première invite de commande :

php bin/console doctrine:database:create
php bin/console doctrine:migration:migrate

Si une demande de confirmation apparaît, entrez yes

Vous êtes maintenant prêt à découvrir le projet
Pour cela, exécutez la commande php -S localhost:8000 (Ou symfony server:start si vous avec le CLI installé) dans le premier terminal ainsi que npm run dev-server dans le second terminal
Vous pouvez maintenant aller sur votre navigateur et entrer l'URL suivante : http://localhost:8000

Je vous souhaite une bonne découverte de mon projet.

Si vous souhaitez regarder mon code, les fichiers importants sont :
Création de la base de données et les relations :
/src/Entity/Module.php
/src/Entity/HistoriqueModule.php

Création de la base du projet : 
/templates/base.html.twig
/src/Controller/AppController.php
/assets/app.js

Création de la barre de navigation :
/assets/scripts/components/Navbar.jsx
/public/js/index.js

Création des pages :
/assets/scripts/pages

Fichier CSS principal (hors bootstrap) :
/public/css/style.css

Bonne journée !
