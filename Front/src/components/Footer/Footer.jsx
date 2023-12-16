import React from 'react';

const Footer = () => {
    return (
        <footer className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">

                    <p className="mt-2 text-sm text-gray-500"></p>
                </div>

                <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">


                </div>
            </div>
            <div className="bg-gray-100">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-gray-500 text-sm text-center sm:text-left">© 2023 Foto Album — Made with ❤️ by
                        <a href="http://riccardonestola.com" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@riccardonestola</a>
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
