
"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  // putStoriesOnPage();
  $allStoriesList.show();

}

$body.on("click", "#nav-all", navAllStories);

function navSubmitStoryClick(evt) {
  console.debug("navSubmitStoryClick", evt);
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}

$body.on("click", "#nav-submit-story", navSubmitStoryClick);
///// Starting to get really confused. The above click was for the function directly above it, but that doesn't seem right and is not not working. I am trying the line below to see if it will resolve my issue.

$body.on("click", "#nav-submit-story", navSubmitStoryClick)





/** Show login/signup on click on "login" */
// 
// Function below was being used for ($body.on("click", "#nav-favorites", navFavoritesClick))
async function navFavoritesClick(evt) {
  evt.preventDefault();
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  // generateStoryMarkup(currentUser.favorites, true)


  console.debug("navFavoritesClick2");
  
  // grab all info from form
  const title = $("#enter-title").val();
  const url = $("#enter-url").val();
  const author = $("#enter-author").val();
  const username = currentUser.username
  const storyData = {title, url, author, username };
  const story = await storyList.getFav();
  const $story = generateStoryMarkup(story, true);
  $.prepend($story);

  putStoriesOnPage();
  $favoritedStories.show(); //thsi should trigger a DOM reload, thats why this wo
  // the noted line below
  $allStoriesList.show();
  }

$body.on("click", "#nav-favorites", putFavoritesListOnPage);

async function navMyStories(evt) {
  console.debug("navMyStories", evt);
  console.debug("navMyStories", evt.target.id)
  hidePageComponents();
  // putMyStoriesOnPage();  
  // may have had a typo saying putUserStoriesOnPage(), this will not run the loop of putStoriesOnPage()
  $myStories.show();
  console.log("navMyStories-before putMyStoriesOnPage")
  console.log(currentUser.ownStories)
  // getDeleteBtnHTML = true
  
}
;
$body.on("click", "#nav-stories", navMyStories);

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
  
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function navProfileClick(evt) {
  console.debug("navProfileClick", evt);
  hidePageComponents();
  $userProfile.show();
}

$navUserProfile.on("click", navProfileClick);

async function submitNewStory(evt) {
  console.debug("submitNewStory");
  evt.preventDefault();

  // grab all info from form
  const title = $("#enter-title").val();
  const url = $("#enter-url").val();
  const author = $("#enter-author").val();
  const username = currentUser.username
  const storyData = {title, url, author, username };

  const story = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(story, false);
  $allStoriesList.prepend($story);
  $myStories.append($story);
  
  $myStories.hide();
  putStoriesOnPage(); //thsi should trigger a DOM reload, thats why this worked and not 
  // the noted line below
  $allStoriesList.show();



  // hide the form and reset it
  $submitForm.slideUp("slow");
  $submitForm.trigger("reset");
}

$submitForm.on("submit", submitNewStory);

async function submitFav(evt) {
  console.debug("submitFav");
  evt.preventDefault();

  // grab all info from form
  const title = $("#enter-title").val();
  const url = $("#enter-url").val();
  const author = $("#enter-author").val();
  const username = currentUser.username
  const storyData = {title, url, author, username };

  // const story = await storyList.addFav(currentUser, storyData);

  const $story = generateStoryMarkup(story, true);
  $allStoriesList.prepend($story);
  $myStories.append($story);
  
  $myStories.hide();
  putStoriesOnPage(); //thsi should trigger a DOM reload, thats why this worked an
  // the noted line below
  $allStoriesList.show();
}
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function putFavoritesListOnPage() {
  console.log("putFavoritesListOnPage")
  $favoritedStories.empty();
  hidePageComponents();
  if (currentUser.favorites.length === 0) {
    $favoritedStories.append("<h5>No Favorites added!</h5>");
  } else {
    for (let story of currentUser.favorites){
      const $story = generateStoryMarkup(story, true);
      $favoritedStories.append($story);
      console.log(story)
      console.log($story) 
    }
    $(document).ready(function(){
      let change = $("#favorited-stories").find("i");
      console.log(change)
      change.removeClass("fa-regular")
      change.addClass("fa-solid")
    });
  }
  $favoritedStories.show();

}

function submit (evt) {
  console.log("nav.js file/submit function")
  hidePageComponents();
  
}

function putUserStoriesOnPage () {
  console.log("putUserStoriesOnPage")
  hidePageComponents();
  $myStories.show();
}

async function testingStarButton(evt){
  console.log("testingStarButton")
  console.log(evt.target)
  const $tgt = $(evt.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s=>s.storyId === storyId);

  if($tgt.hasClass("fa-regular")){
    await currentUser.addFavorite(story);
    $tgt.closest("i").removeClass("fa-regular");
    $tgt.closest("i").addClass("fa-solid")

  }else {
    await currentUser.removeFavorite(story);
    $tgt.closest("i").removeClass("fa-solid")
    $tgt.closest("i").addClass("fa-regular")
  }

  // evt.target.addClass("fa-solid")
  // $(evt.target.id).addClass("fa-solid")
}

$storiesLists.on("click",".star", testingStarButton);