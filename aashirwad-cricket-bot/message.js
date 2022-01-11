



var content=document.querySelector(".content");



var url='https://indian-news-live.p.rapidapi.com/news/cricket'




var options = {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'indian-news-live.p.rapidapi.com',
    'x-rapidapi-key': 'cd30dfcf79mshc5798de5bba6226p13e5a6jsnc7b7e12f67aa',
  }
};

async function getapi(url,options){
    const response = await fetch(url,options);
    var data = await response.json();
    
    if (response){
        hideloader();
    }

    show(data);
   
}


getapi(url,options);




function hideloader(){
    content.innerHTML="Loading Content";
}

function show(data){
    let tab =
    `<div>
    
    <p>${Date()}</p>
    
    </div>`;
    for(let r of data){
        tab+=`<div>
        
        <a href=${r.url}><img style="width:40%" src=${r.img} alt="img"></a>
        <br>
        <a href=${r.url} style="color:black; text-decoration:none; background:rgba(0,0,0.5,0.1);padding:0.5rem 0.5rem; border-radius:0.5px" >Source Article at ${r.source}</a>
        <h3>${r.title}</h3>
        
        </div>;
        `
        
    }

    content.innerHTML=tab;
}





    
   