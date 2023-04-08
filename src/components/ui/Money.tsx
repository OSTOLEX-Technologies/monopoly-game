const smallButtonStyle = {
    backgroundImage: `url("https://raw.githubusercontent.com/OSTOLEX-Technologies/monopoly-game/feature/layout/vault/button%20small.png")`,
    color: "#fff",
    fontFamily: "Orbitron",
    fontSize: "16px",
    height: "43px",
    width: "151px",
    margin: "10px",
    padding: 0,
    border: 0,
    outline: "none",
    cursor: "pointer",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "transparent",
};

export const Money = () => {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <p
                    style={{
                        fontFamily: "Orbitron",
                        fontWeight: "bold",
                        fontSize: "74px",
                        color: "white",
                    }}
                >
                    199.78$
                </p>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <button style={smallButtonStyle}>
                    <p style={{ paddingTop: "5px" }}>bankrupt</p>
                </button>
                <button style={smallButtonStyle}>
                    <p style={{ paddingTop: "5px" }}>trade</p>
                </button>
            </div>
        </div>
    );
}