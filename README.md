# MerryHome
Votre assistant domotique maison simple et intuitif.

## Installation

L'installation de **NodeJS est indispensable** pour le fonctionnement du client et du serveur. L'application MerryHome est compatible pour une installation sous Windows, Mac et Linux. Je recommande une installation du serveur sur **un Raspberry PI** pour pouvoir installer certains plugins et utiliser les GPIOs de celui-ci.
###### [Tutoriel Openclassrooms pour l'installation de nodejs.](https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/installer-node-js)
Pour le serveur et les clients l'installation est la même. Après avoir réaliser un `git clone` du projet ou l'avoir télécharger et déziper, il suffit de taper la commande `npm install` dans le repertoire correspondant à chaques parties (serveur et client). Les dépendences liées aux fichiers package.json vont être télécharger et installer automatiquement.

## Configuration

L'authentification se fait via le service [Auth0](https://auth0.com). Vous devez y créer un compte, un projet et un client d'application web.
###### [Tutoriel exemple pour l'integration de l'autification avec un serveur NodeJS et un client react.](https://auth0.com/blog/reactjs-authentication-tutorial/)

Vous devez changer les informations d'authentification fournis par **Auth0** dans les fichiers ci-dessous :
- merryserver/services/AuthService.js
- merryclient/src/utils/AuthService.js
- merryclient-natif/src/utils/AuthService.js

Vous devrez également changer l'url de votre serveur dans les fichiers :
- merryclient/src/utils/merryhome-api.js
- merryclient-natif/src/utils/merryhome-api.js

## Plugins

L'architecture du projet permet d'ajouter un certain nombre de module qui seront installer dans le repertoire **merryserver/plugins**. De bases les plugins wikipedia, time et cameras sont installés. Le plugin camera est configurable comme tous les plugins via sont fichier config.json. Il permet d'avoir un système de vidéo survaillance comprenant la détection des mouvement à bas coût.

```json
{
  "cameras":[
    { "path": "url of your cameras", 
      "port": 5010,
      "name": "name of camera"
    },
    { "path": "or you can choose video interface (0, 1, etc ...)",
      "port": 5020,
      "name": "name of camera"
    }
  ]
}
```

Voici une liste d'autres plugins à télécharger et à installer :
- [Plugin Zwave](https://github.com/Mugiwaranojo/PluginZwave) : permet le contrôle de module zwave.
- [Plugin IPTV](https://github.com/Mugiwaranojo/PluginIPTV) : contrôle de la télévision à travers une liste de chaîne dans un fichier m3u.
- [Plugin PionnerVSX](https://github.com/Mugiwaranojo/PluginPionnerVSX) : permet le contrôle d'ampli pionner vsx.
- [Plugin Sensors](https://github.com/Mugiwaranojo/PluginSensors) : récupere les données de capteur de température, de présence et d'une cellule photovoltaïque.
- Plugin RemoteIR: permet de configurer une télécommande infrarouge que le serveur pourra remplacer.
- Plugin Youtube : permet de récuper ses playlists youtube et transmettre les vidéo sur le serveur.
- Plugin Wakeup  : configuration d'action liés aux autres plugins pour éffectuer un réveil matin.


## Exécution

Pour éxécuter le serveur et le client react il suffit de taper dans les répertoires correspondants la commande `npm start`.
Pour le client react-native, il faut éxécuter la commande `react-native run-android`.



# Architecture Serveur
<img src="https://github.com/Mugiwaranojo/MerryHome/blob/master/ServerDiagram.png">


# Architecture Client
<img src="https://github.com/Mugiwaranojo/MerryHome/blob/master/ArchitectureClient.png">
