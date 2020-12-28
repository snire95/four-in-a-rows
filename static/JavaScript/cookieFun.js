SetCookie = (cname,cvalue,exdays) =>  {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
    
GetCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
  
CheckCookie = (activeNotCookie) =>{
    var ActivePlayer = GetCookie("id&Player" + window.location.pathname);
    if (ActivePlayer != "" && ActivePlayer != "undefined") {
        return ActivePlayer
    } else {
        SetCookie("id&Player" + window.location.pathname, activeNotCookie, 30);
        return activeNotCookie
    }
}

CheckCookiename2 = (name2) =>{
    var Name2cookie = GetCookie("name2" + window.location.pathname);
    if (Name2cookie != "" && Name2cookie != "undefined") {
        return Name2cookie
    } else{
        return name2
    }
}

Name2Cookie = () => {
    var name2 = CheckCookiename2("name2" + window.location.pathname)
    var existingCookie = GetCookie("id&Player" + window.location.pathname);
    if("name2" + window.location.pathname == name2 && (existingCookie != "" || existingCookie != "undefined")){
        ViewName2();
    }
    if("name2" + window.location.pathname != name2){
        divPlayer_2.textContent = name2 ;
        divInput.classList.add('remove');
        casingName_2.classList.remove('remove');

    }
    return existingCookie
}