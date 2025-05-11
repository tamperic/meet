import { Component } from "react";

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
        this.bgColor = null;
    }

    getStyle = () => {
        return {
            color: this.color,
            backgroundColor: this.bgColor,
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: this.color,
            borderRadius: "7px",
            fontWeight: "bolder",
            textAlign: "center",
            fontSize: "12px",
            padding: "10px",
            margin: "10px 0"
        };
    }

    render() {
        return(
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'rgb(0, 0, 255)';
        this.bgColor = 'rgb(220, 220, 255)';
    }
}

export { InfoAlert };