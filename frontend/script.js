let inputKeyword = document.querySelector('.input-keyword');
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

        // setTimeout(() => {
        //     inputKeyword.value = '';
        //     setTimeout(() => {
        //         content.innerHTML = '';
        //     }, 5000);
        // },5000);
    }
    
    
});




const btnCancel = document.querySelector('#btnCancel');
document.addEventListener('click', (e) => {
    if(e.target.id === 'btnCancel'){
        inputKeyword.value = '';
        content.innerHTML = '';
        inputKeyword.focus();
    }
})

function padWithZeros(input) {
    const numericPart = input.replace(/^\D+/g, '');
    const paddedNumericPart = numericPart.padStart(6, '0');
    return input.replace(/\d+/, paddedNumericPart);
}
function getBook(itemcode){
    return fetch(`https://api.riyanarts.my.id/check/${itemcode}`)
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
    <div class="col-lg-12 my-3" id="content-cards">
        <div class="card">
            <div class="card-body">
              <h5 class="card-title">${m.judul} (${m.tahun_terbit})</h5>
              <div class="row">
                <div class="col-4">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Penulis : ${m.penulis.replace(/[{}"]/g, '').split(',')}</li>
                        <li class="list-group-item">Tahun Inventaris : ${m.tanggal_terima}</li>
                        <li class="list-group-item">Penerbit : ${m.penerbit}</li>
                        <li class="list-group-item">Edisi : ${m.edisi}</li>
                        <li class="list-group-item">Bahasa : ${m.bahasa}</li>
                        <li class="list-group-item">Asal Buku  : ${m.asal_buku}</li>
                    </ul>
                </div>
                <div class="col-4">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">No. Inventaris Atas : ${m.no_inventaris_atas === undefined ? '' : m.no_inventaris_atas}</li>
                        <li class="list-group-item">No. Inventaris Bawah : ${m.no_inventaris_bawah === undefined ? '' : m.no_inventaris_bawah}</li>
                        <li class="list-group-item">Item Code : ${m.item_code}</li>
                        <li class="list-group-item">Call Number : ${m.call_number}</li>
                        <li class="list-group-item">Harga : ${m.harga}</li>
                        <li class="list-group-item">
                        Status : ${m.status === "0" ? 'Belum Stock Opname' : 'Sudah Stock Opname' }</li>
                    </ul>
                </div>
                <div class="col-4">
                    <h1 class="mt-1">Nomor Induk : </h1>
                    <code class="Induk">1000</code>
                </div>
              </div>
              <div class="float-end">
                <button class="btn btn-danger" id="btnCancel">Cancel</button>
                <button class="btn btn-primary btn-modal" data-itemcode="${m.item_code}">Check It</button>
              </div>
            </div>
          </div>
    </div>
    `;
}

// const pshbtn = document.querySelector('#pushbutton');
// pshbtn.addEventListener('click', updateDataNama);

    document.addEventListener('click', async function(e) {
        if(e.target.className === 'btn btn-primary btn-modal'){
            const item_code = e.target.dataset.itemcode;
            const response = await editData(item_code);
            if(response){
                alert('Update Status : '+ item_code);
                inputKeyword.value = '';
                content.innerHTML = '';
                inputKeyword.focus();
            }
        }
    })

// function updateDataNama(){
//     const updateData = [
//         { nama: "Nayir", status: "0", id: "1" },
//         { nama: "Noy", status: "1", id: "2" },
//         { nama: "Sopay", status: "1", id: "3" }
//     ];

//     updateData.map(item => editData(item));

//     // Promise.all(promises)
//     //     .then(responses => {
//     //         console.log("All requests completed successfully:", responses);
//     //     })
//     //     .catch(error => {
//     //         console.error("Error in one or more requests:", error);
//     //     });
//     }

function editData(itemcode) {
    console.log(`Sending data :` + JSON.stringify(itemcode));
    return fetch(`http://localhost:3000/edit/status/${itemcode}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    // body: JSON.stringify({
    //     item_code: itemcode
    // })
    }
    )
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
        console.log("Error:", error);
    });
}

