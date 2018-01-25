# MerryHome
Votre assistant domotique maison simple et intuitif.

## Installation

L'installation de **NodeJS est indispensable** pour le fonctionnement du client et du serveur. L'application MerryHome est compatible pour une installation sous Windows, Mac et Linux. Je recommande une installation du serveur sur un Raspberry PI pour pouvoir installer certains plugins et utiliser les GPIOs de celui-ci.
###### [Tutoriel Openclassrooms pour l'installation de nodejs.](https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/installer-node-js)
Pour le serveur et les clients l'installation est la même. Après avoir réaliser un `git clone` du projet ou l'avoir télécharger et déziper, il suffit de taper la commande `npm install` dans le repertoire correspondant à chaques parties (serveur et client). Les dépendences liées aux fichiers package.json vont être télécharger et installer automatiquement.

# Architecture Serveur
<img src="https://github.com/Mugiwaranojo/MerryHome/blob/master/ServerDiagram.png">


# Architecture Client
<img src="https://github.com/Mugiwaranojo/MerryHome/blob/master/ArchitectureClient.png">
