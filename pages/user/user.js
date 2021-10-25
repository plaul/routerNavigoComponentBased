import{URL} from "../../settings.js"

export default function showUser(id) {
    fetch(`${URL}/${id}`)
        .then(r=>r.json())
        .then(data=> document.getElementById("show").innerText = JSON.stringify(data))
}