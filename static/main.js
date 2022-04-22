//Prepend Navbar (using innerHTML because there's no escaped input)
const header = document.createElement("header");
header.innerHTML = 
  `<nav class="nav" id="hide">
  <div class="nav-icon">
    <a href="/"><img class="small-nav-icon" src="/uv.png" alt="Ultraviolet"></a>
  </div>
  <div class="nav-items">
    <span class="nav-item"><a href="/" target="_top">Home</a></span>
  </div>
</nav>`;
document.body.prepend(header);
header.id = "hide";

document.onclick = hideMenu;
document.oncontextmenu = rightClick;
  
function hideMenu() {
    document.getElementById("contextMenu")
            .style.display = "none"
}

function rightClick(e) {
    e.preventDefault();

    if (document.getElementById("contextMenu")
            .style.display == "block")
        hideMenu();
    else{
        var menu = document.getElementById("contextMenu")

        menu.style.display = 'block';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
    }
}

function histhide(){
  if (localStorage.getItem("hide") === "on"){
    localStorage.setItem("hide", "off");
  } 
  else {
    localStorage.setItem("hide", "on")
  }
  buttoncheck();
}

function buttoncheck(){
  if (localStorage.getItem("hide") === "on"){
    document.getElementById("histhidebutton").style.background="#da3371";
  } 
  else {
    document.getElementById("histhidebutton").style.background="#303030";
  }
}