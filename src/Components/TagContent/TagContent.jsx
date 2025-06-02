function TagContent({ removeTag, tagElement, index, tagUpdate }) {
  function color(e) {
    let temTag = tagUpdate.current;
    temTag[index] = [index, e.target.value];

    tagUpdate.current = temTag;
  }
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
      <input type="color" id="style2" onChange={color} defaultValue={tagElement.color} />
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
        onClick={() => removeTag(index)}
      >
        &#10006;
      </button>
    </div>
  );
}
export default TagContent;
