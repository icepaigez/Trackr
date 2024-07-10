import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
      <div className="flex items-center gap-4 text-[#111418]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-[#111418] text-sm sm:text-lg font-bold leading-tight tracking-[-0.015em]">Morning Star Express</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        {/* <label className="flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-[#637588] flex border-none bg-[#f0f2f4] items-center justify-center pl-4 rounded-l-xl border-r-0" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input
              placeholder="Search"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-full placeholder:text-[#637588] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              value=""
            />
          </div>
        </label> */}
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1972d2] text-white text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="truncate">Sign In</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
