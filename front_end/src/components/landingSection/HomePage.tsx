const HomePage = () => {
    return (
      <section className=" w-screen h-screen flex flex-col pt-14 gap-10 items-center">
        <header className="w-full flex flex-col items-center">
          <h1 className="font-extrabold text-2xl mb-2 lg:text-3xl">
            WELCOME BACK
          </h1>
          <h5 className="font-semibold text-lg">
            Login your account to ChatMingle
          </h5>
          <p className="font-medium text-xs">Your Conversational Companion</p>
        </header>
      </section>
    );
  };
  
  export default HomePage;