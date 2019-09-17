---?image=pitch/back-cyan.png

@snap[west text-left span-70]
@css[text-18](**Comment vendre un chat 140k sur @css[color-cyan](ETHEREUM)**)
@snapend()

@snap[text-05 south-west text-left]
Présenté par @css[color-cyan](**Mathieu Durand**)
Hexira
@snapend()

---?image=pitch/back-cyan.png

@snap[west text-left span-70]
@css[text-18](**Comment vendre ~~un chat~~ @css[color-red](des armes) 140k sur @css[color-cyan](ETHEREUM)**)
@snapend()

@snap[text-05 south-west text-left]
Présenté par @css[color-cyan](**Mathieu Durand**)
Hexira
@snapend()

---

![](https://rinkeby-storage.opensea.io/0xe10ab1b1b344a3df71f31aaf2ea4a836a65b8dbc-preview/3-1568762678.png)
![](https://rinkeby-storage.opensea.io/0xe10ab1b1b344a3df71f31aaf2ea4a836a65b8dbc-preview/1-1568682832.png)
![](https://rinkeby-storage.opensea.io/0xe10ab1b1b344a3df71f31aaf2ea4a836a65b8dbc-preview/0-1568682837.png)

---
@snap[midpoint span-80]
![Never gonna work](https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/917284.png)
@snapend()
@snap[south span-80]
** @css[color-red](DREAM ON BUDDY <br> THIS IS NEVER GONNA WORK) **
@snapend()

---
@snap[midpoint span-80]
![Never gonna work](https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/917284.png)
@snapend()
@snap[south span-80]
** @css[color-red](NOPE <br> NOT A CHANCE) **
@snapend()

---?image=pitch/back-green.png

@snap[west text-left span-70]
@css[text-18](** Bon, <br> @css[color-green](ON VEND QUOI?) **)
@snapend()

---?image=pitch/back-green.png

@snap[west text-left span-70]
@css[text-18](**Des @css[color-green](TOKENS!!)**)
@snapend()


---?image=pitch/back-green.png

@snap[north-west text-left span-70]
@css[text-08](**Des TOKENS**)
@snapend()

@snap[west text-left span-70]
@css[text-18](ERC-@css[color-green](20)?)
@snapend()

---?image=pitch/back-green.png

@snap[north-west text-left span-70]
@css[text-08](**Des TOKENS**)
@snapend()

@snap[west text-left span-70]
@css[text-18](~~ERC-@css[color-green](20)~~)
@css[text-18](ERC-@css[color-green](721)?)
@snapend()

---
@snap[midpoint span-80]
![Never gonna work](https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1503657.png)
@snap[south span-80]
** @css[color-purple](ERC-721 ... pffff. <br>Personne ne va hésiter entre moi et une épée) **
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18](**3h plus tard**)
@snapend()

---?code=pitch/src/weapon-contract.sol&lang=js

@snap[north-east span-50 text-06 text-gray]
Vendre des armes avec Solidity
@snapend

@snap[south span-100 text-08 color-green]
@[1-2](Utilisation de packages existants)
@[4](Comme une classe en JS, mais c'est un contrat)
@[6](Un `event` est lancé par le contrat à tous ceux qui écoutent)
@[8-11]()
@[13](La liste complète des armes)
@[15-16](Le titre et le nom de notre TOKEN)
@[17-27](Le coeur de notre contrat)
@[22-23](Création de la structure de l'arme)
@[24](_mint instancie le TOKEN (ERC-721))
@[25](Le URI du TOKEN, qui permet d'obtenir son metadata)
@[26-27](On avertit tout le monde... c'est le temps d'acheter)
@[37-45](La version public, pour créer les armes bas de gamme)
@[47-52](La version public, pour créer le good stuff)
@[54-57](Les armes de quelqu'un en particulier)
@[59-71](Les specs d'une arme précise)
@snapend

---?image=pitch/back-blue.png

@snap[west text-left span-70]
@css[text-18](**  **)
@css[text-18](** Ok, maintenant <br>@css[color-blue](COMMENT ON ACHÈTE?) **)
@snapend()

---?image=pitch/back-blue.png

@snap[west text-left span-70]
@css[text-18](**15 min plus tard**)
[@css[color-blue](**Opensea**)](https://rinkeby.opensea.io/assets/cryptowars-marketplace)
@snapend()

---?image=pitch/back-cyan.png

@snap[west text-left span-70]
@css[text-18](**  **)
@css[text-18](** Ok, mais <br>@css[color-cyan](C'EST QUOI LE JEU?) **)
@snapend()

---?image=pitch/back-cyan.png

@snap[west text-left span-70]
@css[text-18](**5h15 plus tard**)
[@css[color-cyan](**Cryptowars**)](http://cryptowars.fun/?account=0x8dac237e839d09b7e82d9190314d52e90d2c9794078f039971da5b99764ebc21)
@snapend()

---?image=pitch/back-cyan.png
@snap[north-west]
@css[text-18](**Les morceaux**)
@snapend

@snap[west]
<br>
@ul
- Un contrat pour les guerriers
  - Créer un guerrier
  - Lancer un duel
  - Accepter un duel
  - Une interface avec le contrat des armes
- Une application React
@ulend
@snapend

---?code=pitch/src/inter-contract.sol&lang=js

@snap[north-east span-50 text-06 text-gray]
Appel d'un contrat à partir d'un autre
@snapend

@snap[south span-100 text-08 color-green]
@[1-9](L'interface du contrat distant)
@[11](Notre contrat de guerrier)
@[13](L'instance de notre contrat distant)
@[15-18](Initialisation de notre instance)
@[20-23](Appel d'une fonction de notre contrat)
@snapend

---?code=pitch/src/web3.js&lang=js

@snap[north-east span-50 text-06 text-gray]
Application React: <br>Appel d'un contrat intelligent avec Web3
@snapend

@snap[south span-100 text-08 color-green]
@[1-2](Code généré)
@[4-7](Création du contrat client)
@[9-14](Appel d'une fonction du contrat)
@[11-13]
@snapend

---
@snap[midpoint span-80]
![Never gonna work](https://i.pinimg.com/originals/d4/d5/99/d4d5997b19939576efdaff44d6eb7bfb.png)
@snapend()
@snap[north span-80]
<br>
** @css[color-purple](Euh, je viens de tester) **
@snapend()
@snap[south span-80]
** @css[color-purple](ET C'EST VRAIMENT LENT!!!) **
<br>
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18 color-purple](** Premier problème**)
- 15 transactions par seconde
- Un bloc par 10 secondes
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18 color-purple](**Solution?**)
<br>
@ul
- Faire une prière?
- Ajouter des animations partout?
- Si quelqu'un ici est bon en animation ...
@ulend
@snapend()

---
@snap[midpoint span-80]
![Never gonna work](https://www.cryptokitties.co/images/kitty-confused-banner.svg)
@snapend()
@snap[north span-80]
<br>
** @css[color-purple](Btw, ça l'air qui a pas de random <br>sur ETHEREUM) **
@snapend()
@snap[south span-80]
** @css[color-purple](Donc les combats sont pipés?) **
<br><br>
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18](**@css[color-purple](Deuxième problème)**)
- Une transaction doit avoir tout ce dont elle a besoin pour s'exécuter
- Donc random n'existe effectivement pas
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18](** @css[color-purple](Solutions?)**)
<br>
@ul
- Faker un random? 
- Utiliser le timestamp du block?
- Utiliser un Oracle?
@ulend
@snapend()

---
@snap[midpoint span-80]
![Never gonna work](http://cdn.cnn.com/cnnnext/dam/assets/180302150409-cryptokitties-1.jpg)
@snapend()
@snap[north span-80]
<br>
** @css[color-purple](Houston we have a problem) **
@snapend()
@snap[south span-80]
** @css[color-purple](Ya clairement un bug, j'ai gagné le combat, mais il se passe rien) **
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-80]
@css[text-18](**@css[color-purple](Troisième problème)**)
Comment on met ça à jour un contrat immuable?
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18](** @css[color-purple](Solutions?)**)
<br>
@ul
- Séparer les contrats?
- S'ouvrir des portes pour modifier les données?
- Utiliser un framework?
@ulend
@snapend()

---
@snap[midpoint span-80]
![Never gonna work](https://static.wax.io/d-img/dynamic-apps/img/phphkcbpm-a62b978855.png)
@snapend()
@snap[north span-80]
<br><br>
** @css[color-blue](Je crois qu'on a une boucle infinie) **
@snapend()
@snap[south span-80]
** @css[color-blue](Je crois qu'on a une boucle infinie) **
<br><br>
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-80]
@css[text-18](**@css[color-purple](Quatrième problème)**)
Attention aux limites
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18](** @css[color-purple](Solutions?)**)
<br>
@ul
- Optimiser, Optimiser, Optimiser
- Séparer les opérations en plusieurs transactions?
@ulend
@snapend()

---
@snap[midpoint span-80]
![Never gonna work](https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1676989.png)
@snapend()
@snap[north span-80]

** @css[color-blue](Est-ce que quelqu'un peut nous dire) **
@snapend()
@snap[south span-80]
** @css[color-blue](POURQUOI?) **
<br>
@snapend()

---?image=pitch/back-blue.png

@snap[west text-left span-70]
@css[text-18](** @css[color-blue](POURQUOI?) **)
@ul
- **Sans @css[color-blue](AUTORITÉ CENTRALE) **
- **@css[color-blue](ARGENT) et @css[color-blue](CODE) dans la même transaction**
- **Utilisateur @css[color-blue](PROPRIÉTAIRE) <br> de ses données**
@ulend
@snapend()

---
@snap[midpoint span-80]
![Never gonna work](https://www.cryptokitties.co/images/landing/fanciesFront.png)
@snapend()
@snap[north span-80]
<br><br>
** @css[color-blue](Quand même cool ton jeu) **
@snapend()
@snap[south span-80]
** @css[color-blue](Je me cherche justement un sideline) **
<br><br>
@snapend()


---?image=pitch/back-blue.png

@snap[west text-left span-70]
@css[text-18](** @css[color-blue](CRYPTOWARS) **)
@css[text-08](http://github.com/matdurand/cryptowars)
@css[text-08](Demo on the Rinkeby testnet: http://cryptowars.fun?account=YOUR_PRIVATE_KEY)
@css[text-18](** @css[color-red](NOT PROD READY) **)
@snapend()