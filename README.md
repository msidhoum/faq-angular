# FAQ Application Angular7

## Pré-requis

- Installer NodeJS et NPM à télécharger depuis le site officiel https://nodejs.org
- Installer Angular-CLI https://angular.io/cli

depuis un terminal lancer

```
npm install -g @angular/cli

```
- Installer json-server pour les besoins du serveur de mockups
 
```
npm install -g json-server
```

## Procédure pour lancer l'application

L'application est composée de deux parties à lancer 
- le serveur de mocks qui est géré par json-server
- l'application web angular

Ouvrir un terminal depuis la racine du projet et lancer la commande suivante :

```
json-server --watch mocks/db.json
```

cela aura pour effet de démarrer un serveur json qui va simuler une API et une base de donnée afin de stocker les questions/réponses de la FAQ.

Json Server est un outil très connu dans le milieu et bien pratique pour faire des mockups d'API Json 


Une fois la commande lancée cela vous donne accès à l'url http://localhost:3000

et c'est donc sur cette url que l'application web va discuter pour les besoins de la FAQ

Ouvrir un second terminal et lancer la commande suivante :

```
npm install
```

cela aura pour effet de télécharger les dépendances web de l'application angular.

une fois terminé, il suffit de lancer la commande suivante

```
ng serve
```
Angular-CLI va s'occuper de packager le projet à l'aide de webpack automatiquement et va ensuite publier l'application sur l'adresse 
 http://localhost:4200
 
 Il suffit alors de naviguer sur cette URL http://localhost:4200


## Build optionnel

Normalement en utilisant la procédure décrite précédemment il n'y a pas besoin de builder le projet, car tout s'est fait avec webpack et NPM

Ceci dit si vous voulez tout de même builder le projet afin de la déployer sur un serveur apache ou nginx distant alors il suffit de lancer la commande `ng build`.

les artefacts seront alors créés dans le dossier `dist/`.
 
Utiliser l'option `--prod` pour un build de production.

## Lancement des tests unitaires

Lancer `ng test` pour exécuter les tests unitaires via [Karma](https://karma-runner.github.io).

## Lancement des tests end-to-end

Lancer la commande `ng e2e` pour exécuter les tests end-to-end tests via [Protractor](http://www.protractortest.org/).


## Choix d'outils et d'implémentation dans cette application

- Bootstrap CSS V4.3 https://getbootstrap.com
- NG-Bootstrap https://ng-bootstrap.github.io/#/home
- JSON-Server https://github.com/typicode/json-server Avoir un service fake REST API avec zero coding en moins de 30 secondes.
- ngx-chips https://github.com/Gbuomprisco/ngx-chips Composant bien foutu pour les applications angular pour faire du tag input
- Implémentation d'une guard angular pour sécuriser la page settings qui ne doit être accessible que pour les utilisateur admin.
