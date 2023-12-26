
var N , M , i , j , px , py , hx = 0 , hy = 0 , ixy = 0 , hxy = 0 , option , condition , h_x_y = 0 , h_y_x = 0, som_prob = 0;

const results = document.querySelector('.results')

let PX = []  
let PY = []  
let PXY = [] 
let PXY_X_Y = [] 
let PXY_Y_X = [] 

function gettingSize(){ 
    
    N = document.getElementById('x').value 
    
    M = document.getElementById('y').value 

    if(N == '' && M == '') {
        alert('Vous avez oublié de remplir les deux champs du taille des sources!')
    }
    else if(N == '') {
        alert('Vous avez oublié de remplir le champ du taille de la source X!')
    }
    else if(M == '') {
        alert('Vous avez oublié de remplir le champ du taille de la source Y!')
    }
    
    
    
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


function px_prompt(){ 
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
function py_prompt(){ 
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
function p_x_y_prompt(){ 
    
    do{
        PXY = []
        for(i=0;i<N;i++){ 
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
function p_x_sch_y_prompt(){
    for(i=0;i<N;i++){
        PXY_X_Y[i] = []
        for(j=0;j<M;j++){
            while(PXY_X_Y[i][j]==null){PXY_X_Y[i][j] = eval(prompt('Donner la valeur de P(x'+i+' | y'+j+'): '))}
        }
    }
    return PXY_X_Y
}
function p_y_sch_x_prompt(){
    for(i=0;i<N;i++){
        PXY_Y_X[i] = []
        for(j=0;j<M;j++){
            while(PXY_Y_X[i][j]==null){PXY_Y_X[i][j] = eval(prompt('Donner la valeur de P(y'+j+' | x'+i+'): '))}
        }
    }
}
function calcule_px_py(){ 
    
    p_x_y_prompt() 

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
function calcule_p_x_sch_y() { 
    for(i=0;i<N;i++){
        PXY_X_Y[i] = []
        for(j=0;j<M;j++){
            PXY_X_Y[i][j] = PXY[i][j]/PY[j]
        }
    }

}
function calcule_p_y_sch_x() {
    for(i=0;i<N;i++){
        PXY_Y_X[i] = []
        for(j=0;j<M;j++){
            PXY_Y_X[i][j] = PXY[i][j]/PX[i]
        }
    }

}
function calcule_pxy(){ 
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



function entropieX() { 
    hx = 0

    gettingSize() 
    
    while(condition != 1 && condition != 2 ){condition = eval(prompt('Voulez-vous calculer H(X) utilisant:\n 1- P(x)\n 2- P(x ,y)'))}

    if(condition==1){
        px_prompt() 
    }
    else {
        calcule_px_py()
    }
    
    for(i=0;i<N;i++){ //le calcule de H(X)
        if(PX[i]!=0){hx = hx + (PX[i]*Math.log2(1/PX[i]))}
    }
    
    condition =0
    return hx.toFixed(3)
}
function entropieY() { 
    hy=0

    gettingSize() 
    
    while(condition != 1 && condition != 2){condition = eval(prompt('Voulez-vous calculer H(Y) utilisant:\n 1- P(y)\n 2- P(x , y)'))}

    if(condition==1){
        py_prompt() 
    }
    else {
        calcule_px_py() 
    }

    for(i=0;i<M;i++){
        if(PY[i]!=0){hy = hy + (PY[i]*Math.log2(1/PY[i]))}
    }

    condition =0
    return hy.toFixed(3)
}
function cntt_info(){ 
    ixy = 0;

    gettingSize()
    calcule_px_py() 
    
    //calcule
    for(i=0;i<N;i++){
        for(j=0;j<M;j++){
            if(PXY[i][j] != 0) {ixy = ixy + (PXY[i][j]*Math.log2(PXY[i][j]/(PX[i]*PY[j])))}
            
        }
    }

    return ixy
}
function Hconjointe() { 
    hxy = 0
    gettingSize()
    
    while(condition != 1 && condition != 2){condition = eval(prompt('Voulez-vous calculer l\'entropie mutuel utilisant:\n 1- P(x , y)\n 2- H(X) et H(Y) et I(X , Y)'))}
    
    if(condition == 1){
        p_x_y_prompt()  

        for(i=0;i<N;i++){ 
            for(j=0;j<M;j++){
                if(PXY[i][j] != 0){hxy = hxy + PXY[i][j]*Math.log2(1/PXY[i][j])}
            }
        }
    }
    else {
        
        while(hx==null){hx = eval(prompt('Entrer la valeur de l\'entropie H(X): '))} 
        while(hy==null){hy = eval(prompt('Entrer la valeur de l\'entropie H(Y): '))}
        while(ixy==null){ixy = eval(prompt('Entrer la valeur de la quantité d\'information I(X , Y): '))} 
        
        hxy = hx + hy - ixy //
    }

    condition =0
    return hxy
}
function Hcond_X_Y(){ 
    h_x_y = 0
    gettingSize()

    while(condition != 1 && condition != 2){condition = eval(prompt('Voulez-vous calculer H(X | Y) utilisant:\n 1- P(x | y) et P(y)\n 2- P(x ,y)'))}

    if(condition == 1){
        py_prompt() 
        p_x_sch_y_prompt() 
    }
    else {
        calcule_px_py() 
        calcule_p_x_sch_y()
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
function Hcond_Y_X(){ 
    h_y_x = 0
    gettingSize()
    while(condition != 1 && condition != 2){condition = eval(prompt('Voulez-vous calculer H(Y | X) utilisant:\n 1- P(y | x) et P(x)\n 2- P(x ,y)'))}

    if(condition == 1){
        px_prompt() 
        p_y_sch_x_prompt() 
    }
    else {
        calcule_px_py() 
        calcule_p_y_sch_x() 
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




document.querySelector('.options').addEventListener('click', (e) => {
    

    switch(e.target.id){ 
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
    
    switch(option){ 
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