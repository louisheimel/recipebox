import React, { Component } from 'react';
import './App.css';

class IngredientsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <ul>
            {this.props.ingredients.map((ingredient) => { return <li>{ingredient}</li> })}
          </ul>
          <button>Edit</button><button onClick={this.props.delete}>Delete</button>
        </div>
    )
  }
}
class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIngredients: false
    }
    this.showIngredients = this.showIngredients.bind(this);
  }

  showIngredients() {
    this.setState({
      showIngredients: !this.state.showIngredients
    })
  }

  render() {
    return (
          <div>
            <button onClick={this.showIngredients}>{this.props.recipe.description}</button>
            {this.state.showIngredients ?  <div>{
                                                  <IngredientsList delete={this.props.delete} ingredients={this.props.recipe.ingredients} />
                                                }</div> : null}
          </div>
        );
  }

}
class RecipeList extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <div>
          <ul>
            {this.props.recipes.map((recipe) => {
                                                  return <li><Recipe delete={this.props.delete} recipe={recipe}  /></li>
                                                })}
          </ul>
        </div>
        );
  }
}
class RecipeBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [
        {
          description: 'wontons',
          ingredients: ['won ', 'tons']
        },
        {
          description: 'eggrolls',
          ingredients: ['egg', 'rolls']
        }
      ]
    }
    this.delete = this.delete.bind(this);
  }

  delete(recipe) {
    this.setState({
      recipes: this.state.recipes.filter((e) => { return e.description !== recipe; })
    });
  }

  render() {
    return (
      <div>
        <h1>Recipe Box</h1>
        <RecipeList delete={this.delete} recipes={this.state.recipes} />
        <button>Add Recipe</button>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
        <div>
          <RecipeBox />
        </div>
    );
  }
}

export default App;
