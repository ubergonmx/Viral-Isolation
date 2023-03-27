import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

type event = {
  name: string;
  percent: number;
}[];

// create a list of events with their percentages
const generalEvents: event = [
  { name: "Meteor Shower", percent: 0.1 },
  { name: "Earthquake", percent: 0.1 },
  { name: "Rainy Day", percent: 0.2 },
  { name: "Fallen Tree", percent: 0.3 },
  { name: "Fallen Boulder", percent: 0.3 },
];

const viralEvents: event = [
  { name: "Acid Reflux", percent: 0.4 },
  { name: "Feeling Hungry", percent: 0.3 },
  { name: "Found a Rat", percent: 0.3 },
];

const survivorEvents: event = [
  { name: "Muscle Cramps", percent: 0.2 },
  { name: "Lucky Day", percent: 0.1 },
  { name: "Ominous noises", percent: 0.2 },
  { name: "Nothing Happens", percent: 0.5 },
];

function showRandomEvent() {
  // show Headless UI modal
  // show the name of the random event
  // show the description of the random event
}

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
      return event[i].name;
    }
  }
  return "error";
}

// function RandomEvent() {
//   // return <button onClick={() => showRandomEvent()}>Random Event</button>;
//   let [isOpen, setIsOpen] = useState(true)

//   return (
//     <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
//       <Dialog.Panel>
//         <Dialog.Title>Deactivate account</Dialog.Title>
//         <Dialog.Description>
//           This will permanently deactivate your account
//         </Dialog.Description>

//         <p>
//           Are you sure you want to deactivate your account? All of your data
//           will be permanently removed. This action cannot be undone.
//         </p>

//         <button onClick={() => setIsOpen(false)}>Deactivate</button>
//         <button onClick={() => setIsOpen(false)}>Cancel</button>
//       </Dialog.Panel>
//     </Dialog>
//   )
// }

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
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
                    <p className="text-lg text-white text-center">{eventName}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
                    <p className="text-lg text-white text-center">{eventName}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
                    <p className="text-lg text-white text-center">{eventName}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
