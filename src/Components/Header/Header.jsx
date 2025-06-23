import { Authenticated } from "../AccountOptions/Authenticated";
import Unauthorized from "../AccountOptions/Unauthorized";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function Header({ showSidebarMobile }) {
  const searchBarRef = useRef(null);
  const searchResultsRef = useRef(null);
  const searchInput = useRef(null);
  const taskList = useSelector((state) => state.tasks.list);
  const [searchValue, setSearchValue] = useState("");
  const [choice, setChoice] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  useGSAP(() => {
    if (!searchInput && !searchResultsRef) return;
    //search bar change when focus
    const handleFocus = (e) => {
      e.target.style.borderColor = "transparent";
      e.target.classList.add("searchFocus");

      gsap.set(searchResultsRef.current, { transformOrigin: "bottom center" });
      gsap.to(searchResultsRef.current, {
        display: "block",
        height: "300px",
        borderRadius: "1.5rem",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleBlur = (e) => {
      e.target.style.borderColor = "var(--border-color)";
      e.target.classList.remove("searchFocus");

      gsap.to(searchResultsRef.current, {
        display: "none",
        height: "35px",
        ease: "power2.inOut",
        onComplete: () => {
          searchResultsRef.current.style.height = "0px";
        },
      });
    };

    searchInput.current.addEventListener("focus", handleFocus);
    searchInput.current.addEventListener("blur", handleBlur);

    //when user choose option in search
    if (choice) {
      navigate(`/Tasks/${choice._id}`);
      searchInput.current.value = choice.title;

      gsap.fromTo(
        `#task${choice._id}`,
        { backgroundColor: "var(--color-primary-50)" },
        {
          backgroundColor: "white",
          duration: 1,
          onStart: () => {
            searchInput.current.blur();
          },
          onComplete: () => {
            setChoice(null);
          },
        }
      );
    }

    return () => {
      //clean up
      searchInput.current.removeEventListener("focus", handleFocus);
      searchInput.current.removeEventListener("blur", handleBlur);
    };
  }, [choice]);

  const isAuthenticated = useSelector((state) => state.isAuth.isAuthenticated);

  return (
    <div className="header">
      <div>
        <button id="menuButton" onClick={showSidebarMobile}>
          <svg width="25px" height="25px" viewBox="0 0 0.531 0.531" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path d="M0.5 0.094v0.063H0.031V0.094zM0.031 0.313h0.469V0.25H0.031zm0 0.156h0.469v-0.063H0.031z" fill="currentColor" />
          </svg>
        </button>
        <p id="pageIndicator">{location.pathname.split("/")[1] || "Dashboard"}</p>
      </div>
      <div className="headerContent">
        <div>
          <label id="searchBar" ref={searchBarRef} onChange={(e) => setSearchValue(e.target.value)}>
            <div id="searchResult" ref={searchResultsRef}>
              &nbsp;
              {taskList
                .filter((task) => (searchValue ? task.title.startsWith(searchValue) : false))
                .map((e) => (
                  <p key={e._id} className="searchChoices" onClick={() => setChoice(e)}>
                    {e.title} <span>task</span>
                  </p>
                ))}
            </div>
            <input type="text" placeholder="Search..." id="searchInput" ref={searchInput} autoComplete="off" />
            <svg width="25px" height="25px" viewBox="0 0 0.6 0.6" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,0,0)">
              <path d="M0.275 0.475a0.2 0.2 0 1 0 0 -0.4 0.2 0.2 0 0 0 0 0.4" stroke="currentColor" strokeWidth={0.05} strokeLinecap="round" strokeLinejoin="round" />
              <path d="m0.525 0.525 -0.1 -0.1" stroke="currentColor" strokeWidth={0.05} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </label>
          {isAuthenticated && (
            <button className="notification">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6.667A5 5 0 0 0 5 6.667c0 5.833 -2.5 7.5 -2.5 7.5h15s-2.5 -1.667 -2.5 -7.5" />
                <path d="M11.442 17.5a1.667 1.667 0 0 1 -2.883 0" />
              </svg>
            </button>
          )}
        </div>
        {isAuthenticated ? <Authenticated /> : <Unauthorized />}
      </div>
    </div>
  );
}
export default Header;
