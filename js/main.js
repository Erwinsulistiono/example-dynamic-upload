
dateTime = function () {
    var now = new Date();
    var hours = now.getHours();
    var greet;

    if (hours < 12) {
        greet = "Good Morning,";
    } else if (hours < 16) {
        greet = "Good Afternoon,";
    } else {
        greet = "Good Evening,";
    }

    document.querySelector('#time').innerHTML = greet;
};

menuDropdowns = function () {
    document.querySelectorAll(".dropdown").forEach((e) => {
        const links = e.querySelector('.links');
        const h = links.offsetHeight;
        console.log(h)
        console.log(links)

        links.style.height = 0;

        e.addEventListener("click", () => {
            e.classList.toggle("js-opened")
            if (e.classList.contains("js-opened")) {
                links.removeAttribute("style");
                links.style.height = 300;
            } else {
                links.removeAttribute("style");
                links.style.height = 0;
            }
        })
    })
};

let _targettedModal,
    _triggers = document.querySelectorAll('[data-modal-trigger]'),
    _dismiss = document.querySelectorAll('[data-modal-dismiss]'),
    modalActiveClass = "is-modal-active";

const showModal = el => {
    _targettedModal = document.querySelector('[data-modal-name="' + el + '"]');
    _targettedModal.classList.add(modalActiveClass);
}

const hideModal = event => {
    if (event === undefined || event.target.hasAttribute('data-modal-dismiss')) {
        _targettedModal.classList.remove(modalActiveClass);
    }
}

const bindEvents = (el, callback) => {
    for (i = 0; i < el.length; i++) {
        (function (i) {
            el[i].addEventListener('click', function (event) {
                callback(this, event);
            });
        })(i);
    }
}

const triggerModal = () => {
    bindEvents(_triggers, function (that) {
        showModal(that.dataset.modalTrigger);
    });
}

const dismissModal = () => {
    bindEvents(_dismiss, function (that) {
        hideModal(event);
    });
}

const initModal = () => {
    triggerModal();
    dismissModal();
}

initModal();
menuDropdowns();
dateTime();

document.querySelector("#js-toggle-menu").addEventListener("click", () => {
    document.querySelector(".menu").classList.toggle("active")
})

document.querySelector("#upload-destination").addEventListener("change", (e) => {
    const newUrlTarget = e.target.value;
    console.log(newUrlTarget) //ini yang diganti buat dynamic link
    document.querySelector("#upload-form").action = newUrlTarget;
})

/* process excel */
let selectedFile;
console.log(window.XLSX);
document.getElementById('fileSelect').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            console.log(workbook);
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                console.log(rowObject);
                document.getElementById("jsondata").innerHTML = printData(rowObject);
                document.getElementById("jsondata").style.overflow = "auto"
                //   document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject)
            });
        }
    }
})

function printData(json) {
    let cols = Object.keys(json[0]);


    //Map over columns, make headers,join into string
    let headerRow = cols
        .map(col => `<th class="table-styling">${col}</th>`)
        .join("");

    //map over array of json objs, for each row(obj) map over column values,
    //and return a td with the value of that object for its column
    //take that array of tds and join them
    //then return a row of the tds
    //finally join all the rows together
    let rows = json
        .map(row => {
            let tds = cols.map(col => `<td class="table-styling">${row[col]}</td>`).join("");
            return `<tr>${tds}</tr>`;
        })
        .join("");

    //build the table
    const table = `
      <table class="upload-table">
          <thead>
              <tr>${headerRow}</tr>
          <thead>
          <tbody>
              ${rows}
          <tbody>
      <table>`;

    return table;
}


let data = [{
    "name": "jayanth",
    "data": "scd",
    "abc": "sdef"
}]


// document.getElementById('button').addEventListener("click", () => {
//     XLSX.utils.json_to_sheet(data, 'out.xlsx');
//     if(selectedFile){
//         let fileReader = new FileReader();
//         fileReader.readAsBinaryString(selectedFile);
//         fileReader.onload = (event)=>{
//          let data = event.target.result;
//          let workbook = XLSX.read(data,{type:"binary"});
//          console.log(workbook);
//          workbook.SheetNames.forEach(sheet => {
//               let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
//               console.log(rowObject);
//               document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
//          });
//         }
//     }
// });
