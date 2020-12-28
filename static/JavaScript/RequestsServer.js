

NewTab = () => {
    window.open(`${location.href}`) 
}

NewGame = () => {
    window.open(`${origin}`) 
}

SendNewInfoTurn = async (parameter, tr, td) => {
    queueData = {
        id : parameter.id ,
        playerId : parameter.active,
        victory : parameter.victory, 
    }
    queueData.tr = tr;
    queueData.td = td;
    data = FunFetch(`${window.location.href}/new-info-turn`, queueData)
    console.log(data)
}

ViewName2 = async() => {
    const response = await fetch(`${window.location.href}/view-name-2`)
    const name2 = await response.json()
    if(name2 != null){
        ViewName(name2);
        clearInterval(myVar);
    }
}

SaveName = async () => {
    name2 =  document.getElementById("input-name-2").value;
    ViewName(name2)
    FunFetch(`${window.location.href}/save-name-2`, name2)
}

ShareWhatsApp = () => {
    window.open('whatsapp://send?text=' + `${window.location.href}`)
}

ViewPanel = () =>{
    game.classList.remove('remove');
    play.classList.remove('remove');
}


GameBoardUpdate = async (parameter) => {
    var fun = setInterval( async () => {
        console.log("snku")
        const response = await fetch(`${window.location.href}/game-board-update`)
        const data = await response.json();  
        if(data[0] == undefined){
            ViewPanel();
            return;
        } 
        var ture = JSON.parse(data)
        console.log(ture)
        if (idGlobsl != ture.id || idGlobsl > ture.id && arrGame[ture.td][ture.tr] == 0 ){
            if(ture.playerId !== parameter.Player){
                ArrayLocation(ture.tr, parameter.arrGame, parameter.rows);
                PlayerColorChange(ture.td, ture.tr, parameter);
                if ((ture.td + 1) == parameter.rows) {
                    parameter.lastModifiedMounter++;
                }
                if(!true.victory){
                    TestGame(ture.td, ture.tr, parameter);
                    if(true.victory == undefined && parameter.victory){
                        if(Stalemate(parameter.lastModifiedMounter, parameter.columns)){
                            idGlobsl = ture.id
                            parameter.active = NextPlayer(parameter.victory,parameter.active);
                        }
                    }
                }
            }                  
        }
        if(parameter.victory == false) 
            clearInterval(fun);
    },2000);   
}

FullInformationOfTheGame = async (parameter) => {
    const response = await fetch(`${window.location.href}/full-information-of-the-game`)
    const Allture = await response.json()
    if (Allture == [] || undefined == Allture[0]) return;
    for(i=0; i< Allture.length; i++){
        parameter.active = Allture[i].playerId;
        PlayerColorChange(Allture[i].td, Allture[i].tr, parameter);
        idGlobsl = Allture[Allture.length-1].id
        if ((Allture[i].td + 1) == parameter.rows) {
            parameter.lastModifiedMounter++;
        };
        var hasDeadlock = Stalemate(parameter.lastModifiedMounter, parameter.columns);
        if(i !== 0 ){
            SetActivePlayer(); 
        }
    }
    if(!hasDeadlock) return;
    TestGame(Allture[Allture.length-1].td, Allture[Allture.length-1].tr, parameter);
    if(parameter.victory){
        if(parameter.active == Allture[Allture.length-1].playerId ){
            parameter.active = NextPlayer(parameter.victory, parameter.active);
        }  
    }
    if(Allture[Allture.length-1].victory == 1){
        ViewPanel();
    }        
}

PlayerChange = (playingNow) => {
    if(playingNow == 1){
        return 2;
    }
    return 1;
}

StatusFetch = (status) => {
    if (status !== 200) {
        console.log(`Looks like there was a problem. Status code: ${status}`);
        return;
    } 
}

CatchFetch = (error) => {
    if (error == 500) 
        console.log("Fetch error: " + error);
}

CreatTable = async () => {
    const data = await FunFetch(`${window.location.href}/create-new-table`, existingCookie)
    var parameter = JSON.parse(data)
    parameter.active = 1 ;
    parameter.Player =parseInt(CheckCookie(parameter.Player)) 
    if(parameter.Player == 2 && divPlayer_2.textContent == "Waiting for player"){
        divInput.classList.remove('remove');
    }else{
        divInput.classList.add('remove');
        casingName_2.classList.remove('remove');  
    }
    TableCreation(parameter); 
    document.getElementById("name-1").textContent = parameter.name1;
    document.getElementById("Sequence-for-victory").textContent = "Sequence of "+ parameter.victoryScore +" for victory";
    parameter.arrGame = MatrixCreature(parameter.rows,parameter.columns);
    CreateEvent(parameter); 
    FullInformationOfTheGame(parameter);
    if(parameter.victory) GameBoardUpdate(parameter);
}  

FunFetch = async (location, information) =>{
    const response = await fetch(location, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(information),
        cache: "no-cache",
        headers: new Headers({"content-type": "application/json"})
    })
    console.log(location)
    const data = await response.json()
    StatusFetch(response.status)
    CatchFetch(response.status)
    return data
}