export const loadTemplate = async (page) => {
    const resHtml = await fetch(page).then(r => {
        if (!r.ok) {
            throw new Error(`Failed to load the page: ${page}`)
        }
        return r.text()
    });
    const body = document.getElementsByTagName("BODY")[0];
    const div = document.createElement("div");
    div.innerHTML = resHtml;
    body.appendChild(div)
    return div.querySelector("template")
};

export function renderTemplate(template,contentId) {
    const clone = template.content.cloneNode(true);
    const content = document.getElementById(contentId)
    content.innerHTML = "";
    content.appendChild(clone)
}

export function adjustForMissingHash(){

    let path = window.location.hash
    if(path==""){ //Do this only for hash
        path = "#/"
        window.history.pushState({},path, window.location.href + path);
    }
}

/* Sets active element on a div containing a-tags used as a "menu"*/
export function setActiveLink(topnav,activeUrl){
    const links = document.getElementById(topnav).querySelectorAll("a");
    links.forEach(child => {
        child.classList.remove("active")
        //remove leading '/' if any
        if (child.getAttribute("href").replace(/\//, "") === activeUrl) {
            child.classList.add("active")
        }
    })
}