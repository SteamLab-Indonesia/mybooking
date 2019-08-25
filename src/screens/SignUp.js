import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
import './InputForm.css';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import Spinner from './Spinner';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
// import ReactPaper from './ReactPaper';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
    address: '',
    complains: '',
    firstname: '',
    lastname: '',
    id: 0,
    view: 'Signin',
    loading: false,
  };

  handleChange = name => event => {
    this.setState({
        [name]: event.target.value,
    });
  };

    addUser = e => {
        e.preventDefault();
        const db = firebase.firestore();

        // console.log(this.state.password);
        if(this.state.password.length<8){
        alert("Password length less than 8!");  
        } else {
          let email = this.state.email;
          let password = this.state.password
          this.setState({
            loading: true
          });
          firebase.auth().createUserWithEmailAndPassword(email, password)          
          .then((cred) => {
            let currentId = this.state.id;
            let newId = currentId+1;
            this.setState({id: newId});
            
            var user = firebase.auth().currentUser;

            user.sendEmailVerification().then(() => {
              // Email sent.
              console.log(user);
                const userRef = db.collection("users").add({
                  email: this.state.email,
                  // password: this.state.password,
                  address: this.state.address,
                  complains: this.state.complains,
                  userid: cred.user.uid
                })
                .then(docRef => {
                  const userRef = db.collection("users").doc(docRef.id).set({
                    email: this.state.email,
                    address: this.state.address,
                    complains: this.state.complains,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    userid: docRef.id,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                  });

                  const biggestQueueNumber = db.collection("queue").orderBy('number', 'desc').limit(1).get().then((snapshot) => {
                    console.log(snapshot);
                    console.log(snapshot.docs[0].data().number);
                    const queueRef = db.collection("queue").add({
                      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                      user: db.collection('users').doc(docRef.id),
                      number: snapshot.docs[0].data().number+1,
                    })  
                  });

                });                  
                console.log("Created a new user successfully");
                this.setState({loading: false});
                this.props.history.push("/dashboard");
            })
              
            }).catch((error) => {
              console.log(error);
            });            
          
      }
};
    
  changeView = () => {
      this.props.history.push("/login");
  }
  

  render() {
    const { classes } = this.props;

    return (
      <div className="inputform">
      <Spinner status={this.state.loading}/>
      <h5>Click the button below to navigate to Login Page</h5>
      {/* <Button onClick={this.changeView} variant="contained" color="primary" className={classes.button}>
          Login
      </Button> */}

        <form>
          <Grid container spacing={2}>
            <Grid className="fname" item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={this.handleChange('firstname')}
              />
            </Grid>
            <Grid className="lname" item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={this.handleChange('lastname')}
              />
            </Grid>
            <Grid className="emailaddress" item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                // autoComplete="email"
                onChange={this.handleChange('email')}
              />
            </Grid>
            <Grid className="password" item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange('password')}
              />
            </Grid>
            <Grid className="address" item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="complains"
                label="Address *"
                name="address"
                autoComplete="Address *"
                onChange={this.handleChange('address')}
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
            onClick={this.addUser}
            id="submitBtn"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        {/* <TextField
             id="standard-name"
             label="Email"
             type="email"
             className={classes.textField}
             onChange={this.handleChange('email')}
             margin="normal"
           />
           <TextField
             id="standard-name"
             label="Password"
             type="password"
             className={classes.textField}
             onChange={this.handleChange('password')}
             margin="normal"
           />

           <TextField
             id="standard-name"
             label="Address"
             className={classes.textField}
             onChange={this.handleChange('address')}
             margin="normal"
           />

           <TextField
             id="standard-name"
             label="Complains/Keluhan"
             className={classes.textField}
             onChange={this.handleChange('complains')}
             margin="normal"
           />

          <Button onClick={this.addUser} variant="contained" className={classes.button}>
              SignUp
          </Button> */}

         </div>
    );
  }
}

InputForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputForm);