import { useEffect } from "react";
import "./loginImage.css";
export default function LoginImage(props) {
  useEffect(() => {
    const loginImage = document.querySelector(".loginImage");
    if (props.location.pathname === "/auth") {
      loginImage.style.setProperty("--after-bg", "url(image/A_Sunday_on_La_Grande_Jatte,_Georges_Seurat,_1884.png)");
      loginImage.style.setProperty("--clipPath", "polygon(85% 15%, 100% 15%, 100% 100%, 0 100%, 0 0, 85% 0)");
    } else if (props.location.pathname === "/auth/register") {
      loginImage.style.setProperty("--after-bg", "url(/image/The-Avenue-at-Middelharnis.jpg)");
      loginImage.style.setProperty("--clipPath", "polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 15%, 15% 15%)");
    }
  }, [props.location]);
  return (
    <div className="loginImage">
      &nbsp;
      <div id="helper">
        <div>
          {props.location.pathname === "/auth" ? (
            <>
              <h2>
                <i>
                  A Sunday Afternoon on the Island of <br />
                  La Grande Jatte
                </i>
              </h2>
              <p>
                <i>by Georges Seurat</i>
              </p>
            </>
          ) : (
            <>
              <h2>
                <i>The Avenue at Middelharnis</i>
              </h2>
              <p>
                <i>by Meindert Hobbema</i>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
