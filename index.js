import fetchUserAndUpdateUI from "./pages/user/user.js";
import fetchUsersAndMakeRows from "./pages/users/users.js";
import {root} from "./settings.js"
import {adjustForMissingHash,loadTemplate, renderTemplate,setActiveLink} from "./utils.js"

window.addEventListener("load", async () => {
  const router = new Navigo("/", { hash: true});
  // DO NOT use root when hash is set. Gives some strange URLS
  //const router = new Navigo(root);
  const aboutTemplate = await loadTemplate("pages/about/about.html")
  const mainTemplate = await loadTemplate("pages/main/main.html")
  const userTemplate = await loadTemplate("pages/user/user.html")
  const usersTemplate = await loadTemplate("pages/users/users.html")
  adjustForMissingHash()  //ONLY do this if you have set hash

  router
      .hooks({
          before(done,match){
              setActiveLink("topnav",match.url)
              done()
          }
      })
      .on("/", () => renderTemplate(mainTemplate,"content"))
      .on("/users", ()=> {
          renderTemplate(usersTemplate,"content")
          fetchUsersAndMakeRows()
      })
      .on("/about", () => {
          renderTemplate(aboutTemplate,"content")
      })
      .on("user/:id/", (match) => { //Or destructure ({data}) => {
        renderTemplate(userTemplate,"content")
        fetchUserAndUpdateUI(match.data.id);
      })
    .resolve()

})
