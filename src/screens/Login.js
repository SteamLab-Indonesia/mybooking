import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import Spinner from './Spinner';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});



class InputForm extends React.Component {
  state = {
    email: '',
    password: '',
    complains: '',
    loading: false,
  };

  componentWillMount() {
    // this.setState({loading: true});
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
      console.log('auth changed');
      if(user) {
        console.log(user.emailVerified)
        this.props.history.push('/dashboard')
        // this.setState({loading: false});
        console.log('no need to return!');
      } else {
        this.props.history.push('/login');
      }
    })
  }

  handleChange = name => event => {
    this.setState({
        [name]: event.target.value,
    });
  };

    signIn = e => {
        e.preventDefault();
        // console.log(this.state.password);
        if(this.state.password.length<8){
        console.error("Password length less than 8!");  
        } else {
          let email = this.state.email;
          let password = this.state.password
          this.setState({
            loading: true
          })
          firebase.auth().signInWithEmailAndPassword(email, password)          
          .then(() =>{
            console.log("Signed in successfully");
            this.setState({
              loading: false
            });
            const db = firebase.firestore();
            const userRef = db.collection("users").add({
              email: this.state.email,
              // password: this.state.password,
              address: this.state.address,
              complains: this.state.complains,
              })
            this.props.history.push("/users");
          })
          .catch((error) => {
            // Handle Errors here.
            console.log(error);
            // ...
          });

        }
        
        // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        //   // Handle Errors here.
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   // ...
        // });
      };
    
      changeView = () => {
        this.props.history.push("/signup");
      }
  

  render() {
    const { classes } = this.props;

    return (
      <div className="inputform">
        <Spinner status={this.state.loading} />
        <form>
          <Grid container spacing={2}>
            <Grid className="fname" item xs={12} sm={6}>
              <TextField
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                autoFocus
                onChange={this.handleChange('email')}
              />
            </Grid>
            <Grid className="lname" item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                onChange={this.handleChange('password')}
              />
            </Grid>
            <Grid className="complains" item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="complains"
                label="Complains *"
                name="complains"
                autoComplete="Complains *"
                onChange={this.handleChange('complains')}
              />
            </Grid>
          </Grid>
          <Button
            onClick={this.signIn}
            id="submitBtn"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
         </div>
    );
  }
}

InputForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputForm);