TestGame = (td, tr, parameter) => {
    var victorySequence= [];
    arrtestingDirection = [1, 1, -1, -1, -1, 1, 1, -1, 0, 1, 0, -1, 1, 0, -1, 0];
    for (let i = 0; i < 16; i = i + 4) {
        victorySequence[0] = [td, tr];
        victorySequence = TestCondition(arrtestingDirection[i], arrtestingDirection[i + 1], parameter,victorySequence, td, tr);
        victorySequence = TestCondition(arrtestingDirection[i + 2], arrtestingDirection[i + 3], parameter,victorySequence, td, tr);
        if (victorySequence.length >= parameter.victoryScore) {
            parameter.victory = false;
            ShowVictory(parameter,victorySequence); 
        }
        victorySequence.length = 0    
    }  
}

TestCondition = (testingDirection1, testingDirection2, parameter, victorySequence, td, tr) => {
    let condition = true , condition1 = true ;
    for (let i = 1; i <= (parameter.victoryScore + 1); i++) {
        if (testingDirection1 == 1) {
            condition = (td + i) < parameter.rows;
        } else if (testingDirection1 == -1) {
            condition = (td - i) >= 0;
        }
        if (testingDirection2 == 1) {
            condition1 = (tr + i) < parameter.columns;
        } else if (testingDirection2 == -1) {
            condition1 = (tr - i) >= 0;
        } 
        if (condition && condition1) {
            if (parameter.arrGame[td + (i * testingDirection1)][tr + (i * testingDirection2)] == parameter.color) {
                victorySequence.push([(td + (i * testingDirection1)), (tr + (i * testingDirection2))]);
            }else {
                return victorySequence;
            } 
        }else {
            return victorySequence;
        } 
    }
}

ShowVictory = async (parameter,victoryArray) => { 
    const ArrayVictory = await FunFetch(`${window.location.href}/is-there-a-victory`, victoryArray)
    if(parameter.active == 2){
        document.getElementById("announcing-winner").textContent = 'The winner is ' + divPlayer_2.textContent;
    }else
        document.getElementById("announcing-winner").textContent = 'The winner is ' + parameter.name1;
        
    for( var j = 0 ; j < ArrayVictory.length ; j++){
        document.getElementById("tr" + (ArrayVictory[j][1]) + "td" + (ArrayVictory[j][0])).style.borderColor = "yellow";  
    }   
    ViewPanel();
}

Stalemate = (lastModifiedMounter, column) => {
    if (lastModifiedMounter >= column) {
        document.getElementById("announcing-winner").textContent = "Stalemate"
        document.querySelector('.wrapper-1').classList.remove('not-active');
        document.querySelector('.wrapper-2').classList.remove('not-active');
        document.querySelector('.wrapper-1').classList.add('active');
        document.querySelector('.wrapper-2').classList.add('active');
        ViewPanel();
        return false;
    } else {
        return true;
    }
}  
