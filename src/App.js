import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Tachyons from 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const app = new Clarifai.App({
  apiKey: '45e82bb5b13741b8b40969a2047d7d4b'
 });

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  }



  componentDidMount() {
    fetch('http://localhost:3000')
    .then(response=> response.json())
    .then(console.log)
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.user,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const height = Number(image.height);
    const width = Number(image.width);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
      isSignedIn: false
    }
  }



  displayFacebox = (box) => {
    this.setState ({box: box})
  }

  onInputChange = (event) => {
    this.setState({input:  event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input
    )
    .then(
    function(response) {
      this.displayFacebox(this.calculateFaceLocation(response));
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    } this.setState({route: route})
  }

  render() {
  return (
    <div className="App">
      <Particles
                className="particles"
                params={{
                    particles: {
                        number: {
                          value: 70,
                          density: {
                            enable: true,
                            value_area: 800
                          }
                        }
                    }
                }} />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
      { 
        this.state.route === 'home'
          ? <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition imageURL={this.state.imageURL} box={this.state.box}/>
        </div>
          : (this.state.route === 'signin' ? 
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          :
          <Register loadUser={this.loadUser}  onRouteChange={this.onRouteChange} />
          )
          
      }
    </div>
  )
}} 

export default App;

// Heads up that the clarifai API has been updated since I made the next video. You will get an error using Clarifai.DETECT_FACE,  it appears to have changed to Clarifai.FACE_DETECT_MODEL (Read more about it here: https://clarifai.com/developer/guide).

// Also, the URL in the next video has also been updated. Keep this in mind as you go through the exercise:



// app.models
// .predict(
// Clarifai.COLOR_MODEL,
//     // URL
//     "https://samples.clarifai.com/metro-north.jpg"
// )
// .then(function(response) {
//     // do something with responseconsole.log(response);
//     },
//     function(err) {// there was an error}
// );