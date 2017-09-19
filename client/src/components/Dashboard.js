import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Form from './Form';


class Dashboard extends React.Component {
  state = { menus: [], showForm: false }

  componentDidMount() {
    axios.get('/api/menus')
      .then( res => this.setState({ menus: res.data }) )
  }


    form() {
        return <Form submit={this.submit}/>
    }

    submit = (menu) => {
      let { menus } = this.state;
      axios.post('/api/menus', { menu } )
        .then( res => this.setState({ menus: [{...res.data}, ...menus], showForm: false }) )
        .catch( e => console.log(e.response.data.errors) )
      }


    toggleForm = () => {
        this.setState( state => {
          return { showForm: !state.showForm }
        })
    }

    render() {
      let { showForm } = this.state;
      return (
        <div>
          <h2>Menus</h2>
          <button onClick={this.toggleForm}>{ showForm ? 'Hide' : 'Show' } form</button>
          { showForm ? this.form() : this.show() }
        </div>
      )
    }

  //RENAME render to show()
  show() {
    let { menus } = this.state;
      return (
        <ul>
          { menus.map( m =>
              <li key={m.id}>
                <Link to={`/menus/${m.id}`}>{m.name}</Link>
              </li>
            )
          }
        </ul>
      )
    }

  }


export default Dashboard;
