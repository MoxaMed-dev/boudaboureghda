var N , M , i , j , px , py , hx = 0 , hy = 0 , ixy = 0 , hxy = 0 , option , condition , h_x_y = 0 , h_y_x = 0, som_prob = 0;

const results = document.querySelector('.results') //le champ des resultats

let PX = []  //liste vide pour stocker les probabilités de source X
let PY = []  //liste vide pour stocker les probabilités de source Y
let PXY = [] //liste vide pour stocker les probabilités conjointes
let PXY_X_Y = [] //matrice vide pour stocker les probabilités conditionnelles  X/Y
let PXY_Y_X = [] //matrice vide pour stocker les probabilités conditionnelles  Y/X

function gettingSize(){ //une fonction pour récuperer la taille des deux sources chaque fois l'utilisateur choisit une fonction
    
    N = document.getElementById('x').value //la taille de la source X
    
    M = document.getElementById('y').value //la taille de la source X

    if(N == '' && M == '') {
        alert('Vous avez oublié de remplir les deux champs du taille des sources!')
    }
    else if(N == '') {
        alert('Vous avez oublié de remplir le champ du taille de la source X!')
    }
    else if(M == '') {
        alert('Vous avez oublié de remplir le champ du taille de la source Y!')
    }
    
    
    //ici on vide tout les listes et matrices pour que l'utilisateur peut recalculer la meme fonction avec des valeurs différentes
    PX = []
    PY = []
    PXY = []
    PXY_X_Y = []
    PXY_Y_X = []
}
function check_some(x){
    let a
    som_prob = 0

    for(a=0;a<x.length;a++){
        som_prob = som_prob + x[a]
    }

    if(som_prob != 1) return false
    else return true 
}
//************************les fonctions de recupération des données************************/

function px_prompt(){ //une fonction appelée si l'utilisateur veut entrer les probabilités P(x)
    do{
        PX = []
        for(i=0;i<N;i++){
            while(PX[i]==null || PX[i] < 0 || PX[i] > 1){
                PX[i] = eval(prompt('Entrer la probabilité du symbole x'+i+': '))
                if(PX[i] < 0 || PX[i] > 1) alert("Valeur incorrecte, veuillez réessayer.")
            }
        }
        if(check_some(PX) != true) alert("La somme des probabilités entrées n'est pas égale à 1, vauillez entrez à nouveau les probabilités correctement.")
    }while(check_some(PX) != true)

}
function py_prompt(){ //une fonction appelée si l'utilisateur veut entrer les probabilités P(y)
    do{
        PY = []
        for(i=0;i<M;i++){
            while(PY[i]==null || PY[i] < 0 || PY[i] > 1){
                PY[i] = eval(prompt('Entrer la probabilité du symbole y'+i+': '))
                if(PY[i] < 0 || PY[i] > 1) alert("Valeur incorrecte, veuillez réessayer.")
            }
        }
        if(check_some(PY) != true) alert("La somme des probabilités entrées n'est pas égale à 1, vauillez entrez à nouveau les probabilités correctement.")
    }while(check_some(PY) != true)

    return PY
}
function p_x_y_prompt(){ //une fonction appelée si l'utilisateur veut entrer les probabilités conjointes P(x , y)
    
    do{
        PXY = []
        for(i=0;i<N;i++){ //creation d'une matrice centenant les probabilités conjointes
            PXY[i] = []
            for(j=0;j<M;j++){
                while(PXY[i][j]==null || PXY[i][j]<0 ||PXY[i][j]>1){
                    PXY[i][j] = eval(prompt('Entrer la probabilité P(x'+i+' , y'+j+'): '))
                    if(PXY[i][j]<0 ||PXY[i][j]>1) alert("Valeur incorrecte, veuillez réessayer.")
                }
            }
        }
    
        for(i=0;i<N;i++){
            px=0
            py=0
            for(j=0;j<M;j++){
                if(i==0) {
                    PY[j]=0
                }
                PY[j] = PY[j] + PXY[i][j]
                px = px + PXY[i][j]
            }
            PX[i]= px
        }
        check_some(PX)
        check_some(PY)
        if(check_some(PX)!=true || check_some(PY)!=true) alert("La somme des probabilités entrées n'est pas égale à 1, vauillez entrez à nouveau les probabilités correctement.")
    }while (check_some(PX)!=true || check_some(PY)!=true) 
   
}
function p_x_sch_y_prompt(){//une fonction appelée si l'utilisateur veut entrer les probabilités conditionnelles P(x | y)
    for(i=0;i<N;i++){
        PXY_X_Y[i] = []
        for(j=0;j<M;j++){
            while(PXY_X_Y[i][j]==null){PXY_X_Y[i][j] = eval(prompt('Donner la valeur de P(x'+i+' | y'+j+'): '))}
        }
    }
    return PXY_X_Y
}
function p_y_sch_x_prompt(){//une fonction appelée si l'utilisateur veut entrer les probabilités conditionnelles P(y | x)
    for(i=0;i<N;i++){
        PXY_Y_X[i] = []
        for(j=0;j<M;j++){
            while(PXY_Y_X[i][j]==null){PXY_Y_X[i][j] = eval(prompt('Donner la valeur de P(y'+j+' | x'+i+'): '))}
        }
    }
}
function calcule_px_py(){ //cette fonction est utilisé pour calculer P(xi) et P(yi) a partir de P(xi ,yi)
    
    p_x_y_prompt() //on appelle cette fct pour recuperer P(xi ,yi)

    for(i=0;i<N;i++){
        px=0
        py=0
        for(j=0;j<M;j++){
            if(i==0) {
                PY[j]=0
            }
            PY[j] = PY[j] + PXY[i][j]
            px = px + PXY[i][j]
        }
        PX[i]= px
    }

}
function calcule_p_x_sch_y() { //cette fonction est utilisé pour calculer les probabilités conditionnelles P( x | y ) a partir de P(xi ,yi) et P(yi) avec Bayas
    
    //creation d'une matrice centenant les probabilités conditionnelles
    for(i=0;i<N;i++){
        PXY_X_Y[i] = []
        for(j=0;j<M;j++){
            PXY_X_Y[i][j] = PXY[i][j]/PY[j]
        }
    }

}
function calcule_p_y_sch_x() { //cette fonction est utilisé pour calculer les probabilités conditionnelles P( y | x ) a partir de P(xi ,yi) et P(xi) avec Bayas
    
    //creation d'une matrice centenant les probabilités conditionnelles
    for(i=0;i<N;i++){
        PXY_Y_X[i] = []
        for(j=0;j<M;j++){
            PXY_Y_X[i][j] = PXY[i][j]/PX[i]
        }
    }

}
function calcule_pxy(){ //cette fonction est utilisé pour calculer les probabilités conjointe P(x , y) a partir de P(x | y) ou P(y | x)  et P(yj) ou P(xi) avec Bayas
    j=0
    while(condition != 1 && condition != 2 ){condition = eval(prompt("Avec quelles probabilités voulez-vous calculer les probabilités conjointes?:\n 1- P(x | y) et P(y)\n 2- P(y | x)  et P(x)"))}
    for(i=0;i<N;i++){
        PXY[i] = []
        for(j=1;j<M;j++){
            if(condition==1) {
                py_prompt()
                p_x_sch_y_prompt()
                PXY[i][j] = (PXY_X_Y[i][j])*(PY[i])
            }
            else {
                px_prompt()
                p_y_sch_x_prompt()
                PXY[i][j] = (PXY_Y_X[i][j])*(PX[i])
            }
        }
    }
}


//******************************les fonctions de calcule******************************/

function entropieX() { //la fonction qui calcule l'entropie H(X)
    hx = 0

    gettingSize() //récuperer la taille de la source X
    
    while(condition != 1 && condition != 2 ){condition = eval(prompt('Voulez-vous calculer H(X) utilisant:\n 1- P(x)\n 2- P(x ,y)'))}

    if(condition==1){
        px_prompt() //demander l'utilisateur a entrer les probabilité P(xi)
    }
    else {
        calcule_px_py() //calculer les probabilités P(x) a partir de P(x ,y)
    }
    
    for(i=0;i<N;i++){ //le calcule de H(X)
        if(PX[i]!=0){hx = hx + (PX[i]*Math.log2(1/PX[i]))}
    }
    
    condition =0
    return hx.toFixed(3)
}
function entropieY() { //la fonction qui calcule l'entropie H(Y)
    hy=0

    gettingSize() //récuperer la taille de la source Y
    
    
    while(condition != 1 && condition != 2){condition = eval(prompt('Voulez-vous calculer H(Y) utilisant:\n 1- P(y)\n 2- P(x , y)'))}

    if(condition==1){
        py_prompt() //demander l'utilisateur a entrer les probabilité P(y)
    }
    else {
        calcule_px_py() //calculer les proba P(x) a partir de P(x ,y)
    }

    for(i=0;i<M;i++){
        if(PY[i]!=0){hy = hy + (PY[i]*Math.log2(1/PY[i]))}
    }

    condition =0
    return hy.toFixed(3)
}
function cntt_info(){ //la fonction qui calcule la quantité d'information mutuelle I(X, Y)
    ixy = 0;

    gettingSize()
    calcule_px_py() //recuperer les probabilités conjointes P( x , y ) et P(y) P(x)
    
    //calcule
    for(i=0;i<N;i++){
        for(j=0;j<M;j++){
            if(PXY[i][j] != 0) {ixy = ixy + (PXY[i][j]*Math.log2(PXY[i][j]/(PX[i]*PY[j])))}
            
        }
    }

    return ixy
}
function Hconjointe() { //la fonction qui calcule l'entropie conjointe H(X , Y)
    hxy = 0
    gettingSize()
    
    while(condition != 1 && condition != 2){condition = eval(prompt('Voulez-vous calculer l\'entropie mutuel utilisant:\n 1- P(x , y)\n 2- H(X) et H(Y) et I(X , Y)'))}
    
    if(condition == 1){
        p_x_y_prompt()  //recupération des probabilités conjointes P( x , y )

        for(i=0;i<N;i++){ //le calcule
            for(j=0;j<M;j++){
                if(PXY[i][j] != 0){hxy = hxy + PXY[i][j]*Math.log2(1/PXY[i][j])}
            }
        }
    }
    else {
        
        while(hx==null){hx = eval(prompt('Entrer la valeur de l\'entropie H(X): '))} //recuperation de l'entropie H(X)
        while(hy==null){hy = eval(prompt('Entrer la valeur de l\'entropie H(Y): '))} //recuperation de l'entropie H(Y)
        while(ixy==null){ixy = eval(prompt('Entrer la valeur de la quantité d\'information I(X , Y): '))} //recuperation de la quantité d'information I(X , Y)
        
        hxy = hx + hy - ixy //le calcule
    }

    condition =0
    return hxy
}
function Hcond_X_Y(){ //la fonction qui calcule l'entropie conditionnelle H(X | Y)
    h_x_y = 0
    gettingSize()

    while(condition != 1 && condition != 2){condition = eval(prompt('Voulez-vous calculer H(X | Y) utilisant:\n 1- P(x | y) et P(y)\n 2- P(x ,y)'))}

    if(condition == 1){
        py_prompt() //recuperation des probabilités P(y)
        p_x_sch_y_prompt() //recuperation des probabilités conditionnelles P( x | y )
    }
    else {
        calcule_px_py() //calcule des probabiltés P(y)
        calcule_p_x_sch_y() //calcule des probabilités P(x | y)
    }

    //calcule
    for(i=0;i<N;i++){
        for(j=0;j<M;j++){
            if(PXY_X_Y[i][j] != 0){h_x_y = h_x_y + (PY[i]*PXY_X_Y[i][j]*Math.log2(1/PXY_X_Y[i][j]))}
        }
    }

    condition =0
    return h_x_y.toFixed(3)
}
function Hcond_Y_X(){ //la fonction qui calcule l'entropie conditionnelle H(Y | X)
    h_y_x = 0
    gettingSize()
    while(condition != 1 && condition != 2){condition = eval(prompt('Voulez-vous calculer H(Y | X) utilisant:\n 1- P(y | x) et P(x)\n 2- P(x ,y)'))}

    if(condition == 1){
        px_prompt() //recuperation des probabilités P(x)
        p_y_sch_x_prompt() //recuperation des probabilités conditionnelles P(y | x)
    }
    else {
        calcule_px_py() //calcule des probabiltés P(x)
        calcule_p_y_sch_x() //calcule des probabilités P(y | x)
    }
    //calcule
    for(i=0;i<N;i++){
        for(j=0;j<M;j++){
            if(PXY_Y_X[i][j] != 0){h_y_x = h_y_x + (PX[i]*PXY_Y_X[i][j]*Math.log2(1/PXY_Y_X[i][j]))}
        }
    }

    condition =0
    return h_y_x.toFixed(3)
}

