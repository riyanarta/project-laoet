// // fetch('http://localhost:3001/books')
// // .then(response => {
// //     if(!response.ok){
// //         throw new Error(response.statusText);
// //     } else {
// //         return response.json();
// //     }
// // })
// // .then(response => {
// //     if(response.Response === "False"){
// //         throw new Error(response.Error);
// //     } else {
// //         console.log(response);
// //     }
// // });

// let scannerIsRunning = false;

// document.getElementById("showScannerBtn").addEventListener("click", function(){
//     document.getElementById('scanner-container').style.display = 'block';
//     Quagga.init({
//         inputStream: {
//             name: "Live",
//             type: "LiveStream",
//             target: document.querySelector('#scanner-container'),
//             constraints: {
//                 width: 310,
//                 height: 320,
//                 facingMode: "environment",
//             },
//             // area: { // defines rectangle of the detection/localization area
//             //     top: "0%",    // top offset
//             //     right: "0%",  // right offset
//             //     left: "0%",   // left offset
//             //     bottom: "0%"  // bottom offset
//             // },
//             decoder: {
//                 readers: [
//                     "code_128_reader",
//                     "ean_reader",
//                     "ean_8_reader",
//                     "code_39_reader",
//                     "code_39_vin_reader",
//                     "codabar_reader",
//                     "upc_reader",
//                     "upc_e_reader",
//                     "i2of5_reader"
//                 ],
//                 debug: {
//                     showCanvas: false,
//                     showPatches: false,
//                     showFoundPatches: false,
//                     showSkeleton: false,
//                     showLabels: false,
//                     showPatchLabels: false,
//                     showRemainingPatchLabels: false,
//                     boxFromPatches: {
//                         showTransformed: false,
//                         showTransformedBox: false,
//                         showBB: false
//                     }
//                 }
//             },
//         },
//         locator: {
//             patchSize: "medium",
//             halfSample: true,
//         },
//         numOfWorkers: navigator.hardwareConcurrency || 4,
//         locate: true,
//     }, function(err) {
//         if (err) {
//             console.error(err);
//             return;
//         }
        
//         Quagga.start();
//         scannerIsRunning = true;
//         toggleButtonState();
        
//         // 
//     });

    

//     Quagga.onProcessed(function (result) {
//         var drawingCtx = Quagga.canvas.ctx.overlay,
//         drawingCanvas = Quagga.canvas.dom.overlay;

//         if (result) {
//             if (result.boxes) {
//                 drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
//                 result.boxes.filter(function (box) {
//                     return box !== result.box;
//                 }).forEach(function (box) {
//                     Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
//                 });
//             }

//             if (result.box) {
//                 Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
//             }

//             if (result.codeResult && result.codeResult.code) {
//                 Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
//             }
//         }
//     });

//   Quagga.onDetected(function(result) {
//     //   const barcode = result.codeResult.code;
//     //   console.log('Barcode detected:', barcode);
//     // alert("Barcode detected and processed : [" + result.codeResult.code + "]", result);
//     // if (!barcodeProcessed) {
//     //     // alert("Barcode detected and processed : [" + result.codeResult.code + "]");
//     //     barcodeProcessed = true; // Set the flag to true after processing the barcode
//     //     setTimeout(function() {
//     //         barcodeProcessed = false; // Reset the flag after 5 seconds
//     //     }, 2000);
//     //     // Additional actions if needed...

//     //     // Close the modal after processing
//     //     // $('#confirmationModal').modal('hide');
//     // }


//       // Display confirmation modal
//       $('#confirmationModal').modal('show');
//       $('#barcodeValue').text(result.codeResult.code);
//       fetch(`https://project-laut.vercel.app/check/${result.codeResult.code}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             barcode : result.codeResult.code,
//         }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data.message);
//         if (Array.isArray(data) && data.length > 0) {
//             // Access the title of the first item
//             $('#modalContent').text(data[0].title);
//         } else {
//             // Handle the case where there is no data or the structure is different
//             $('#modalContent').text('No title available');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     })
//       // Set up event listener for confirmation
//       $('#confirmUpdate').on('click', function() {
//           // Send barcode information to the backend
//         //   fetch(`https://project-laut.vercel.app/check/${result.codeResult.code}`, {
//         //       method: 'GET',
//         //       headers: {
//         //           'Content-Type': 'application/json',
//         //       },
//         //       body: JSON.stringify({
//         //           barcode : result.codeResult.code,
//         //       }),
//         //   })
//         //   .then(response => response.json())
//         //   .then(data => {
//         //       console.log(data.message);
//         //       $('#modalContent').text(JSON.stringify(data));
//         //   })
//         //   .catch(error => {
//         //       console.error('Error:', error);
//         //   })
//         //   .finally(() => {
//               // Close the modal after processing
//               $('#confirmationModal').modal('hide');
//         //   });
//       });
//   });
// });

// document.getElementById('stopScannerBtn').addEventListener('click', function() {
//     if (scannerIsRunning) {
//         Quagga.stop();
//         scannerIsRunning = false;
//         toggleButtonState();
//     }
// });

//     function toggleButtonState() {
//     const showScannerBtn = document.getElementById('showScannerBtn');
//     const stopScannerBtn = document.getElementById('stopScannerBtn');
//     const scannerContainer = document.getElementById('scanner-container');

//     showScannerBtn.style.display = scannerIsRunning ? 'none' : 'inline-block';
//     stopScannerBtn.style.display = scannerIsRunning ? 'inline-block' : 'none';
//     scannerContainer.style.display = scannerIsRunning ? 'block' : 'none';
// }

// const searchButton = document.querySelector('.search-btn');
// searchButton.addEventListener('click', async function() {
//     try{
//         const inputKeyword = document.querySelector('.input-keyword');
//         const books = await getBook(inputKeyword.value);
//         updateUI(books);
//     }catch(err){
//         alert(err);
//     }
    
// });

// function getBook(itemcode){
//     return fetch(`https://project-laoet.vercel.app/check/${itemcode}`)
//     .then(response => {
//         if(!response.ok){
//             throw new Error(response.statusText);
//         } else {
//             return response.json();
//         }
//     })
//     .then(response => {
//         if(response.Response === "False"){
//             throw new Error(response.Error);
//         } else {
//             return response;
//         }
//     });
// }

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
              <h6 class="card-subtitle mb-2 text-body-secondary">${m.author}</h6>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary btn-modal" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-itemcode ="${m.itemcode}">Show Details</a>
            </div>
          </div>
    </div>`;
}