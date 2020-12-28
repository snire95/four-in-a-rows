TableCreation = (Parameters) => { 
    var newTable = document.createElement("table"); 
    for (let i = 0 ; i < Parameters.columns ; i++){
        newTable.appendChild(AddTD(Parameters.rows , i));
    }
    game.appendChild(newTable);
}
// נבדק

MatrixCreature = (row, column) => {
    var matrix = [] ;
    for (let j = 0 ; j < row ; j++){
        var arr = [];
        for(let i = 0 ; i < column ; i++){
            arr[i] = 0 ;
        }
        matrix[j] = arr ; 
    }
    return matrix;
} 
// נבדק

AddTD = (row , numTd) => {
    var tr = document.createElement("tr")
    for( let j = 0 ; j < row ; j ++){
        tr.appendChild(AddTR(j , numTd));
        tr.classList.add('column');   
        tr.id = 'tr' + numTd;
    }
    return tr;
}

ArrayLocation = (tr, arrGame, row) => { 
    for (let j = 0; j < row; j++){
        if (arrGame[j][tr] == 0) {
            return j;
        }    
    }     
}
 
AddTR = (numTr , numTd) => {
    var td = document.createElement('td');
    td.classList.add('slot');   
    td.id ='tr' + numTd + 'td' + numTr;
    return td;                                     
}

ColorPlayer = (activePlayer) => {
    if(activePlayer == 2){
        return "blue" ; 
    } else if(activePlayer == 1) {
        return "red";
    }
} 


