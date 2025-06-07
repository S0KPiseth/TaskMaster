import { useDispatch } from "react-redux";
import { changeColor, removeByIDX } from "../../application-state/tagSlice";
import getTextColor from "../../helper/getTextColor";
function TagContent({ tagElement, index }) {
  const dispatcher = useDispatch();
  const handleColorChange = (e) => {
    const textColor = getTextColor(e.target.value);
    dispatcher(changeColor({ idxToUpdate: index, updatedColor: e.target.value, improveTexColor: textColor }));
  };

  return (
    <div
      style={{
        marginRight: "5px",
        position: "relative",
        paddingLeft: "5px",
        borderRadius: "1rem",
        height: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        columnGap: "5px",
        backgroundColor: "var(--color-primary-100)",
      }}
    >
      <input type="color" id="style2" onChange={handleColorChange} defaultValue={tagElement.color} />
      <p
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-primary-700)",
          fontWeight: "--font-semibold",
          paddingRight: "30px",
        }}
      >
        {tagElement.tagname}
      </p>
      <button
        style={{
          color: "var(--color-primary-700)",
          fontSize: "var(--text-xs)",
          backgroundColor: "var(--color-primary-200)",
          border: "0",
          position: "absolute",
          right: "0",
          borderRadius: "2rem",
          height: "25px",
          width: "25px",
        }}
        onClick={() => dispatcher(removeByIDX({ index: index }))}
      >
        &#10006;
      </button>
    </div>
  );
}
export default TagContent;
