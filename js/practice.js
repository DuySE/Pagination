// function parseHTMLToJSON() {
//     const data = {
//         "students": [],
//     };
//     const ul = document.getElementsByClassName("student-list")[0];
//     for (let i = 0; i < ul.children.length; i++) {
//         let avatar = ul.children[i].querySelector(".avatar").src;
//         let name = ul.children[i].querySelector("h3").innerHTML;
//         let email = ul.children[i].querySelector(".email").innerHTML;
//         let date = ul.children[i].querySelector(".date").innerHTML;
//         let student = {
//             "avatar": avatar,
//             "name": name,
//             "email": email,
//             "date": date,
//         }
//     }
//     return data.students;
// }

// const students = parseHTMLToJSON();
const studentsPerPage = 10;
const page = 1;

const showPage = (list, page) => {
    list = Array.from(list);
    let start = (page * studentsPerPage) - studentsPerPage;
    let end = start + studentsPerPage;
    if (end > list.length) {
        end = list.length;
    }
    let pageList = list.slice(start, end);
    for (let i = 0; i < list.length; i++) {
        if (!pageList.includes(list[i])) {
            list[i].style.display = "none";
        }
    }
    for (let i = 0; i < pageList.length; i++) {
        pageList[i].style.display = "block";
    }
}

const appendPageLinks = list => {
    let numberOfPages = Math.ceil(list.length / studentsPerPage);
    const wrapperDiv = document.getElementsByClassName("page")[0];
    const paginationDiv = document.createElement("div");
    paginationDiv.className = "pagination";
    wrapperDiv.appendChild(paginationDiv);
    const ul = document.createElement("ul");
    paginationDiv.appendChild(ul);
    for (let i = 1; i <= numberOfPages; i++) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerHTML = i;
        a.addEventListener('click', event => {
            showPage(list, event.target.innerHTML);
            event.target.className = "active";
            let element = ul.querySelectorAll("a");
            for (let i = 0; i < element.length; i++) {
                if (element[i] !== event.target) {
                    element[i].className = "";
                }
            }
        });
        li.appendChild(a);
        ul.appendChild(li);
        ul.querySelector("li").children[0].className = "active";
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    let students = document.getElementsByClassName("student-list")[0];
    for (let i = studentsPerPage; i < students.children.length; i++) {
        students.children[i].style.display = "none";
    }
    appendPageLinks(students.children);
});