const inputRow = document.querySelector('#rows-input');
const inputColumns =  document.querySelector('#columns-input');
const inputVictoryScore = document.querySelector('#victory-score-input');
const inputName_1 =  document.querySelector('#name-1-input');

NewRoom = async () => {
    var parameter = {
        rows : inputRow.value,
        columns : inputColumns.value,
        victoryScore : inputVictoryScore.value,
        name1 :  inputName_1.value,
        victory: true,
        Player : 1,
        lastModifiedMounter : 0
    };
    if(TestInput(parameter)){
        const id = await FunFetch(`${window.origin}/new-room`, parameter)
        window.location.href = `${window.origin}/id/${id}`;
    }
}

TestInput = (parameters) => {
    let err = true;
    if(parameters.rows == "" || parameters.columns == "" || parameters.victoryScore == ""){    
        document.getElementById("fillcells").classList.remove('remove');
        err = false;
    }
    victoryScore = parseInt(parameters.victoryScore)
    columns = parseInt(parameters.columns)
    rows = parseInt(parameters.rows)
    if (rows > 20 || columns > 20) {
        document.getElementById("Row&ColumnLittle20").classList.remove('remove');
        err = false;
    }
    if (rows < 4 || columns < 4) {
        document.getElementById("Row&ColumnBig3").classList.remove('remove');
        err = false;
    }
    if (columns <= victoryScore || rows <= victoryScore || victoryScore <= 3){ 
        document.getElementById("Winlittle").classList.remove('remove');
        err = false;
    }
    return err;
    
}