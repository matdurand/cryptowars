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
@css[text-18 color-cyan](**Cryptowars**)
@css[text-18](**Comment vendre ~~un chat~~ @css[color-red](des armes) ~~140k~~ @css[color-red](100k) sur @css[color-cyan](ETHEREUM)**)
@snapend()

@snap[text-05 south-west text-left]
Présenté par @css[color-cyan](**Mathieu Durand**)
Hexira
@snapend()

---
@snap[midpoint span-80]
![Never gonna work](https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/917284.png)
@snapend()
@snap[north span-80]
** @css[color-red](SALUT, JE SUIS UN CRYPTO-KITTY) **
@snapend()
@snap[south span-80]
** @css[color-red](MOI JE VOUS LE DIS, ÇA MARCHERA JAMAIS CE JEU-LÀ) **
@snapend()

---?image=pitch/back-cyan.png
@snap[north-west]
@css[text-18 color-cyan](**Cryptowars**)
Un jeu de duel entre des guerriers
@snapend

@snap[west]
<br><br>
@ul
- Un contrat pour les armes
  - Token ERC-721
- Un contrat pour les guerriers
  - Créer un guerrier
  - Lancer un duel
  - Accepter un duel
  - Des combats
- Un frontend React
@ulend
@snapend

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
@[18-28](Le coeur de notre contrat)
@[22-23](Création de la structure de l'arme)
@[24](_mint instancie le TOKEN (ERC-721))
@[25](Le URI du TOKEN, qui permet d'obtenir son metadata)
@[26-27](On avertit tout le monde... c'est le temps d'acheter)
@snapend

---
@snap[midpoint span-80]
![Never gonna work](https://www.cryptokitties.co/images/kitty-confused-banner.svg)
@snapend()
@snap[south span-80]
** @css[color-red](Pas sur d'avoir suivi, est-ce qu'on peut recommencer à "**Contrat**"?) **
<br>
@snapend()

---?image=pitch/back-blue.png

@snap[west text-left span-70]
@css[text-18](** Ok, maintenant <br>@css[color-blue](COMMENT ON ACHÈTE?) **)
@snapend()

---?image=pitch/back-blue.png

@snap[west text-left span-70]
@css[text-14](**FACILE, <br>on réutilise un**)
[@css[color-blue text-14](**marketplace**)](https://rinkeby.opensea.io/assets/cryptowars-marketplace) @css[text-14](**existant!!**)
<br>
@snapend()


---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18 color-purple](** Premier problème**)
- 150 transactions à chaque 10-15 secondes, pour l'ensemble du réseau
@snapend()

---
@snap[midpoint span-80]
![Never gonna work](https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1334524.png)
@snapend()
@snap[north span-80]
** @css[color-blue](Je l'ai testé son jeu) **
@snapend()
@snap[south span-80]
** @css[color-blue](ET C'EST VRAIMENT LENT!!!) **
<br>
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18 color-purple](**Solution?**)
<br>
@ul
- Ajouter des transitions
- Utilise un sidechain (ex. Loom Network)
@ulend
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18](**@css[color-purple](Deuxième problème)**)
- Ethereum est un système déterministe
- Donc pas de fonction @css[color-purple](random)
@snapend()

---
@snap[midpoint span-80]
![Never gonna work](https://storage.opensea.io/0x06012c8cf97bead5deae237070f9587f8e7a266d/547820.png)
@snapend()
@snap[north span-80]

** @css[color-red](C'est n'importe quoi ce jeu-là) **
@snapend()
@snap[south span-80]
** @css[color-red](Les combats sont pipés d'avance) **
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18](** @css[color-purple](Solutions?)**)
<br>
@ul
- Utiliser un "seed"
  - le timestamp du block 
  - le hash de block précédent
- Utiliser un Oracle
@ulend
@snapend()

---?image=pitch/back-cyan.png

@snap[west text-left span-70]
@css[text-18](**L'interface**)
[@css[color-cyan](**Cryptowars**)](http://cryptowars.fun/?account=0x8dac237e839d09b7e82d9190314d52e90d2c9794078f039971da5b99764ebc21)
@snapend()

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


---?image=pitch/back-purple.png

@snap[west text-left span-80]
@css[text-18](**@css[color-purple](Troisième problème)**)
Comment on met ça à jour un contrat immuable?
@snapend()

---
@snap[midpoint span-80]
![Never gonna work](https://cryptokitties411.files.wordpress.com/2018/05/docpurr.png?w=809)
@snapend()
@snap[south span-100]
** @css[color-purple](Ya clairement un bug, regardez moi...) **
<br>
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18](** @css[color-purple](Solutions?)**)
<br>
@ul
- Ne pas faire de bugs?
- Séparer logique et données en plusieurs contrats
@ulend
@snapend()

---
@snap[midpoint span-80]
![Never gonna work](https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1676989.png)
@snapend()
@snap[north span-80]

**@css[color-blue](Ok, mais, POURQUOI ETHEREUM?) **
@snapend()
@snap[south span-80]
** @css[color-blue](Ça serait pas plus simple en Node?) **
<br>
@snapend()

---?image=pitch/back-blue.png

@snap[west text-left span-70]
@css[text-18](** @css[color-blue](POURQUOI?) **)
@ul
- **Infrastructure @css[color-blue](DÉCENTRALISÉE) **
- **@css[color-blue](ARGENT) et @css[color-blue](CODE) dans la même transaction**
- **Utilisateur @css[color-blue](PROPRIÉTAIRE) <br> de ses données**
@ulend
@snapend()

---?image=pitch/back-blue.png

@snap[west text-left span-70]
@css[text-18](** @css[color-blue](CRYPTOWARS) **)
@css[text-08](http://github.com/matdurand/cryptowars)
@css[text-08](Demo on the Rinkeby testnet: http://cryptowars.fun?account=YOUR_PRIVATE_KEY)
@css[text-18](** @css[color-red](NOT PROD READY) **)
@snapend()

