import "./auth.css";
import LoginImage from "../../Components/loginImage/LoginImage";
import { useLocation, Outlet } from "react-router-dom";
import gsap from "gsap";

import { Flip } from "gsap/Flip";
import { useLayoutEffect, useRef } from "react";
export default function UserAuthentication(props) {
  gsap.registerPlugin(Flip);
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = containerRef.current.children;
      const state = Flip.getState(boxes);

      if (props.location.pathname === "/auth/register") {
        boxes[0].style.order = 2;
        boxes[1].style.order = 1;
      } else if (location.pathname === "/auth") {
        console.log(boxes);
        boxes[0].style.order = 1;
        boxes[1].style.order = 2;
      }

      Flip.from(state, {
        duration: 0.5,
        ease: "power1.inOut",
        absolute: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [props.location.pathname]);

  return (
    <div className="loginDiv">
      <video autoPlay muted loop id="bgVideo">
        <source src="/video/vecteezy_abstract-animated-purple-and-blue-neon-waves_57366561.mp4" type="video/mp4" />
      </video>
      <a id="logo" href="/">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27.947 9.523a3.333 3.333 0 0 1 5.107 4.287L18.055 31.683a3.333 3.333 0 1 1 -5.107 -4.283z" fill="currentColor" />
          <path d="M5 21.233a3.333 3.333 0 1 1 6.667 0 3.333 3.333 0 0 1 -6.667 0" fill="green" />
        </svg>
        TASK-er
      </a>
      <div className="formWrapper" ref={containerRef}>
        <Outlet />
        <LoginImage location={props.location} />
      </div>
      <svg style={{ visibility: "hidden", position: "absolute" }} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="round">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
