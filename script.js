

const searchInput = document.querySelector("#searchInput");
const btnEkle = document.querySelector("#btnEkle");
const ul = document.querySelector("#todoListesi");
const small =document.querySelector("#uyarı")

let todos = [];

btnEkle.addEventListener("click", önYüzeEkle);

function önYüzeEkle(){
    let searchTerm = searchInput.value;
    if(searchInput.value != ""){
        ul.innerHTML += ` <li class=" list-item border border-1 p-2 list-unstyled mb-2">${searchTerm}
        <i class="silBtn fa-solid fa-x mt-1 float-end pe-1 fs-5"></i>
        </li>`

        storageEkle(searchTerm)
        searchInput.value = ""
    }else{
         small.innerHTML = "Görev Girmeni Gerekiyor.";
         small.style.color = "red";
        setTimeout(function(){
        small.style.display = "none"
        },1500)
    }

}

function storageEkle(newTodo){
    localStorageKontrol();
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))

}

function localStorageKontrol(){
    if(localStorage.getItem("todos")== null){
        todos = []
    }else{
        localStorage.setItem("todos", JSON.stringify(todos))
    }
}

// ! Görevleri tek tek silmek için.

ul.addEventListener("click", ÖnYüzdenSil);

function ÖnYüzdenSil(e){
    const li = e.target.parentElement;
    console.log(li)
    // console.log(e)
    if(e.target.className.includes("silBtn")){
        li.style.display = "none"
    }

    localStoragedenSil(li.textContent)
}

function localStoragedenSil(silinecekEleman){
    localStorageKontrol();
    todos.forEach(function(todo, index){
        // console.log(todo,index)
        if(silinecekEleman.trim() == todo.trim()){
            todos.splice(index,1)
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos))
}

// ! Tüm Elemanları Temizlemek için.

const btnHepsiniTemizle = document.querySelector("#btnHepsiniTemizle");

btnHepsiniTemizle.addEventListener("click", function(){
    ul.innerHTML = "";
    localStorage.clear();
})

// ! ARAMA KELİMESİNE GÖRE FİLTRELEME İŞLEMLERİ


const btnFiltrele = document.querySelector("#btnFiltrele");

btnFiltrele.addEventListener("keyup", filtrele);

function filtrele(e) {
    const filtreliDurum = e.target.value.trim().toLowerCase();
    const listeElemanı = document.querySelectorAll(".list-item");

    listeElemanı.forEach(function (todo) {
        const görevMetni = todo.textContent.trim().toLowerCase();
        if (görevMetni.includes(filtreliDurum)) {
            todo.style.display = "block";
        } else {
            todo.style.display = "none";
        }
    });
}