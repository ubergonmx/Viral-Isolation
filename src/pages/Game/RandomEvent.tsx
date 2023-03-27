import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

// create a list of events with their percentages
const generalEvents = [
  { name: "Meteor Shower", percent: 0.1 },
  { name: "Rain fall", percent: 0.2 },
];

function showRandomEvent() {
  // show Headless UI modal
  // show the name of the random event
  // show the description of the random event
}

// create a function to randomly select an event
function getRandomEvent() {
  // create a random number between 0 and 1
  let randomNum = Math.random();
  // create a variable to store the total percentage of events
  let totalPercent = 0;
  // loop through the list of events
  for (let i = 0; i < generalEvents.length; i++) {
    // add the percentage of the current event to the total percentage
    totalPercent += generalEvents[i].percent;
    // if the random number is less than the total percentage
    if (randomNum < totalPercent) {
      // return the name of the current event
      return generalEvents[i].name;
    }
  }
}

function RandomEvent() {
  return <button onClick={() => showRandomEvent()}>Random Event</button>;
}

export default RandomEvent;
