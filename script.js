//wyszukanie po kliknięciu enter
userInput.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  
        showDefinitions(userInput.value);
        showSynonyms(userInput.value);
        showAntonyms(userInput.value);
    }
});

//wyszukanie po kliknięciu search
btn.addEventListener("click", function(){
    showDefinitions(userInput.value);
    showSynonyms(userInput.value);
    showAntonyms(userInput.value);
});

function showDefinitions(val){
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+val)
    .then(response => response.json())
    .then(data => {
        //tworzenie zmiennej z wszytkimi danymi
        const wordData = data[0];

        //tworzenie zapisu fonetycznego
        let phoneticText;
        if(wordData.phonetic!= undefined){
            phoneticText = wordData.phonetic;
        }
        else{
            phoneticText = "/phonetic notation not found/";
        }
        
        //pobieranie słowa razem z zapisem fonetycznym
        word.innerHTML = wordData.word + '&nbsp '+ phoneticText;
        
        //dodawanie ścieżki z wymową do odnośnika
        pron.removeAttribute("href");
        if_audio.innerHTML = "";
        if(wordData.phonetics[0].audio == ""){
            if_audio.innerHTML = "No audio found";
            
        }
        else{
            pron.setAttribute("href",wordData.phonetics[0].audio);
        }

        //dodawanie ikony do odnośnika
        pron.innerHTML = "<img src=\"speaker.png\" alt=\"speaker\">";
        
        //resetowanie pola
        meanings.innerHTML = "";
        //zmiana do czego są znaczenia
        meanings.innerHTML = "Definitions of " + wordData.word +":";
        
        //resetowanie pola
        meanings_list.innerHTML = "";
        
        //stworzenie divów do poszczególnych znaczeń
        for(let i = 0; i < wordData.meanings.length; i++){
            let creating_h3 = document.createElement("h3");
            creating_h3.innerHTML = wordData.meanings[i].partOfSpeech + ":";
            meanings_list.append(creating_h3);
            for(let j = 0; j < wordData.meanings[i].definitions.length; j++){
                let creating_p = document.createElement("p"); 
                creating_p.innerHTML = wordData.meanings[i].definitions[j].definition;
                meanings_list.append(creating_p);
            }
       
        }
    })
    
}


function showSynonyms(val){
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+val)
    .then(response => response.json())
    .then(data => {
        //tworzenie zmiennej z wszytkimi danymi
        const wordData = data[0];
        
        //resetowanie pola
        synonyms.innerHTML = "";
        //zmiana do czego są znaczenia
        synonyms.innerHTML = "Synonyms for " + wordData.word +":";
        
        //resetowanie pola
        synonyms_list.innerHTML = "";
        
        //stworzenie divów do poszczególnych znaczeń
        for(let i = 0; i < wordData.meanings.length; i++){
            
            for(let j = 0; j < wordData.meanings[i].synonyms.length; j++){
                let creating_p = document.createElement("p"); 
                creating_p.innerHTML = wordData.meanings[i].synonyms[j];
               let f1 = "showDefinitions(\""+wordData.meanings[i].synonyms[j]+"\""+");showSynonyms(\""+wordData.meanings[i].synonyms[j]+"\""+");showAntonyms(\""+wordData.meanings[i].synonyms[j]+"\""+")";
                creating_p.setAttribute("onclick",f1);
               
                
                synonyms_list.append(creating_p);
            }
       
        }
    })
    
}

function showAntonyms(val){
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+val)
    .then(response => response.json())
    .then(data => {
        //tworzenie zmiennej z wszytkimi danymi
        const wordData = data[0];
        
        //resetowanie pola
        antonyms.innerHTML = "";
        //zmiana do czego są znaczenia
        antonyms.innerHTML = "Antonyms for " + wordData.word +":";
        
        //resetowanie pola
        antonyms_list.innerHTML = "";
        
        //stworzenie divów do poszczególnych znaczeń
        for(let i = 0; i < wordData.meanings.length; i++){
            
            for(let j = 0; j < wordData.meanings[i].antonyms.length; j++){
                let creating_p = document.createElement("p"); 
                creating_p.innerHTML = wordData.meanings[i].antonyms[j];
                let f1 = "showDefinitions(\""+wordData.meanings[i].antonyms[j]+"\""+");showSynonyms(\""+wordData.meanings[i].antonyms[j]+"\""+");showAntonyms(\""+wordData.meanings[i].antonyms[j]+"\""+")";
                creating_p.setAttribute("onclick",f1);
                antonyms_list.append(creating_p);
            }
        }
        if(synonyms_list.innerHTML == ""){
            synonyms_list.innerHTML = "No synonyms found";
        }
        if(antonyms_list.innerHTML == ""){
            antonyms_list.innerHTML = "No antonyms found";
        }
    })
    

}


bc.addEventListener("click",function(){
    let currentTheme = theme.getAttribute("href");
    
    if(currentTheme=="style.css"){
        theme.setAttribute("href", "style2.css");
        bc.style.justifyContent = 'flex-end';
    }
    else{
        theme.setAttribute("href", "style.css");
        bc.style.justifyContent = 'flex-start';
    }
   
})

