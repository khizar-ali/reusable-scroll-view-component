import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import items from './data';
import ScrollView, { ScrollElement } from './scroller'

class App extends Component {
  scrollTo = (id) => {
    this._scroller.scrollTo(id)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
        {
          items.map(({ id, title }) => <button key={id.toString()} onClick={() => this.scrollTo(id)}>{title}</button>)
        }
        </div>
        <ScrollView ref={scroller => this._scroller = scroller}>
          <div className="scroller">
            {items.map(({id, title, description}) => {
              return (
                <ScrollElement id={id} key={id.toString()}>
                  <div className="item">
                    <h6>{title}</h6>
                    <p>{description}</p>
                  </div>
                </ScrollElement>
              );
            })}
          </div>
        </ScrollView>
      </div>
    );
  }
}

export default App
