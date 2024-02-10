import React from "react";

const MainFooter: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="bg-[#E2E8F0]">
            <div className="max-w-screen-xl px-4 py-6 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                <nav className="flex flex-wrap justify-center -mx-5 -my-2">
                    <div className="px-5 py-2">
                        <p className="text-base leading-6 text-gray-500 hover:text-gray-900 cursor-pointer">
                            About
                        </p>
                    </div>
                    <div className="px-5 py-2">
                        <p className="text-base leading-6 text-gray-500 hover:text-gray-900 cursor-pointer">
                            Team
                        </p>
                    </div>
                    <div className="px-5 py-2">
                        <p className="text-base leading-6 text-gray-500 hover:text-gray-900 cursor-pointer">
                            Contact
                        </p>
                    </div>
                    <div className="px-5 py-2">
                        <p className="text-base leading-6 text-gray-500 hover:text-gray-900 cursor-pointer">
                            Terms
                        </p>
                    </div>
                </nav>
                <div className="flex justify-center mt-8 space-x-6">
                    <a href="https://web.facebook.com/helanka.singhapurage" target='_blank'
                       className="text-gray-400 hover:text-gray-500">
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd"
                                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </a>

                    <a href="https://www.linkedin.com/in/helanka-singhapurage/" target='_blank'
                       className="text-gray-400 hover:text-gray-500">
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                fillRule="evenodd"
                                d="M21.635 2H2.365C1.57 2 1 2.568 1 3.262v17.476C1 21.432 1.57 22 2.365 22h19.27C22.43 22 23 21.432 23 20.738V3.262C23 2.568 22.43 2 21.635 2zM8.738 19.333h-3.13V9.372h3.13v9.961zm-1.564-11.37h-.02c-1.037 0-1.662-.717-1.662-1.61 0-.924.645-1.611 1.64-1.611.995 0 1.661.687 1.682 1.61 0 .893-.625 1.61-1.64 1.61zm13.156 11.37h-3.128v-5.257c0-1.244-.444-2.09-1.556-2.09-1.067 0-1.696.717-1.977 1.421-.104.253-.13.603-.13.956v4.971h-3.13V9.372h3.015v1.194h.042c.42-.8 1.45-1.645 2.974-1.645 2.006 0 3.528 1.31 3.528 4.135v6.277z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </a>

                    <a href="https://github.com/HelankaS26" target='_blank'
                       className="text-gray-400 hover:text-gray-500">
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd"
                                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </a>
                </div>
                <hr className="my-6 border-[#CBD5E1]"/>
                <p className="mt-8 text-base leading-6 text-center text-[#334155]">
                    Copyright &copy; {currentYear}
                    &nbsp;
                    <span
                        className="font-bold text-xl text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-teal-300">
                        Library
                    </span>
                    &nbsp;
                    by Helanka. All rights reserved.
                </p>

            </div>
        </div>
    );
}

export default MainFooter;