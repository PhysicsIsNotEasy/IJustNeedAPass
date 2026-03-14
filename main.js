
const ua = navigator.userAgent;
localStorage.setItem("userAgent", ua);

const commentsRequest = fetch("https://jsonplaceholder.typicode.com/posts/22/comments");

let html = null;
let themeToggleBtn = null;
let contactsModal = null;
let themeOverriden = false;

document.addEventListener("DOMContentLoaded", async () => 
{
    html = document.querySelector("html");
    themeToggleBtn = document.getElementById("theme-toggle-button");
    contactsModal = document.getElementById("contacts-modal");

    setTimeout(() => {
        contactsModal.showModal();
    }, 60 * 1000)

    themeToggleBtn.addEventListener('click', (event) => 
    {
        themeOverriden = true;
        
        if(html.getAttribute('data-theme') == "light") 
        {
            setTheme("dark");
            return;
        }

        setTheme("light");
    })

    const theme = chooseTheme();
    setTheme(theme);

    setInterval(() => 
        {
            if(themeOverriden) 
            {
                return;
            }
            setTheme(chooseTheme());
        }, 60 * 1000);

    const osInfo = document.getElementById("os-info");

    osInfo.textContent = ua;

    const response = await commentsRequest;

    const comments = await response.json();

    fillComments(comments);
})

function fillComments(comments) 
{
    const reviews = document.getElementById("reviews");

    for(let comment of comments) 
    {
        reviews.appendChild(makeComment(comment));
    }
}

function makeComment(comment)
{
    const commentElement = document.createElement('div');
    commentElement.classList.add("reviews-item")
    
    const name = document.createElement("h4");
    name.textContent = comment.name;
    name.classList.add("reviews-item-name");
    const email = document.createElement("h4");
    email.textContent = comment.email;
    email.classList.add("reviews-item-email");
    const body = document.createElement("p");
    body.textContent = comment.body;
    body.classList.add("reviews-item-body");

    commentElement.appendChild(name);
    commentElement.appendChild(email);
    commentElement.appendChild(body)

    return commentElement;
}

function setTheme(theme) 
{
    html.setAttribute("data-theme", theme);
    themeToggleBtn.textContent = theme;
}

function chooseTheme() 
{
    const hours = new Date().getHours();

    if( hours > 7 && hours < 21) 
    {
        return "light";
    }

    return "dark";
}




