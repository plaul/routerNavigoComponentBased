import{URL} from "../../settings.js"

//Observe - NO need for escaping since we are not using innerHTML
export default function makeRows() {
    fetch(URL).then(r => r.json())
        .then(data => {
            const tbody = document.querySelector("#table-body");
            tbody.innerHTML = ""
            data.forEach((row, i) => {
                const template = document.querySelector('#rows');
                const clone = template.content.cloneNode(true);
                let tds = clone.querySelectorAll("td");
                //tds[0].textContent = row.id
                tds[0].innerHTML = `<a href='#/user/${row.id}'>${row.id}</a>`
                tds[1].textContent = row.name
                tds[2].textContent = row.username
                tbody.appendChild(clone);
            })
        })
}