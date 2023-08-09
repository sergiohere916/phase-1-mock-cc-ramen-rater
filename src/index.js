// write your code here
const ramenUrl = "http://localhost:3000/ramens";

const topDiv = document.getElementById("ramen-menu");

const mainRamenImage = document.querySelector(".detail-image") 
const mainRamenName = document.querySelector(".name");
const mainRamenRestaurant = document.querySelector(".restaurant");
const mainRamenRating = document.getElementById("rating-display");
const mainRamenComment = document.getElementById("comment-display");

const mainRamenForm = document.getElementById("new-ramen");
const mainRamenRatingForm = document.getElementById("edit-ramen");

let currentRamen;


fetch(ramenUrl)
.then(res => res.json())
.then(ramensData => {
     
    ramensData.forEach((ramen) => {
    renderTopMenu(ramen);
})
    renderMainMenu(ramensData[0]);
})

mainRamenForm.addEventListener("submit", (e) => {
    //get inputs
    e.preventDefault();
    const inputRamenName = e.target["new-name"].value
    const inputRamenRestaurant = e.target["new-restaurant"].value
    const inputRamenImage = e.target["new-image"].value
    const inputRamenRating = e.target["new-rating"].value
    const inputRamenComment = e.target["new-comment"].value
    
    const newRamenItem = {
        name: inputRamenName,
        restaurant: inputRamenRestaurant,
        image: inputRamenImage,
        rating: inputRamenRating,
        comment: inputRamenComment
    }
    renderTopMenu(newRamenItem);
})

mainRamenRatingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputRamenUpdateRating = e.target["new-rating"].value;
    const inputRamenUpdateComment = e.target["new-comment"].value;
    currentRamen.rating = inputRamenUpdateRating
    currentRamen.comment = inputRamenUpdateComment
    
    console.log(currentRamen.id); //delete this
    // fetch(`${ramenUrl}/${currentRamen.id}`, {
    //     method: "PATCH",
    //     headers: {"Content-Type":"application/json"},
    //     body: JSON.stringify(updatedContent)
    // })
    // .then(res => res.json())
    // .then(updatedRamen => {
    //     renderMainMenu(updatedRamen);
    // })
    renderMainMenu(currentRamen);

})

function renderTopMenu(ramen) {
    //create ramen img element and append to topDiv
    ramenImg = document.createElement("img");
    ramenImg.src = ramen.image;
    topDiv.append(ramenImg);
    ramenImg.addEventListener("click", (e) => {
        renderMainMenu(ramen);
    })
}

function renderMainMenu(ramen) {
    //grab neceessary elements and manipulate them
    currentRamen = ramen;
    console.log(currentRamen); //delete this
    mainRamenImage.src = ramen.image;
    mainRamenName.textContent = ramen.name;
    mainRamenRestaurant.textContent = ramen.restaurant;
    mainRamenRating.textContent = ramen.rating; //may need global variable to persist this
    mainRamenComment.textContent = ramen.comment; 

}
