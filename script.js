function selectChoice(choice) {
    if (choice === 1) {
        var singleChoice = prompt("Taper 1 pour calculer l'entropie\nTaper 2 pour calculer I(xi)\nTaper 3 pour les deux");
        if (singleChoice === "1") {
            calculateEntropy();
        } else if (singleChoice === "2") {
            calculateInformation();
        } else if (singleChoice === "3") {
            calculateBoth();
        } else {
            alert("Choix invalide !");
        }
    } else if (choice === 2) {
        
let double = parseInt(prompt("Tappez 1 pour calculer l'entropie de la 1ere source \nTappez 2 pour calculer l'entropie de la 2eme source \nTappez 3 Pour calculer l'entropies des deux sources \nSi vous voulez calculer l'entropie conjointe tappez 4\n si vous voulez calculer l'entropie conditionnel tappez 5 \nTappez 6 pour calculer la quantité d'information "));

if (double === 1) {
let n = parseInt(prompt("Donnez la taille de la source X : "));
let probabilitiesX = [];
for (let i = 0; i < n; i++) {
    while (true) {
        let prob = parseFloat(prompt("Entrer la probabilité pour la source X : "));
        if (0 < prob && prob < 1 && (probabilitiesX.reduce((a, b) => a + b, 0) + prob) <= 1) {
            probabilitiesX.push(prob);
            break;
        } else {
            alert("Entrez un nombre positif et inférieur à 1 et que la somme des probabilités ne dépasse pas 1.");
        }
    }
}

let entropyX = calculateEntropy(probabilitiesX);
console.log("H(X) = ", entropyX);
}
if (double === 2) {
let n = parseInt(prompt("Donnez la taille de la source Y : "));
let probabilitiesY = [];
for (let i = 0; i < n; i++) {
    while (true) {
        let prob = parseFloat(prompt("Entrer la probabilité pour la source Y : "));
        if (0 < prob && prob < 1 && (probabilitiesY.reduce((a, b) => a + b, 0) + prob) <= 1) {
            probabilitiesY.push(prob);
            break;
        } else {
            alert("Entrez un nombre positif et inférieur à 1 et que la somme des probabilités ne dépasse pas 1.");
        }
    }
}

let entropyY = calculateEntropy(probabilitiesX);
console.log("H(Y) = ", entropyY);
}
if (double == 3) {
let n = parseInt(prompt("Donnez la taille de la source X : "));
let probabilitiesX = [];
for (let i = 0; i < n; i++) {
    while (true) {
        let prob = parseFloat(prompt("Entrer la probabilité pour la source X : "));
        if (0 < prob && prob < 1 && (probabilitiesX.reduce((a, b) => a + b, 0) + prob) <= 1) {
            probabilitiesX.push(prob);
            break;
        } else {
            alert("Entrez un nombre positif et inférieur à 1 et que la somme des probabilités ne dépasse pas 1.");
        }
    }
}

let entropyX = calculateEntropy(probabilitiesX);
console.log("H(X) = ", entropyX);
}
let m = parseInt(prompt("Donnez la taille de la source Y : "));
let probabilitiesY = [];
for (let i = 0; i < m; i++) {
    while (true) {
        let prob = parseFloat(prompt("Entrer la probabilité pour la source Y : "));
        if (0 < prob && prob < 1 && (probabilitiesY.reduce((a, b) => a + b, 0) + prob) <= 1) {
            probabilitiesY.push(prob);
            break;
        } else {
            alert("Entrez un nombre positif et inférieur à 1 et que la somme des probabilités ne dépasse pas 1.");
        }
    }
}

let entropyY = calculateEntropy(probabilitiesX);
console.log("H(Y) = ", entropyY);
if (double == 4 ){
    const readline = require('readline');

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

function calculateEntropy(probabilities) {
let entropy = 0;
for (let p of probabilities) {
entropy -= p * Math.log2(p);
}
return entropy;
}

rl.question("Donnez la taille de la source X : ", (n) => {
let P_xi = [];
(function getInputX(counter) {
if (counter < n) {
    rl.question("Entrer la probabilité pour la source X : ", (L) => {
        L = parseFloat(L);
        if (0 < L && L < 1 && (P_xi.reduce((a, b) => a + b, 0) + L) <= 1) {
            P_xi.push(L);
            getInputX(counter + 1);
        } else {
            console.log("Entrez un nombre positif et inférieur à 1 et que la somme des probabilités ne dépasse pas 1.");
            getInputX(counter);
        }
    });
} else {
    let H_x = calculateEntropy(P_xi);
    console.log("H(X) = ", H_x);

    rl.question("Donnez la taille de la source Y : ", (m) => {
        let P_yi = [];
        (function getInputY(counterY) {
            if (counterY < m) {
                rl.question("Entrer la probabilité pour la source Y : ", (L1) => {
                    L1 = parseFloat(L1);
                    if (0 < L1 && L1 < 1 && (P_yi.reduce((a, b) => a + b, 0) + L1) <= 1) {
                        P_yi.push(L1);
                        getInputY(counterY + 1);
                    } else {
                        console.log("Entrez un nombre positif et inférieur à 1 et que la somme des probabilités ne dépasse pas 1.");
                        getInputY(counterY);
                    }
                });
            } else {
                console.log("voici Les variables de la source Y :");
                console.log(P_yi);
                let H_y = calculateEntropy(P_yi);
                console.log("H(Y) = ", H_y);
                let lst = [];
                let H_XY1 = 0;
                let matrice = [];
                rl.question("Taper 1 si c'est deux source sont indepandantes et 0 si elles sont depandante :", (rep) => {
                    if (rep === '1') {
                        console.log("vous avez choisi une souce indepandante");
                        let H_XY = H_x + H_y;
                        console.log("H(x,y)=");
                        console.log(H_XY);
                    } else {
                        console.log("Vous avez choisi une source depandante");
                    }
                    (function getJointProbabilities(i) {
                        if (i < n) {
                            (function loopThroughY(j) {
                                if (j < m) {
                                    rl.question("Entrer la probabilité conjointe : ", (L2) => {
                                        L2 = parseFloat(L2);
                                        if (0 < L2 && L2 < 1 && (lst.reduce((a, b) => a + b, 0) + L2) <= 1) {
                                            lst.push(L2);
                                            H_XY1 -= L2 * Math.log2(L2);
                                            matrice.push(lst);
                                            loopThroughY(j + 1);
                                        } else {
                                            console.log("Entrez un nombre positif et inférieur à 1 et que la somme des probabilités ne dépasse pas 1.");
                                            loopThroughY(j);
                                        }
                                    });
                                } else {
                                    getJointProbabilities(i + 1);
                                }
                            })(0);
                        } else {
                            console.log("voici Les variables conjoite :");
                            console.log(matrice);
                            console.log("H(Y,X) = ", H_XY1);
                            rl.close();
                        }
                    })(0);
                });
            }
        })(0);
    });
}
})(0);
});

}

}if (choice == 5) {
const readline = require('readline');

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

function calculateEntropy(probabilities) {
let entropy = 0;
for (let p of probabilities) {
entropy -= p * Math.log2(p);
}
return entropy;
}

rl.question("Donnez la taille de la source X : ", (n) => {
let P_xi = [];
(function getInputX(counter) {
if (counter < n) {
    rl.question(`Entrer la probabilité pour la source X ${counter + 1}: `, (L) => {
        L = parseFloat(L);
        if (0 <= L && L <= 1 && (P_xi.reduce((a, b) => a + b, 0) + L) <= 1) {
            P_xi.push(L);
            getInputX(counter + 1);
        } else {
            console.log("Entrez un nombre positif et inférieur à 1 et que la somme des probabilités ne dépasse pas 1.");
            getInputX(counter);
        }
    });
} else {
    console.log("Voici Les variables de la source X :");
    console.log(P_xi);

    let H_x = calculateEntropy(P_xi);
    console.log(`Voici H(X) : ${H_x}`);

    rl.question("Donnez la taille de la source Y : ", (m) => {
        let matrix_data = [];
        for (let i = 0; i < n; i++) {
            let row = [];
            for (let j = 0; j < m; j++) {
                row.push(0);
            }
            matrix_data.push(row);
        }

        (function fillMatrix(i) {
            if (i < n) {
                (function loopThroughY(j) {
                    if (j < m) {
                        rl.question(`Entrez la valeur pour la ligne ${i + 1}, colonne ${j + 1} : `, (value) => {
                            value = parseFloat(value);
                            if (0 <= value && value <= 1) {
                                matrix_data[i][j] = value;
                                loopThroughY(j + 1);
                            } else {
                                console.log("Entrez un nombre positif et inférieur à 1.");
                                loopThroughY(j);
                            }
                        });
                    } else {
                        fillMatrix(i + 1);
                    }
                })(0);
            } else {
                let matrix = matrix_data.map(row => row.map(val => parseFloat(val)));
                console.log("P(Y/X) :");
                console.log(matrix);

                let H_YX = 0;
                for (let i = 0; i < matrix.length; i++) {
                    for (let j = 0; j < matrix[0].length; j++) {
                        if (matrix[i][j] !== 0) {
                            H_YX -= matrix[i][j] * Math.log2(matrix[i][j]);
                        }
                    }
                }
                console.log(`L'entropie H(Y/X) est : ${H_YX}`);

                let P_ji = new Array(m).fill(0);

                for (let i = 0; i < m; i++) {
                    for (let j = 0; j < n; j++) {
                        P_ji[i] += matrix[j][i] * P_xi[j];
                    }
                }
                console.log("Voici P(i,j) : ");
                console.log(P_ji);

                let H_IJ = 0;
                for (let i = 0; i < matrix.length; i++) {
                    for (let j = 0; j < matrix[0].length; j++) {
                        if (matrix[i][j] !== 0) {
                            H_IJ -= matrix[i][j] * Math.log2(matrix[i][j]);
                        }
                    }
                }
                console.log(`L'entropie H(X,Y) est : ${H_IJ}`);

                rl.close();
            }
        })(0);
    });
}
})(0);
});

}if (choice == 6) {
const readline = require('readline');

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

function calculateEntropy(probabilities) {
let entropy = 0;
for (let p of probabilities) {
entropy -= p * Math.log2(p);
}
return entropy;
}

rl.question("Tappez 1 pour une source dependante \nTappez 2 pour une source independante : ", (hello) => {
if (hello === '1') {
rl.question("Donnez la taille de la source X : ", (n) => {
    let P_xi = [];
    (function getInputX(counter) {
        if (counter < n) {
            rl.question("Entrer la probabilité pour la source X : ", (L) => {
                L = parseFloat(L);
                if (0 < L && L < 1 && (P_xi.reduce((a, b) => a + b, 0) + L) <= 1) {
                    P_xi.push(L);
                    getInputX(counter + 1);
                } else {
                    console.log("Entrez un nombre positif et inférieur à 1 et que la somme des probabilités ne dépasse pas 1.");
                    getInputX(counter);
                }
            });
        } else {
            let H_x = calculateEntropy(P_xi);
            console.log("H(X) = ", H_x);

            rl.question("Donnez la taille de la source Y : ", (m) => {
                let P_yi = [];
                (function getInputY(counterY) {
                    if (counterY < m) {
                        rl.question("Entrer la probabilité pour la source Y : ", (L1) => {
                            L1 = parseFloat(L1);
                            if (0 < L1 && L1 < 1 && (P_yi.reduce((a, b) => a + b, 0) + L1) <= 1) {
                                P_yi.push(L1);
                                getInputY(counterY + 1);
                            } else {
                                console.log("Entrez un nombre positif et inférieur à 1 et que la somme des probabilités ne dépasse pas 1.");
                                getInputY(counterY);
                            }
                        });
                    } else {
                        console.log("voici Les variables de la source Y :");
                        console.log(P_yi);
                        let H_y = calculateEntropy(P_yi);
                        console.log("H(Y) = ", H_y);
                        let lst = [];
                        let H_XY1 = 0;
                        let matrice = [];
                        rl.question("Vous avez choisi une source depandante. Entrer la probabilité conjointe : ", (L2) => {
                            L2 = parseFloat(L2);
                            if (0 < L2 && L2 < 1 && (lst.reduce((a, b) => a + b, 0) + L2) <= 1) {
                                lst.push(L2);
                                H_XY1 -= L2 * Math.log2(L2);
                                matrice.push(lst);
                                console.log("voici Les variables conjoite :");
                                console.log(matrice);
                                console.log("H(Y,X) = ", H_XY1);
                                rl.close();
                            } else {
                                console.log("Entrez un nombre positif et inférieur à 1 et que la somme des probabilités ne dépasse pas 1.");
                                rl.close();
                            }
                        });
                    }
                })(0);
            });
        }
    })(0);
});
} else {
console.log("I(X;Y) = 0 ");
rl.close();
}
});

}
     else {
        alert("Choix invalide !");
    }
}

