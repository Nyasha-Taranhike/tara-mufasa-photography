/*
    TODO:
        Make Favourites a tab on the nav
        Style the favourites button
        Add likes to session storage
        Make separate js for each tab
        minimise for loops and double for loops for performance
*/

let favImages = [];
let comments = [];

let commentsDisplayed = document.getElementById("commentsOnList");
let favoritesDisplayed = document.getElementById("favoritesOnList");
let favoritesDisColumn2 = document.getElementById("secondColumn");
let favoritesDisColumn3 = document.getElementById("thirdColumn");

function Comment(name, comment) {
  this.name = name;
  this.comment = comment;
}

function Fave(value, src) {
  this.value = value;
  this.src = src;
}

function addComment() {
  const emptyName = document.getElementById("name").value;
  const emptycomment = document.getElementById("comment").value;

  if (emptyName == "" || emptycomment == "") {
    alert("Please Enter All Details First");
  } else {
    comments = JSON.parse(sessionStorage.getItem("commentItems"));
    let newComment = new Comment(
      document.getElementById("name").value,
      document.getElementById("comment").value
    );

    comments.push(newComment);
    sessionStorage.setItem("commentItems", JSON.stringify(comments));
    displayComments();
  }
}

//
function displayComments() {
  if (commentsDisplayed != null) {
    for (i = 0; i < comments.length; i++) {
      let aComment = document.createElement("ul");
      commentsDisplayed.appendChild(aComment);

      let avatarName;
      let counter = 0;
      for (x in comments[i]) {
        if (counter == 0) {
          avatarName = comments[i][x];
        } else {
          let anAttribute = document.createElement("ol");
          anAttribute.textContent = avatarName + ": " + comments[i][x];

          aComment.appendChild(anAttribute);

          let likeItem = document.createElement("i");
          likeItem.classList.add("float-end", "fa", "fa-heart-o");
          //likeItem.innerHTML = "x";

          anAttribute.appendChild(likeItem);
        }
        counter++;
      }
    }
  }
}

let counter = 1;
function displayFavorites() {
  //TODO: MAKE separate js files for all the pages
  if (favoritesDisplayed != null) {
    for (pic of favImages) {
      let aFave = document.createElement("img");
      aFave.src = pic.src;

      //Sort the images in columns based on how many images are in the favourites aleady
      if (counter % 3 == 0) {
        favoritesDisplayed.appendChild(aFave); //centre if alone
        counter++;
      } else if ((counter - 1) % 3 == 0) {
        favoritesDisColumn2.appendChild(aFave);
        counter++;
      } else {
        favoritesDisColumn3.appendChild(aFave);
        counter++;
      }
    }
  }
}

$(document).ready(function () {
  //Save button to all the images
  let saveBtn = document.createElement("i");
  saveBtn.classList.add("fa-bookmark-o");
  saveBtn.classList.add("fa", "favorite-btn");

  $(saveBtn).insertAfter("img");

  //ADDing Favorites
  $("i.favorite-btn").click(function () {
    //$(this).toggleClass("fa-bookmark");
    let imgNum = $(this).prev().val();
    let imgSrc = $(this).prev().attr("src");
    sourceName = imgSrc;

    favImages = JSON.parse(sessionStorage.getItem("favItems"));
    let newFave = new Fave(imgNum, imgSrc);

    favImages.push(newFave);
    sessionStorage.setItem("favItems", JSON.stringify(favImages));
    alert(
      `Image saved for Later in your 'Favorites'. You have ${favImages.length} Favorites.`
    );
    $(this).toggleClass("fa-bookmark-o fa-bookmark");
    //TODO: REMOVE FROM SESSIONSTORAGE IF THEY CLICK AGAIN
  });

  //Comments in sessionStorage//////////////////////
  if (sessionStorage.getItem("hasCodeRunBefore") === null) {
    //Add comments to session storage
    sessionStorage.setItem("commentItems", JSON.stringify(comments));
    //Add images to session storage
    sessionStorage.setItem("favItems", JSON.stringify(favImages));

    sessionStorage.setItem("hasCodeRunBefore", true);
  } else {
    comments = JSON.parse(sessionStorage.getItem("commentItems"));
    favImages = JSON.parse(sessionStorage.getItem("favItems"));
  }
  //Comments in sessionStorage//////////////////////
  displayComments();
  //displayFavorites(imgSrc);

  //Show hide functionality for Gallery and Comments section
  $("#hideBtn").on("click", function () {
    $(".hideThis").toggle(300);

    if ($(this).text() == "Show") {
      $(this).text("Hide");
      $(this).css("color", "black");
      $(this).css("background-color", "white");
    } else {
      $(this).text("Show");
      $(this).css("color", "white");
      $(this).css("background-color", "black");
    }
  });

  $(".chainSlider").mouseover(function () {
    $(this).slideUp(100).slideDown(500);
  });

  $("#commentSection i").on("click", function () {
    $(this).toggleClass("fa-heart");
    $(this).toggleClass("fa-heart-o");
  });

  displayFavorites();

  //Drop down on favourites menu
  //Hide the dropdown and remove the bullet points
  $(".accordion").css("display", "none").css("list-style", "none");

  //Change styling of first paragraph to bold on mousehover
  $(".fav-heading").mouseover(function () {
    $(".accordion").slideToggle();
  });
});
