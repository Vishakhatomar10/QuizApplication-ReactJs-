function InputField(props) {
    return (
        <>
            <label style={{ paddingBottom: "5px" }}>{props.label} </label>
            <input
                style={{ width: "100%", padding: ".370rem .65rem", border: "solid 1px #AEAEAE", borderRadius: "5px", marginBottom: "10px" }}
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.change}
                value={props.value}
            />
            {props?.emailError && <div className="text-danger">{props?.emailError}</div>}
        </>
    )
}
export default InputField