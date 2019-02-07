import React, { Component } from "react";
import "./App.css";
import logoTva from "./assets/img/tva.png";

class App extends Component {
  state = {
    htAmount: "",
    ttcAmount: "",
    tvaRate: "20",
    tvaAmount: ""
  };

  tvaOptions = () => {
    const tvaRates = [20, 19.6, 10, 7, 5.5, 2.1]; // Tableau contenants les différents taux de TVA
    return tvaRates.map((tvarate, i) => (
      <option key={i} value={tvarate}>
        {tvarate}
      </option>
    ));
  };

  convertCurrency = (amount, fromRate, toRate) => {
    return ((toRate / fromRate) * amount).toFixed(2);
  };

  handleChange = event => {
    const input = event.target;
    const name = input.name;
    const value = input.value;

    const newState = {};
    newState[name] = value; // Ajout de la valeur modifiée à la clé dont le nom correspond au 'name' donné aux éléments select et input

    const element = document.getElementById(name); // Pour ajouter la classe red sur l'élément lorsque l'on ne saisit pas un nombre
    // Référence : http://www.calculertva.com/)
    switch (name) {
      case "htAmount":
        if (!isNaN(value)) {
          newState.ttcAmount = (value * (1 + this.state.tvaRate / 100)).toFixed(2);
          newState.tvaAmount = ((value * this.state.tvaRate) / 100).toFixed(2);
          element.classList.remove("red");
        } else {
          newState.ttcAmount = "";
          element.classList.add("red");
        }
        break;
      case "ttcAmount":
        if (!isNaN(value)) {
          newState.htAmount = (value / (1 + this.state.tvaRate / 100)).toFixed(2);
          newState.tvaAmount = ((newState.htAmount * this.state.tvaRate) / 100).toFixed(2);
          element.classList.remove("red");
        } else {
          newState.htAmount = "";
          element.classList.add("red");
        }
        break;
      default:
        // "tvaRate"
        newState.ttcAmount = (this.state.htAmount * (1 + value / 100)).toFixed(2);
        newState.tvaAmount = ((this.state.htAmount * value) / 100).toFixed(2);
    }
    this.setState(newState);
  };

  render() {
    return (
      <div className="container">
        <header>
          <h1>Calcul de TVA</h1>
        </header>
        <section>
          <div className={"cercle"}>
            <img alt="logoTva" className={"logo"} src={logoTva} />
          </div>
        </section>
        <form>
          <div className="inputBox">
            <span>Montant HT</span>
            <input
              id={"htAmount"}
              type="text"
              placeholder="Enter amount"
              name={"htAmount"}
              value={this.state.htAmount}
              onChange={this.handleChange}
            />
          </div>
          <div className="inputBox">
            <span>Montant TTC</span>
            <input
              id={"ttcAmount"}
              type="text"
              placeholder="Enter amount"
              name={"ttcAmount"}
              value={this.state.ttcAmount}
              onChange={this.handleChange}
            />
          </div>
          <div className="inputBox">
            <span>Taux de TVA</span>
            <select value={this.state.tvaRate} name={"tvaRate"} onChange={this.handleChange}>
              {this.tvaOptions()}
            </select>
          </div>
          <div className="equal">{" = "}</div>
          <div className="inputBox">
            <span>Montant de la TVA</span>
            <input id={"tvaAmount"} type="text" placeholder="0,00" name={"tvaAmount"} readOnly value={this.state.tvaAmount} />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
