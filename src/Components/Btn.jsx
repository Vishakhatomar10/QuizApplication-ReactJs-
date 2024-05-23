function Btn(props) {
    return (
        <button style={{
            backgroundColor: "#0096FF",
            borderRadius: "5px ",
            border: "none",
            color: "white",
            padding: "8px 20px"
        }}
            className={props.className}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}>{props.name}

        </button>
    )
}

export default Btn;