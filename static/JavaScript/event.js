CreateEvent = (parameters) => {
    Waiting= "Waiting for player";
    for (let tr = 0; tr < parameters.columns; tr++) {
        let TR = document.querySelector('#tr' + tr);
        TR.addEventListener("mouseover", function () {
            if(Waiting !== (divPlayer_2.textContent)){
                td = ArrayLocation(tr, parameters.arrGame, parameters.rows);
                parameters.color = ColorPlayer(parameters.Player);
                PlayerColorChangeMouseover(td, tr, parameters.color, parameters.rows, parameters.victory, parameters.Player, parameters.active);
            }
        });
        TR.addEventListener("mouseout", function () {
            if(Waiting !== (divPlayer_2.textContent)){
                td = ArrayLocation(tr, parameters.arrGame, parameters.rows);
                PlayerColorChangeMouseover(td, tr, "white", parameters.rows, parameters.victory,parameters.Player, parameters.active);
            }
        });
        TR.addEventListener('click', function () {
            if(Waiting !== (divPlayer_2.textContent)){
                td = ArrayLocation(tr, parameters.arrGame, parameters.rows);
                PointColoring(td, tr, parameters);
            }
        });
    }
}



PlayerColorChange = (td, tr,parameters) =>{
    parameters.color = ColorPlayer(parameters.active);
    document.getElementById("tr" + tr + "td" + td).style.background = parameters.color;
    parameters.arrGame[td][tr] = parameters.color; 
}


PlayerColorChangeMouseover = (tr, td, color, row, victory, Player, active) => {
    if(victory && tr < row &&  Player == active) {
    document.getElementById("tr" + td + "td" + tr).style.background = color;
    }  
}

ViewName = (name) => {
    if(name == ""){
        SetCookie("name2" + window.location.pathname, "Palyer-2", 30);
        divPlayer_2.textContent = "Palyer-2";
    }else{
        SetCookie("name2" + window.location.pathname, name, 30);
        divPlayer_2.textContent = name;
    }
    divInput.classList.add('remove');
    casingName_2.classList.remove('remove');  
}

PointColoring = (td, tr, parameter) => {
    if (parameter.victory && td < parameter.rows && parameter.Player == parameter.active) {
        PlayerColorChange(td, tr,parameter);
        TestGame(td, tr, parameter);
        if ((td + 1) == parameter.rows) {
            parameter.lastModifiedMounter++;
        };
        SendNewInfoTurn(parameter, tr, td);
        if(Stalemate(parameter.lastModifiedMounter, parameter.columns, parameter.rows)){
            if(parameter.victory){
                parameter.active = NextPlayer(parameter.victory , parameter.Player);  
                GameBoardUpdate(parameter); 
            } 
        }   
    }       
} 


SetActivePlayer = () => {
    document.querySelector('.wrapper-1').classList.toggle('active');
    document.querySelector('.wrapper-2').classList.toggle('not-active');
    document.querySelector('.wrapper-1').classList.toggle('not-active');
    document.querySelector('.wrapper-2').classList.toggle('active');
}

NextPlayer = (victory, Player) => {
    if (victory !== false ) { 
        SetActivePlayer(); 
        if(Player == 2) return 1;
        return 2;
    }      
}

EventEnter = (event) =>  {
    var x = event.which || event.keyCode; 
    if (x == 13) {
        SaveName()
    }
}

EnterNewRoom = (event) => {
    var x = event.which || event.keyCode; 
    if (x == 13) {
        NewRoom()
    }
}

