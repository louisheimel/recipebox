import React, { Component } from 'react';
import './App.css';

class EditModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
              <div>
                <AddRecipeModal recipe={this.props.recipe} ingredients={this.props.ingredients.join(', ')} edit={true} update={this.props.update}/>
              </div>
          );
  }
}

class IngredientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    return (
        <div>
          <ul>
            {this.props.ingredients.map((ingredient) => { return <li>{ingredient}</li> })}
          </ul>
          <button className="btn btn-link" onClick={this.toggleEdit}>Edit</button><button className="btn btn-link" onClick={() => this.props.delete(this.props.recipe)}>Delete</button>
          {this.state.showModal && <EditModal  recipe={this.props.recipe} ingredients={this.props.ingredients} update={this.props.update} />}
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
            <button className="btn btn-link" onClick={this.showIngredients}>{this.props.recipe.description}</button>
            {this.state.showIngredients ?  
                                                  <IngredientsList edit={this.props.edit} delete={ this.props.delete} update={this.props.update} recipe={this.props.recipe.description} ingredients={this.props.recipe.ingredients} />
                                                 : null}
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
                                                  return <li><Recipe update={this.props.update} edit={this.props.edit} delete={this.props.delete} recipe={recipe}  /></li>
                                                })}
          </ul>
        </div>
        );
  }
}
class AddRecipeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: this.props.recipe || '',
      ingredients: this.props.ingredients || '',
    }
    this.inputChange = this.inputChange.bind(this);
  }

  inputChange(e) {
    let obj = {};
    const name = e.target.getAttribute('name');
    obj[name] = e.target.value;
    this.setState(obj);
  }

  render() {
    const style = {
      marginTop: '20px'
    }

    return (
            <div style={style} className="well well-sm">
                {this.props.edit && [<p><b>Recipe</b></p>,
                  <p><b>{this.state.recipe}</b></p>]}
      {!this.props.edit && [<label for="recipe" className="form-label">Recipe</label>,
                <input onChange={this.inputChange} value={this.state.recipe} name="recipe" placeholder="Recipe" className="form-control" />]}
                <label for="ingredients" className="form-label">Ingredients (comma separated)</label>
                <input onChange={this.inputChange} value={this.state.ingredients} name="ingredients" placeholder="Ingredients" className="form-control" />
                <button onClick={() => { 
                    if(this.props.edit) { this.props.update(this.state.recipe, this.state.ingredients.split(',').map((e) => e.trim())) } else { this.props.submit(this.state.recipe, this.state.ingredients.split(',').map((e) => e.trim())) }
                } } className="btn btn-primary">Submit</button>
              
            </div>
          );
  }
}
class RecipeBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      recipes: [
        {
          description: 'wontons',
          ingredients: ['won', 'tons']
        },
        {
          description: 'eggrolls',
          ingredients: ['egg', 'rolls']
        }
      ]
    }
    this.setState({
      recipes: this.state.recipes.sort((a, b) => { return (a.description < b.description) ? -1 : (a.description > b.description ? 1 : 0) } ),
    })
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.submitRecipe = this.submitRecipe.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
  }

  edit(recipe) {
    alert(recipe);
  }

  delete(recipe) {
    this.setState({
      recipes: this.state.recipes.filter((e) => { return e.description !== recipe; })
    });
  }

  toggleModal() {
    this.setState({
      modalShow: !this.state.modalShow
    })
  }

  submitRecipe(recipe, ingredients) {
    this.setState({
      recipes: this.state.recipes.concat({
        description: recipe,
        ingredients: ingredients
      }).sort((a, b) => { return (a.description < b.description) ? -1 : (a.description > b.description ? 1 : 0) } ),
    });
  }
  updateRecipe(recipe, ingredients) {
    this.setState({
      recipes: this.state.recipes.filter((e) => { return e.description !== recipe; })
                                 .concat({
                                   description: recipe,
                                   ingredients: ingredients
                                 }).sort((a, b) => { return (a.description < b.description) ? -1 : (a.description > b.description ? 1 : 0) } ),

    })
  }

  render() {
    return (
      <div>
        <h1>Recipe Box</h1>
        <RecipeList update={this.updateRecipe} edit={this.edit} delete={this.delete} recipes={this.state.recipes} />
        <button className="btn btn-primary" onClick={this.toggleModal}>Add Recipe</button>

        {this.state.modalShow && <AddRecipeModal submit={this.submitRecipe}  />}
      </div>
    );
  }
}

class App extends Component {
  
  render() {
    const styles = {
      margin: '20px',

    }
    return (
        <div style={styles} >
          <RecipeBox/>
        </div>
    );
  }
}

export default App;