function calculateEntropy() {
    var n = prompt("Donnez la taille de la source : ");
    var probabilities = [];
    for (var i = 0; i < n; i++) {
        while (true) {
            var probability = parseFloat(prompt("Donnez la probabilité : "));
            if (probability > 0 && probability < 1 && sumArray(probabilities) + probability <= 1) {
                probabilities.push(probability);
                break;
            } else {
                alert("Entrez un nombre positif inférieur à 1, la somme des probabilités ne doit pas dépasser 1.");
            }
        }
    }
    var entropy = calculateEntropyValue(probabilities);
    displayResult(probabilities, entropy, null);
}

function calculateInformation() {
var n = prompt("Donnez la taille de la source : ");
var probabilities = [];
for (var i = 0; i < n; i++) {
    while (true) {
        var probability = parseFloat(prompt("Donnez la probabilité : "));
        if (probability > 0 && probability < 1 && sumArray(probabilities) + probability <= 1) {
            probabilities.push(probability);
            break;
        } else {
            alert("Entrez un nombre positif inférieur à 1, la somme des probabilités ne doit pas dépasser 1.");
        }
    }
}
var information = [];
for (var j = 0; j < probabilities.length; j++) {
    information.push(-Math.log2(probabilities[j]));
}
displayResult(probabilities, null, information);
}

function calculateBoth() {
var n = prompt("Donnez la taille de la source : ");
var probabilities = [];
for (var i = 0; i < n; i++) {
    while (true) {
        var probability = parseFloat(prompt("Donnez la probabilité : "));
        if (probability > 0 && probability < 1 && sumArray(probabilities) + probability <= 1) {
            probabilities.push(probability);
            break;
        } else {
            alert("Entrez un nombre positif inférieur à 1, la somme des probabilités ne doit pas dépasser 1.");
        }
    }
}
var entropy = calculateEntropyValue(probabilities);
var information = [];
for (var j = 0; j < probabilities.length; j++) {
    information.push(-Math.log2(probabilities[j]));
}
displayResult(probabilities, entropy, information);
}


function sumArray(arr) {
    return arr.reduce((a, b) => a + b, 0);
}

function calculateEntropyValue(probabilities) {
    var entropy = 0;
    for (var i = 0; i < probabilities.length; i++) {
        entropy -= probabilities[i] * Math.log2(probabilities[i]);
    }
    return entropy;
}  function displayResult(probabilitiesArray, entropy, information) {
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<h4>Résultat :</h4>";
    for (var i = 0; i < probabilitiesArray.length; i++) {
        resultDiv.innerHTML += "<p>Les probabilités " + (i + 1) + " : " + probabilitiesArray[i] + "</p>";
    }
    if (entropy !== null) {
        resultDiv.innerHTML += "<p>La valeur de L'Entropie : " + entropy + "</p>";
    }
    if (information !== null) {
        resultDiv.innerHTML += "<p>La quantité d'information : " + information + "</p>";
    }
}
