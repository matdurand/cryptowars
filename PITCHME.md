---?image=pitch/back-cyan.png

@snap[west text-left span-70]
@css[text-18](**Comment vendre un chat 140k sur @css[color-cyan](ETHEREUM)**)
@snapend()

@snap[text-04 south-west text-left]
Présenté par **Mathieu Durand**
Hexira
@snapend()

---?image=pitch/back-green.png

@snap[west text-left span-70]
@css[text-18](** @css[color-green](DÉFINITIONS) **)
@snapend()

+++?image=pitch/back-green.png

@snap[west text-left span-70]
@css[text-18](**C'est quoi une @css[color-green](chaine de block?)**)
@snapend()

+++?image=pitch/back-green.png

@snap[west text-left span-70]
@css[text-18](**C'est quoi un @css[color-green](contrat intelligent?)**)
@snapend()

---?image=pitch/back-blue.png

@snap[west text-left span-70]
@css[text-18](** @css[color-blue](ETHEREUM) **)
@snapend()

+++?image=pitch/back-blue.png

@snap[west text-left span-70]
@css[text-18](**C'est une @css[color-blue](MACHINE VIRTUELLE) **)
@snapend()

+++?image=pitch/back-blue.png

@snap[west text-left span-70]
@css[text-18](**@css[color-blue](COMPLÈTEMENT DÉCENTRALISÉ) **)
@snapend()

+++?image=pitch/back-blue.png

@snap[west text-left span-70]
@css[text-18](**@css[color-blue](L'ETHER) est la monnaie du réseau **)
@snapend()

+++?image=pitch/back-blue.png

@snap[west text-left span-70]
@css[text-18](**Une @css[color-blue](ADRESSE) identifie un compte ou un contrat**)
0xbe0eb53f46cd790cd13851d5eff43d12404d33e8
@snapend()

---?image=pitch/back-blue.png

@snap[west text-left span-70]
@css[text-18](** @css[color-blue](CODE DU CONTRAT) **)
@snapend()

---?code=pitch/src/msg.js&lang=js

@snap[north-east span-50 text-06 text-gray]
Variables globales
@snapend

---?code=pitch/src/simple-contract.sol&lang=js

@snap[north-east span-50 text-06 text-gray]
Contrat intelligent avec Solidity
@snapend

@snap[south span-100 text-08 color-green]
@[1](Utilisation de packages existant)
@[3](Comme une classe en JS, mais c'est un contrat)
@[5](Une simple variable membre)
@[6](La valeur monnaitaire `ether` fait partie du langage)
@[8](Un `event` est lancé par le contract à tous ceux qui écoutent)
@[10,11](`mapping` est une simple hashmap)
@[10,11](`address` est un concept fort de Ethereum qui permet d'identifier un intervenant)
@[13-19]()
@[21-25](un `modifier` qui permet de sortir des préconditions de fonctions)
@[27-33](Une simple fonction)
@[28](`hasRequiredPayment` est un modifier. on peut coder nos propre modifiers)
@[28](`payable` indique que la fonction va recevoir de l'ether)
@[29-31]
@[32](on émet une événement quand notre code est terminé)
@snapend

---?image=pitch/back-blue.png

@snap[west text-left span-70]
@css[text-18](** CODE POUR @css[color-blue]( APPELER UN CONTRAT) **)
@snapend()


---?code=pitch/src/web3.sol&lang=js

@snap[north-east span-50 text-06 text-gray]
La fonction que nous allons appeler
@snapend

---?code=pitch/src/web3.js&lang=js

@snap[north-east span-50 text-06 text-gray]
Appel d'un contrat intelligent avec Web3
@snapend

@snap[south span-100 text-08 color-green]
@[1-2](Code généré)
@[4-7](Création du contrat client)
@[9-14](Appel d'une fonction du contrat)
@[11-13]
@snapend

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18](** @css[color-purple](FONDATION DES CONTRATS INTELLIGENTS) **)
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18](** Prévoir @css[color-purple](LA LENTEUR) **)
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18](** Penser @css[color-purple](DÉTERMINISTE)**)
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18](** Mise à jour @css[color-purple](DIFFICILE)**)
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18](** Attention aux @css[color-purple](LIMITES) **)
@snapend()

---?image=pitch/back-purple.png

@snap[west text-left span-70]
@css[text-18](** Utiliser les @css[color-purple](STANDARDS) **)
@snapend()

---?image=pitch/back-cyan.png

@snap[west text-left span-70]
@css[text-18](** La compétition <br> @css[color-cyan](CARDANO) <br> @css[color-cyan](EOS) **)
@snapend()
