import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, CalendarIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../Header/Logo";
import { ConnectButton } from "@suiet/wallet-kit";
import HeadInfo from "../Header/HeadInfo";
import classNames from "classnames";

const navigation = [{ name: "All Companies", href: "#", icon: HomeIcon, current: true }];

export default function Sidebar({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const DesktopWalletButton = () => {
        return (
            <div className="ml-2 justify-center content-center">
                <ConnectButton />

                <button className="flex gap-1 text-base font-medium text-white py-2 rounded-3xl mt-2 justify-center content-center hover:text-pink-500">
                    <div className="h-5 w-5">
                        <CalendarIcon />
                    </div>
                    <p>What's new</p>
                </button>
            </div>
        );
    };

    const MobileSidebarHeaderMenu = () => {
        return (
            <div className="ml-2 mr-2 h-0 flex-1 overflow-y-auto pt-5 pb-4">
                {/* <div className="flex flex-shrink-0 items-center px-4">
                    <Logo />
                </div> */}

                <nav className="mt-5 space-y-1 px-2">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                                item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "group flex items-center px-2 py-4 text-base font-medium rounded-md"
                            )}
                        >
                            <item.icon
                                className={classNames(
                                    item.current ? "text-gray-300" : "text-gray-400 group-hover:text-gray-300",
                                    "mr-4 flex-shrink-0 h-6 w-6"
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </a>
                    ))}
                </nav>
            </div>
        );
    };

    const MobileSidebarBottomMenu = () => {
        return (
            //  Bottom Side Bar - Wallet and What's new section
            <div className="flex flex-shrink-0 bg-gray-700 p-4">
                <a href="#" className="group block flex-shrink-0">
                    <div className="flex items-center w-full">
                        <div className="ml-2 w-full">
                            <ConnectButton />
                            <button className="flex gap-1 text-base font-medium text-white py-2 rounded-3xl mt-2 justify-center content-center hover:text-pink-500">
                                <div className="h-5 w-5">
                                    <CalendarIcon />
                                </div>
                                <p>What's new</p>
                            </button>
                        </div>
                    </div>
                </a>
            </div>
        );
    };

    const MobileHeader = () => {
        return (
            <div className="sticky top-0 z-10 bg-[#0F1114] pl-3 pt-3 pr-3 sm:pl-3 sm:pt-3 md:hidden flex content-center justify-between">
                <button
                    type="button"
                    className="-ml-0.5 -mt-1 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => setSidebarOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>

                    <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
                <Logo />
            </div>
        );
    };

    const DesktopSidebarMenu = () => {
        return (
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col md:border-r-2 md:border-[#CCCCCC]">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
                    <div className="ml-2 mr-2 flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                        <div className="flex flex-shrink-0 items-center px-4">
                            <Logo />
                        </div>
                        <nav className="mt-5 flex-1 space-y-1 px-2">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-900 text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                        "group flex items-center px-2 py-4 text-sm font-medium rounded-md"
                                    )}
                                >
                                    <item.icon
                                        className={classNames(
                                            item.current ? "text-gray-300" : "text-gray-400 group-hover:text-gray-300",
                                            "mr-3 flex-shrink-0 h-6 w-6"
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="flex flex-shrink-0 bg-gray-700 p-4">
                        <a href="#" className="group block w-full flex-shrink-0">
                            <div className="flex items-center">
                                <DesktopWalletButton />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    };

    const MainBody = () => {
        return (
            <main className="flex-1 h-full bg-[#0F1114]">
                <div className="pt-2">
                    <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 md:px-8">
                        {/* Replace with your content */}
                        <div className="py-4">{children}</div>
                        {/* /End replace */}
                    </div>
                </div>
            </main>
        );
    };

    const TransparentBlackout = () => {
        return (
            <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
        );
    };

    return (
        <>
            <div>
                <HeadInfo />
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                        <TransparentBlackout />

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                                            <button
                                                type="button"
                                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <MobileSidebarHeaderMenu />s
                                    <MobileSidebarBottomMenu />
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
                        </div>
                    </Dialog>
                </Transition.Root>

                <DesktopSidebarMenu />
                <div className="flex flex-1 flex-col md:pl-64">
                    <MobileHeader />
                    <MainBody />
                </div>
            </div>
        </>
    );
}
