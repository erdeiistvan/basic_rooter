var domElements = {
    mainPage : document.querySelector(".wrapper"),
    pages : Array.from(document.querySelectorAll(".container")),
    menuBtns : Array.from(document.querySelectorAll(".menu-btn"))
};

class Router {
    constructor(name, path) {
        this.name = name,
        this.path = path
    }
    addRouteInfo(element) {
        var routeInfo = element.getAttribute("router-link");
        window.history.pushState({}, "name", routeInfo);
        
    }
    pathfinder() {
        
        var currentPath = window.location.hash.slice(1) || "/";
        var route = Object.values(this.path).filter(function(r){
            return r.path === currentPath;
        });
        if(route.length === 0) {
            alert("The page does not exist!");
        } else {
            var pageToDisplay = Object.values(route)[0].name;
            this.displayPage(domElements.pages, pageToDisplay);
        }
    }
    displayPage(pageArray, page) {
        for(var j = 0; j < pageArray.length; j++) {
            pageArray[j].classList.remove("active");
        }
        page.classList.add("active");
    }
}

var routerData = new Router("myRouter", [ 
    {
        name : domElements.mainPage,
        path : "/"
    },
    {
        name : domElements.pages[0],
        path : "/men"
    },
    {
        name : domElements.pages[1],
        path : "/women"
    },
    {
        name : domElements.pages[2],
        path : "/kids"
    }
]);

for(var i = 0; i < domElements.menuBtns.length; i++) {
    domElements.menuBtns[i].addEventListener("click", function(e){
        routerData.addRouteInfo(this);
        routerData.pathfinder();
    });
}
routerData.pathfinder();
