// console.log("Hello world");
shownotes();
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function (e) {
//   console.log("You Click on this button");
  let addtxt = document.getElementById("addtxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let myobj ={
    title :addTitle.value,
    text :addtxt.value
  }
  notesobj.push(myobj);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  addtxt.value = "";
  addTitle.value = "";
  shownotes();
  // console.log(notesobj)
});

function shownotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let html = "";
  notesobj.forEach(function (element, index) {
    html += `
      <div class="noteCard card mx-2 my-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title"> ${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
            </div>
      </div>`;
  });
  let notesEle = document.getElementById("notes");
  if (notesobj != 0) {
    notesEle.innerHTML = html;
  }
  else{
    notesEle.innerHTML = `Nothing to show! use "Add a note" section above to add notes.`
}
}

function deleteNote(index) {
//   console.log("Note Deleteing", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  notesobj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  shownotes();
}

let search = document.getElementById('searchtxt');
search.addEventListener('input', function(){
    let inputvalue = search.value;
    // console.log(inputvalue);
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputvalue)){
          element.style.display = "block";
        }
        else{
          element.style.display = "none";
        }
    })
})