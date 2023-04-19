import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import boulder from "/sfx/boulder.mp3";
import fallingTree from "/sfx/falling-tree.mp3";
import earthquake from "/sfx/earthquake.mp3";
import rain from "/sfx/rain.mp3";
import legCramp from "/sfx/leg-cramp.mp3";
import luckyDay from "/sfx/lucky-day.mp3";
import nothingHappen from "/sfx/nothing-happen.mp3";
import panicAttack from "/sfx/panic-attack.mp3";
import randomDistraction from "/sfx/random-distraction.mp3";
import ratSnack from "/sfx/rat-snack.mp3";


type event = {
  name: string;
  percent: number;
  sfx: string
}[];

// create a list of events with their percentages
const generalEvents: event = [
  { name: "Earthquake", percent: 0.2, sfx: earthquake },
  { name: "Rainy Day", percent: 0.2, sfx: rain},
  { name: "Fallen Tree", percent: 0.3, sfx: fallingTree},
  { name: "Fallen Boulder", percent: 0.3, sfx: boulder },
];

const viralEvents: event = [
  { name: "Rat Snack", percent: 0.2, sfx: ratSnack},
  { name: "Random distraction", percent: 0.3, sfx: randomDistraction },
  { name: "Nothing Happens", percent: 0.5, sfx: nothingHappen },
];

const survivorEvents: event = [
  { name: "Muscle Cramps", percent: 0.2, sfx: legCramp },
  { name: "Lucky Day", percent: 0.2, sfx: luckyDay },
  { name: "Panic attack", percent: 0.2, sfx: panicAttack },
  { name: "Nothing Happens", percent: 0.4, sfx: nothingHappen },
];

// create a function to randomly select an event
function getRandomEvent(event: event) {
  // create a random number between 0 and 1
  let randomNum = Math.random();
  // create a variable to store the total percentage of events
  let totalPercent = 0;
  // loop through the list of events
  for (let i = 0; i < event.length; i++) {
    // add the percentage of the current event to the total percentage
    totalPercent += event[i].percent;
    // if the random number is less than the total percentage
    if (randomNum < totalPercent) {
      // return the name of the current event
      var audio = (new Audio(event[i].sfx));
      audio.play();
      setTimeout(function(){
        audio.pause();
        audio.currentTime = 0;
      }, 10000);
      return event[i].name;
    }
  }
  return "error";
}

export function GeneralEvent() {
  let [isOpen, setIsOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const eventType = "General Event";

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setEventName(getRandomEvent(generalEvents));
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="select-none rounded-md bg-black bg-opacity-20 px-4 py-2 text-lg font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {eventType}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-white">
                    {eventType}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-center text-2xl text-white">{eventName}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-slate-700 px-4 py-2 font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export function ViralEvent() {
  let [isOpen, setIsOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const eventType = "Viral Event";

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setEventName(getRandomEvent(viralEvents));
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="select-none rounded-md bg-black bg-opacity-20 px-4 py-2 text-lg font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {eventType}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-white">
                    {eventType}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-center text-2xl text-white">{eventName}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-slate-700 px-4 py-2 font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export function SurvivorEvent() {
  let [isOpen, setIsOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const eventType = "Survivor Event";

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setEventName(getRandomEvent(survivorEvents));
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="select-none rounded-md bg-black bg-opacity-20 px-4 py-2 text-lg font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {eventType}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-white">
                    {eventType}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-center text-2xl text-white">{eventName}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-slate-700 px-4 py-2 font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
