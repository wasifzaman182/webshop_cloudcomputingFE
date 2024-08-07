import "./Input.css"

const Input = ({ name, type, value, changeHandler }) => {

    const options = [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Redux",
    ];
    const inputComponent =
        <label className="input-label">
            {name}:
            <input
                type="text"
                name="address"
                className="input-field"
                onChange={(e) => {
                    changeHandler(e.target.value);
                }}
                value={value}
                required
            />
        </label>

    const countryDropdown = <div className="select-container">
        <label className="select-label">
            Country:
        </label>
        <div className="select-arrow">
            <select className="select-field" onSelect={(e) => changeHandler(e.target.value)}>
                <option>Please choose a country</option>
                {options.map((option, index) => <option key={index} >{option}</option>)}
            </select>
        </div>
    </div>

    return (
        <div className="input-container">
            {type === "input" ? <>{inputComponent}</> : <>{countryDropdown}</>}
        </div>
    )
}

export default Input;
