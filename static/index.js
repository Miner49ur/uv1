const form = document.querySelector('form');
const input = document.querySelector('input');
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("url") != null) {
  makeloader()
  document.getElementsByTagName("input")[0].value = urlParams.get("url");
  window.navigator.serviceWorker.register('./sw.js', {
    scope: __uv$config.prefix
  }).then(() => {
    let url = input.value.trim();
    if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
    else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;
    window.history.replaceState("object or string", "Title", "/"+window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
    load(url);
  });
}

form.addEventListener('submit', async event => {
    makeloader()
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;
        load(url)
    });
});

function load(url){
  let hide = localStorage.getItem("hide");
  if (hide === 'on'){
    document.getElementById("particles-js").style.display='none';
    var elms = document.querySelectorAll("[id='hide']");
    for(var i = 0; i < elms.length; i++) 
      elms[i].style.display='none';
    const frame = document.querySelector('.access-frame');
    frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
    frame.style.display = 'block';
    document.querySelector('.access-panel').style.removeProperty('display');
  }
  else{
    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
  }
}

function isUrl(val = ''){
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
};

function makeloader(){
  //Prepend Loader
  const loader = document.createElement("loader");
  loader.innerHTML = 
  `<div id="loader-wrapper">
    <div id="loader"></div>
 
    <div class="loader-section section-left"></div>
    <div class="loader-section section-right"></div>
</div>`;
  document.body.prepend(loader);
}

function removeLoader(){
  document.getElementById("loader-wrapper").style.display='none';
}
