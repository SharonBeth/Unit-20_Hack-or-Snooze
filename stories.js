"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
let myStoryList;
let favStoryList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
  myStoryList =await StoryList.getMyStories();
  console.log("getAndShowMyStoriesOnStart")
  putStoriesOnPage();
  favStoryList = await StoryList.getFav();

  // putMyStoriesOnPage();
}

// async function getAndShowMyStoriesOnStart() {
  // myStoryList =await StoryList.getMyStories();
  // console.log("getAndShowMyStoriesOnStart")
// 


/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
 
      <li id="${story.storyId}">
      <i id="${story.storyId}_i" class="fa-regular fa-star star"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */


function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
    console.log
    // $myStories.append($story);
  }

  $allStoriesList.show();
}

function putMyStoriesOnPage() {
  console.debug("putMyStoriesOnPage");
  // loop through all of our stories and generate HTM
  for (let story of currentUser.ownStories) {
    console.log(story)
    console.log(story.author)
    const $story = `<li id="${story.storyId}">
    <i id="${story.storyId}_i" class="star fa-regular fa-star" onclick="testingStarButton()"></i>
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
    
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>`
    $myStories.append($story);
  }
  $myStories.hide();
}

function generateMyStory() {
  console.log(story)
return $(`
 
<li id="${story.storyId}">
<i id="${story.storyId}_i" class="fa-regular fa-star" onclick="testingStarButton()"></i>
  <a href="${story.url}" target="a_blank" class="story-link">
    ${story.title}
  </a>

  <small class="story-author">by ${story.author}</small>
  <small class="story-user">posted by ${story.username}</small>
</li>
`)
}
  // <small class="story-hostname">(${hostName})</small>