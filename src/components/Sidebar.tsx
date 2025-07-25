import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuData = [
    {
      name: "Search",
      icon: "/assets/icons/search.png",
      link: "/search",
      iconClass: "h-[26px] w-[29px]",
    },
    {
      name: "Home",
      icon: "/assets/icons/home.png",
      link: "/",
      iconClass: "h-[29px] w-[29px]",
    },
    {
      name: "TV Shows",
      icon: "/assets/icons/tv-show.png",
      link: "/tv-show",
      iconClass: "h-[29px] w-[29px]",
    },
    {
      name: "Movies",
      icon: "/assets/icons/movies.png",
      link: "/movies",
      iconClass: "h-[29px] w-[29px]",
    },
    {
      name: "Genres",
      icon: "/assets/icons/genres.png",
      link: "/genres",
      iconClass: "h-[29px] w-[29px]",
    },
    {
      name: "Watch Later",
      icon: "/assets/icons/watch.png",
      link: "/watch-later",
      iconClass: "h-[26px] w-[29px]",
    },
  ];

  return (
    <div className="text-white relative group">
      <div className="text-white relative group">
        <div
          className={`
      absolute top-0 left-0 z-[9] h-[100vh] w-[100vw]
      opacity-0 group-hover:opacity-100
      transition-opacity duration-500
      pointer-events-none
      bg-gradient-to-r from-black/80 to-transparent
    `}
        />
      </div>
      <ul className="2xl:pt-[56px] pt-[36px] relative z-[10] pl-[38px] group-hover:w-[360px] w-[116px] overflow-hidden transition-all duration-400 h-[100vh] bg-transparent group-hover:bg-black">
        <li className="flex justify-center 2xl:h-[82px] h-[60px] 2xl:mb-[40px] mb-[20px] w-[100px]">
          <div className="flex items-center gap-[20px]">
            <img
              src="/assets/Sung-Gi-Hoon.jpg"
              alt="user"
              className="rounded-full 2xl:w-[82px] w-[60px] 2xl:h-[82px] h-[60px] hidden group-hover:block object-cover"
            />
            <div className="text-[32px] font-bold hidden group-hover:block ">
              Daniel
            </div>
          </div>
        </li>
        {menuData.map((item, index) => {
          const isActive = location.pathname === item.link;

          return (
            <li key={index} className="w-[300px] h-[82px]">
              <Link
                to={item.link}
                className={`group/item flex items-center h-full w-full no-underline`}>
                <div
                  className={`
                    h-[82px] w-[82px] flex items-center justify-center cursor-pointer
                    transition-all duration-400 rounded-[100%]
                    ${isActive ? "bg-[#3B486D] h-[72px] rounded-[12px]" : ""}
                    group-hover:h-[72px] group-hover:rounded-tr-none group-hover:rounded-br-none
                    group-hover:rounded-[12px] group-hover/item:bg-[#3B486D]
                  `}>
                  <img
                    src={item.icon}
                    alt="menu-icon"
                    className={item.iconClass}
                  />
                </div>
                <div
                  className={`
                    text-[30px] w-[230px] pl-[25px] h-[72px] flex items-center font-[300]
                    text-[#F1F1F1] transition-all duration-400
                    ${
                      isActive
                        ? "opacity-100 visible bg-[#3B486D]"
                        : "opacity-0 invisible"
                    }
                    group-hover:opacity-100 group-hover:visible group-hover/item:bg-[#3B486D]
                    rounded-r-[12px]
                  `}>
                  {item.name}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="absolute 2xl:bottom-[68px] bottom-[20px] text-[#858688] text-[24px] font-bold pl-[60px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-400 z-[10]">
        <div className="cursor-pointer">Language</div>
        <div className="cursor-pointer">get help</div>
        <div className="cursor-pointer">Exit</div>
      </div>
    </div>
  );
};

export default Sidebar;
