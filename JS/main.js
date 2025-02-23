// Select Inputs
let movieTitle=document.getElementById('movieTitle');
let movieCategory=document.getElementById('movieCategory');
let movieDescription=document.getElementById('movieDescription');
let addBtn=document.getElementById('addBtn');
let editBtn=document.getElementById('editBtn');
let searchMovie=document.getElementById('searchMovie')

let updatedIndex;
// تحميل البيانات من Local Storage عند تحميل الصفحة
let allMovies=[];

if (localStorage.getItem('movies')!==null) {
    allMovies=JSON.parse(localStorage.getItem('movies'));
}

// عرض البيانات فورًا عند تحميل الصفحة

displayMovies();
// A Function To Add A Movie


function validateCategory() {
    let validCategories = Array.from(document.querySelectorAll("#myList option")).map(option => option.value);
    let categoryError = document.getElementById("categoryError");

    if (!validCategories.includes(movieCategory.value)) {
        movieCategory.classList.add("is-invalid"); // Add red border
        categoryError.classList.remove("d-none"); // Show error message
    } else {
        movieCategory.classList.remove("is-invalid");
        categoryError.classList.add("d-none"); // Hide error message
    }
}



function addMovie(){

let movie={
    title:movieTitle.value,
    category:movieCategory.value,
    description:movieDescription.value,
  
    }

    if (movieTitle.value === "" || movieCategory.value === "" || movieDescription.value === "") {
        alert("Plz Fill All The Inputs 🎬");
        return; // يمنع الإضافة إذا كانت الحقول فارغة
    }







      
    allMovies.push(movie)
   localStorage.setItem('movies',JSON.stringify(allMovies))

  
    clearMovie();
    displayMovies();

}

function clearMovie(){
movieTitle.value="";
movieCategory.value="";
movieDescription.value="";


}

//A Function To Display Movies
function displayMovies(){
let cartona='';
for(let i=0;i<allMovies.length;i++){
// cartona +=`<div class="movie">
// <h2 class="text-success">${allMovies[i].title}</h2>
// <h3 class="fw-bolder fs-3">${allMovies[i].category}</h3>
// <p class="text-secondary mb-2 text-white">${allMovies[i].description}</p>



// </div>`;
cartona +=`
<tr>
<td class="text-black fw-bold">${allMovies[i].title}</td>
<td class="text-black fw-bold">${allMovies[i].category}</td>
<td class="text-black fw-bold">${allMovies[i].description}</td>
<td>
<button class="btn btn-success mb-2 " onClick="deleteMovies(${i});">Delete<i class="fa fa-trash"></i> </button> 
<button class="btn btn-outline-warning mb-2" onClick="updateMovies(${i});">Update<i class="fa-solid fa-edit"></i></button> 
</td>
</tr>`


}
cartona +='</tbody>';
document.getElementById('moviesBody').innerHTML=cartona;



}
movieCategory.addEventListener("input", validateCategory);

// A Function To Delete Movie

function deleteMovies(deletedIndex){
     
allMovies.splice(deletedIndex,1)
displayMovies();
localStorage.setItem('movies',JSON.stringify(allMovies));

}

function updateMovies(i){
    updatedIndex=i;
   addBtn.classList.add('d-none');
   editBtn.classList.remove('d-none');
    movieTitle.value=allMovies[i].title;
    movieCategory.value=allMovies[i].category;
    movieDescription.value=allMovies[i].description;

localStorage.setItem('movies', JSON.stringify(allMovies));
displayMovies();




}
function editMovies(){

allMovies[updatedIndex].title=movieTitle.value;
allMovies[updatedIndex].category=movieCategory.value;
allMovies[updatedIndex].description=movieDescription.value;
displayMovies();
localStorage.setItem('movies',JSON.stringify(allMovies));
clearMovie();
addBtn.classList.remove('d-none');
editBtn.classList.add('d-none')
}


function searchMovies(term){
    var term=searchMovie.value;
    var cartona='';
for(let i=0;i<allMovies.length;i++){
    if(allMovies[i].title.toLowerCase().includes(term.toLowerCase())==true ){

        cartona +=`
        <tr>
        <td class="text-black fw-bold">${allMovies[i].title}</td>
        <td class="text-black fw-bold">${allMovies[i].category}</td>
        <td class="text-black fw-bold">${allMovies[i].description}</td>
        <td>
        <button class="btn btn-success mb-2 " onClick="deleteMovies(${i});">Delete<i class="fa fa-trash"></i> </button> 
        <button class="btn btn-outline-warning mb-2 ms-3" onClick="updateMovies(${i});">Update<i class="fa-solid fa-edit"></i></button> 
        </td>
        </tr>`
        

    }
    document.getElementById('moviesBody').innerHTML=cartona;
}


}
searchMovies();

