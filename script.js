const modal =document.querySelector('#modal')
const modalShow =document.querySelector('#show-modal')
const modalClose =document.querySelector('#close-modal')
const bookmarkForm =document.querySelector('#bookmark-form')
const websiteNameEl =document.querySelector('#website-name')
const websiteurl =document.querySelector('#website-url')
const bookmarkContainer =document.querySelector('.container')

let bookmarks = [];

// show model, focus on imput
function showModal () {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}


modalShow.addEventListener('click', showModal)
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));
modalClose.addEventListener('click', () => {
    modal.classList.remove('show-modal');
    websiteNameEl.blur()
})

// vallidate form
function validate (nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (urlValue.match(regex)) {
        
    }
    if (!urlValue.match(regex)) {
        alert("Please, provide a valid email adress!");
        return false;
    }
    return true;
}
// build bookmark
function build() {
    bookmarkContainer.textContent = ''
    bookmarks.forEach((bookmark) => {
        const {name, url} = bookmark;
        // item
        const item = document.createElement('div');
        item.classList.add('item');
        // close icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmarks('${url}')`);

        // favicon
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name')

        const favicon = document.createElement('img');
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt', 'Favicon');
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`);
        link.setAttribute('target', '_blank')
        link.textContent = name;
        // Append all to bookmarkcontainer
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarkContainer.appendChild(item)
    })
}
// fetch bookmark from localstorage
function fetch() {
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    }else {
        // create bookmarks array in localStorage
        bookmarks  = [{
            name: 'hyujlujj',
            url: 'https://jhjukkuuh',
        },]
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    }
    build()
}

// delete bookmark 
function deleteBookmarks (url) {
    bookmarks.forEach((bookmark, i) => {
        if (bookmark.url === url) {
            bookmarks.splice(i, 1)
        }
    });

    // reupdate localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetch()
}

// collect data
function storeBookmark(e){
    e.preventDefault();
    const nameValue = websiteNameEl.value
     let urlValue = websiteurl.value
     if (!nameValue || !urlValue) {
        alert("Please, provide a valid name and email adress!")
        return false
     }
     if (!urlValue.includes('http://', 'https://')) {
         urlValue =  `https://${urlValue}`
     }
    if(!validate(name, urlValue)) {
        return false
    };
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetch();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// form validation
bookmarkForm.addEventListener('submit', storeBookmark)

// on load
fetch();