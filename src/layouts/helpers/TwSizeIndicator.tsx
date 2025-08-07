const TwSizeIndicator = () => {
  if (process.env.NODE_ENV === "development") {
    return (
      <div className="5xl:bg-fuchsia-200 fixed left-0 top-0 z-[9999] flex w-[30px] items-center justify-center bg-gray-200 py-[2.5px] text-[12px] uppercase text-black sm:bg-red-200 md:bg-yellow-200 lg:bg-green-200 xl:bg-blue-200 2xl:bg-pink-200 3xl:bg-violet-200 4xl:bg-purple-200">
        <span className="block sm:hidden">all</span>
        <span className="hidden sm:block md:hidden">sm</span>
        <span className="hidden md:block lg:hidden">md</span>
        <span className="hidden lg:block xl:hidden">lg</span>
        <span className="hidden xl:block 2xl:hidden">xl</span>
        <span className="hidden 2xl:block 3xl:hidden">2xl</span>
        <span className="hidden 3xl:block 4xl:hidden">3xl</span>
        <span className="5xl:hidden hidden 4xl:block">4xl</span>
        <span className="5xl:block hidden">5xl</span>
      </div>
    );
  } else {
    return null;
  }
};

export default TwSizeIndicator;
