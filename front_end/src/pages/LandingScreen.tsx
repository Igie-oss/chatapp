import { Link } from "react-router-dom";

const HomePage = () => {
      return (
        <div className="flex flex-col min-h-screen bg-white text-gray-800">
          <header id="header" className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold">Chatmiggle</h1>
            </div>
            <nav className="space-x-4">
              <a className="text-gray-800 hover:text-gray-600" href="#header">
                Home
              </a>
              <a className="text-gray-800 hover:text-gray-600" href="#features">
                Features
              </a>
              <a className="text-gray-800 hover:text-gray-600" href="#testimonal">
                Testimonials
              </a>
            </nav>
          </header>
          <main className="flex flex-1 flex-col items-center justify-center text-center px-4 sm:px-6 py-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-none font-extrabold text-gray-900 tracking-tight">
              Welcome to Chatmiggle
            </h2>
            <p className="mt-2 text-lg sm:text-xl lg:text-2xl font-thin text-gray-700">
              The best place to enjoy conversations with friends and family.
            </p>
            <Link to="/login" className="mt-8 px-8 border !py-2 border-transparent !text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
              Get started
            </Link>
          </main>
          <section id="features" className="px-6 py-16 bg-gray-100">
            <h2 className="text-2xl font-bold text-center">Features</h2>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">Feature 1</h3>
                    <p className="mt-3 text-base leading-6 text-gray-500">
                      Description of the first feature of Chatmiggle.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">Feature 2</h3>
                    <p className="mt-3 text-base leading-6 text-gray-500">
                      Description of the second feature of Chatmiggle.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">Feature 3</h3>
                    <p className="mt-3 text-base leading-6 text-gray-500">
                      Description of the third feature of Chatmiggle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="testimonal" className="px-6 py-16">
            <h2 className="text-2xl font-bold text-center">Testimonials</h2>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <blockquote className="mt-2 text-sm text-gray-500">
                      <p>"Chatmiggle has been a game changer for our team."</p>
                    </blockquote>
                    <p className="mt-3 text-base font-semibold text-gray-900">Person 1</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <blockquote className="mt-2 text-sm text-gray-500">
                      <p>"We love using Chatmiggle for our daily communications."</p>
                    </blockquote>
                    <p className="mt-3 text-base font-semibold text-gray-900">Person 2</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <blockquote className="mt-2 text-sm text-gray-500">
                      <p>"Chatmiggle is the best chat app we've ever used."</p>
                    </blockquote>
                    <p className="mt-3 text-base font-semibold text-gray-900">Person 3</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold">Chatmiggle</h1>
            </div>
            <nav className="space-x-4 flex flex-col text-sm md:flex-row ">
              <a className="text-gray-800 hover:text-gray-600" href="#">
                Terms of Service
              </a>
              <a className="text-gray-800 hover:text-gray-600" href="#">
                Privacy Policy
              </a>
              <a className="text-gray-800 hover:text-gray-600" href="#">
                Support
              </a>
            </nav>
            <div className="space-x-4 flex">
              <Link to="#">
                <svg
                  className=" h-5 w-5 text-gray-800 hover:text-gray-600"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link to="#">
                <svg
                  className=" h-5 w-5 text-gray-800 hover:text-gray-600"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link to="#">
                <svg
                  className=" h-5 w-5 text-gray-800 hover:text-gray-600"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
            </div>
          </footer>
        </div>
    );
  };
  
  export default HomePage;


  