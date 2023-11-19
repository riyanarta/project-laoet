const inputKeyword = document.querySelector('.input-keyword');
const loadingSpinner = document.querySelector('#loadingSearch')
const content = document.querySelector('#content');
let inputVal = '';
inputKeyword.addEventListener('keydown', function(e){
    if(e.key === 'Delete'){
        e.preventDefault();
        inputKeyword.value = inputKeyword.value.slice(0, -7)
        
    }
});
inputKeyword.addEventListener('keyup', async function(e) {
    if(e.keyCode === 13){
        try{
            loadingSpinner.classList.remove('d-none');
            const inputVal = padWithZeros(inputKeyword.value, 7);
            const books = await getBook(inputVal.toUpperCase());
            updateUI(books);
            loadingSpinner.classList.add('d-none');
        }catch(err){
            alert(err);
        }
        setTimeout(() => {
            inputKeyword.value = '';
            setTimeout(() => {
                content.innerHTML = '';
            }, 2000);
        },3000);
    }
    
    
});

function padWithZeros(input) {
    const numericPart = input.replace(/^\D+/g, '');
    const paddedNumericPart = numericPart.padStart(6, '0');
    return input.replace(/\d+/, paddedNumericPart);
}
function getBook(itemcode){
    return fetch(`https://project-laoet.vercel.app/check/${itemcode}`)
    .then(response => {
        if(!response.ok){
            throw new Error(response.statusText);
        } else {
            return response.json();
        }
    })
    .then(response => {
        if(response.Response === "False"){
            throw new Error(response.Error);
        } else {
            return response;
        }
    });
}

function updateUI(books){
    let cards = '';
    books.forEach(el => {
        cards += showBooks(el);
    });
    const booksContainer = document.querySelector('#content');
    booksContainer.innerHTML = cards;
}

function showBooks(m){
    return `
    <div class="col-md-4 my-3">
        <div class="card">
            <div class="card-body">
              <h5 class="card-title">${m.title}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">
              Penulis : ${m.author.replace(/[{}"]/g, '').split(',')}</h6>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary btn-modal" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-itemcode ="${m.itemcode}">Edit Data Biblio</a>
            </div>
          </div>
    </div>
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    `;
}

const pshbtn = document.querySelector('#pushbutton');
pshbtn.addEventListener('click', updateDataNama);
function updateDataNama(){
    const updateData = {
        nama: "Nayir",
        status: "1"
    }

    fetch("https://api.riyanarts.my.id/edit/status/1", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(updateData)
})
    .then(response => {
        console.log("Raw Response:", response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(response => {
        console.log("Success:", response);
    })
    .catch((error) => {
        console.log("Error:", error.message);
    });


}