//*****************************l'affichage des résultats*****************************/

//un event listener qui sera appelé chaque fois que l'utilisateur choisit une fonction pour calculer 
document.querySelector('.options').addEventListener('click', (e) => {
    

    switch(e.target.id){ //un switch case pour attribuer un nombre basé sur la fonction choisie par l'utilisateur  
        case "hx":
            option = 1
            break;
        case "hy":
            option = 2
            break;
        case "ixy":
            option = 3
            break;
        case "hxy":
            option = 4
            break;
        case "x-y":
            option = 5
            break;
        case "y-x":
            option = 6
            break;
    }
    
    switch(option){ //un autre switch case pour affichier la résultat pour afficher les résultats basé sur la fonction choisie par l'utilisateur 
        case 1 :
            results.innerHTML = 'H(X) = <span>'+hx.toFixed(3)+'</span> bits/symbole'
            break;
        case 2 :
            results.innerHTML = 'H(Y) = <span>'+hy.toFixed(3)+'</span> bits/symbole'
            break;
        case 3 :
            results.innerHTML = 'I(X, Y) = <span>'+ixy.toFixed(3)+'</span> bits/symbole'
            break;
        case 4 :
            results.innerHTML = 'H(X, Y) = <span>'+hxy.toFixed(3)+'</span> bits/symbole'
            break;
        case 5 :
            results.innerHTML = 'H(X | Y) = <span>'+h_x_y.toFixed(3)+'</span> bits/symbole'
            break;
        case 6 :
            results.innerHTML = 'H(Y | X) = <span>'+h_y_x.toFixed(3)+'</span> bits/symbole'
            break;
    }
    
})