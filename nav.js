
"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

function navSubmitStoryClick(evt) {
  console.debug("navSubmitStoryClick", evt);
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}

$body.on("click", "#nav-submit-story", navSubmitStoryClick);

/** Show login/signup on click on "login" */

function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  $favoritedStories.show();

}

$body.on("click", "#nav-favorites", navFavoritesClick);

async function navMyStories(evt) {
  console.debug("navMyStories", evt);
  console.debug("navMyStories", evt.target.id)
  hidePageComponents();
  // putMyStoriesOnPage();  
  // may have had a typo saying putUserStoriesOnPage(), this will not run the loop of putStoriesOnPage()
  $myStories.show();
  console.log("navMyStories-before putMyStoriesOnPage")
  console.log(currentUser.ownStories)
  
}

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

  const $story = generateStoryMarkup(story);
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


function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function putFavoritesListOnPage() {
  console.log("putFavoritesListOnPage")
  $

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

function testingStarButton(evt){
  console.log("testingStarButton")
  console.log($(evt.target))
  // $(evt.target.id).addClass("fa-solid")
}

$favoritedStories.on("click",".star", testingStarButton);