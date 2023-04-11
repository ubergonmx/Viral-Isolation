import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";
import { GameConfigActionType } from "./gameConfigReducer";
import { IHouse, ISurvivor } from "./gameInterface";
import LongPressButton from "./LongPressButton";

function House({ survivor, house, dispatch }: { survivor: ISurvivor; house: IHouse; dispatch: any }) {
  const { id, numOfItems } = house;

  const socket = useSocket();
  const { code } = useParams();

  const [display, setDisplay] = useState("");
  const [entered, setEntered] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const houseName = "House " + id;

  useEffect(() => {
    console.log("survivor: " + survivor?.name);
    setEntered(survivor!.housesEntered.includes(id));

    return () => {
      console.log("unmounting");
    };
  }, [survivor]);

  function closeModal() {
    setIsOpenModal(false);
  }

  function getItem() {
    if (!entered) {
      setEntered(true);
      setDisplay(
        numOfItems > 0
          ? survivor?.keycardHouse === id
            ? "Draw a keycard item"
            : "Draw an item card"
          : "No more items in this house",
      );
      setIsOpenModal(true);
      dispatch({ type: GameConfigActionType.SURVIVOR_GET_ITEM, payload: { code, survivor, house } });
      socket.emit("get-survivor-item", { code, survivor, houseId: id });
    }
  }

  return (
    <>
      <div className="flex place-content-center">
        {/* <button onClick={getItem} disabled={entered} className="disabled:bg-gray-700 disabled:text-gray-50">
          {houseName}
        </button> */}
        <LongPressButton text={houseName} callback={getItem} disabled={entered} />
      </div>

      <Transition appear show={isOpenModal} as={Fragment}>
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
                    {houseName}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-center text-2xl text-white">{display}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="text-m inline-flex justify-center rounded-md border border-transparent bg-slate-700 px-4 py-2 font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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

export default House;
