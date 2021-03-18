import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "./actions/cartActions";

import car1 from "../images/car1.jpg";
import car2 from "../images/car2.jpg";
import car3 from "../images/car3.jpg";
import car4 from "../images/car4.jpg";
import car5 from "../images/car5.jpg";
import car6 from "../images/car6.jpg";
import car7 from "../images/car7.jpg";
import car8 from "../images/car8.jpg";
import car9 from "../images/car9.jpg";
import car10 from "../images/car10.jpg";

const cars = [car1, car2, car3, car4, car5, car6, car7, car8, car9, car10];
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warehouseState: "Loading...",
    };
  }

  handleClick = (id) => {
    this.props.addToCart(id);
  };

  async getAllProfiles() {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/revisions/allWarehouse`
      );
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async componentDidMount() {
    try {
      let warehouse = await this.getAllProfiles();
      this.setState({ warehouseState: warehouse });
    } catch (error) {
      console.log(error);
    }
  }

  /*
  render() {
    //this.state.warehouseState.replace("{content:");
    // let obj = JSON.parse(this.state.warehouseState);
    //  console.log(obj);
    // Object.keys(this.state.warehouseState).map(function(key) {
    //   console.log("key: " + key);
    //   console.log(
    //     "this.state.warehouseState[key]: " +
    //       this.state.warehouseState[key].toString()
    //   );
    // });
*/
  render() {
    // let str = this.state.warehouseState;
    // console.warn(xhr.responseText);
    console.log(JSON.stringify(this.state.warehouseState, null, 2));

    this.state.warehouseState.forEach((place) => {
      const { _id, name, location, cars } = place;
      console.log("ID", _id);
      console.log("name", name);
      console.log("location", location);

      cars.vehicles.forEach((vehicle) => {
        // nested loop
        const { _id, make, model } = vehicle; // some destructring
        console.log("ID", _id);
        console.log("make", make);
        console.log("model", model);
      });
    });

    const { cars } = { ...this.state.warehouseState };
    // console.log("_id: " + _id);
    // console.log("name: " + name);
    // console.log("lat: " + lat);
    // console.log("long: " + long);
    // const { lat, long } = { ...location };

    const { location, vehicles } = { ...cars };
    console.log("location: " + location);
    console.log("vehicles: " + vehicles);

    const { _id, make, model } = { ...vehicles };
    console.log("ID: ", _id);
    // console.log("name: ", name);
    console.log("make: ", make);
    console.log("model: ", model);

    /*
    vehicles.forEach((place) => {
      const { _id, name, location, cars } = place;
      console.log("ID", _id);
      console.log("name", name);
      console.log("location", location);

      cars.vehicles.forEach((vehicle) => {
        // nested loop
        const { _id, make, model } = vehicle; // some destructring
        console.log("ID", _id);
        console.log("make", make);
        console.log("model", model);
      });
    });
*/
    //console.log(JSON.stringify(this.state.warehouseState));
    //this.state.warehouseState.arrOfNumbers.;
    return (
      <div>
        {Array.isArray(this.state.warehouseState) ? (
          <h1>This is array </h1>
        ) : (
          <h1>{this.state.warehouseState}</h1>
        )}
      </div>
    );
  }

  // this.state.warehouseState === 'Loading...'?
  /* 
    const data = this.state.warehouseState;
    data.forEach((place) => {
      const { _id, name, location, cars } = place;
      console.log("ID", _id);
      console.log("name", name);
      console.log("location", location);

      cars.vehicles.forEach((vehicle) => {
        // nested loop
        const { _id, make, model } = vehicle; // some destructring
        console.log("ID", _id);
        console.log("make", make);
        console.log("model", model);
      });
    });
    */
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
