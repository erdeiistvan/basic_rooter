var mainPage = document.querySelector(".wrapper");
var pages = Array.from(document.querySelectorAll(".container"));
var menuBtns = Array.from(document.querySelectorAll(".menu-btn"));

function routerConstructor(name, path) {
    return {
        name: name,
        path: path
    }
};

var routerData = new routerConstructor("router", [
    {
        path: "/",
        name: mainPage
    },
    {
        path: "/men",
        name: pages[0]
    },
    {
        path: "/women",
        name: pages[1]
    },
    {
        path: "/kids",
        name: pages[2]
    }
]);

for(var i = 0; i < menuBtns.length; i++) {
    menuBtns[i].addEventListener("click", addRouteInfo);
    menuBtns[i].addEventListener("click", pathFinder);
}

function getCurrentPath() {
    return window.location.hash.slice(1) || "/";
};

function pathFinder() {
    var currentPath = getCurrentPath();
    var route = Object.values(routerData.path).filter(function(r){
        return r.path === currentPath
    })
    if(route.length === 0) {
        console.log("Error! Route does not exist!");
    } else {
        var pageToShow = Object.values(route)[0].name;
        showPage(pages, pageToShow);
    }
};

pathFinder();

function addRouteInfo() {
    var routeInfo = this.getAttribute("router-link");
    window.history.pushState({}, "name", routeInfo);
};

function showPage(pageArray, page) {
    for(var x = 0; x < pageArray.length; x++) {
        pageArray[x].classList.remove("active");
    }
    page.classList.add("active");
};