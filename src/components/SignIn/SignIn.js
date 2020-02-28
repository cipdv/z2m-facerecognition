import React from 'react';

class SignIn extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({
      signInEmail: event.target.value
    })
  }

  onPasswordChange = (event) => {
    this.setState({
      signInPassword: event.target.value
    })
  }

  onSubmitSignIn = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    } )
    .then(response => response.json())
    .then(user=>{
      if(user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })
  }



  render() {
    return (
      <div>
        <article className="br3 ba b--black-10 mv4 w-200 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" 
                name="email-address"  
                id="email-address"
                onChange={this.onEmailChange}
                />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" 
                name="password"  
                id="password"
                onChange={this.onPasswordChange}
              />
            </div>
            {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
          </fieldset>
          <div className="">
            <input 
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Sign in"
              onClick={this.onSubmitSignIn}
              />
          </div>
          <div className="lh-copy mt3">
            <p onClick={()=>this.props.onRouteChange('register')} className="f6 link dim black db">Register</p>
            
          </div>
        </form>
        </main>
        </article>
      </div>
    );
  }
  
}

export default SignIn;

{/* <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <article className="pa4 black-80" >
          <form action="sign-up_submit" method="get" accept-charset="utf-8" >
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" for="email-address">Email address</label>
              <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" for="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password" />
            </div>
            </fieldset>
            <div className="mt3">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign Up"/>
            </div>
          </form>
        </article>
      </article> */}