import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import firebase from '../libs/firebase';
import {getAllUser} from '../libs/Users';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    marginLeft: 0,
    paddingLeft: 0,
    // paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '100%',
    height: '700px',
  },
  fontsize: {
    fontSize: '50px',
  },
  PaperSize: {
    width: '40%',
    height: '700px',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // PaperSize2: {
  //   marginBottom: '30px',
  //   marginLeft: '30px',
  //   width: '1000px',
  //   height: '155px',
  // },

});

class QueueList extends Component {

  componentWillMount() {
    getAllUser((email_callback) => {
      this.setState({
        userData: email_callback,
      })
    })
    const auth = firebase.auth();

    auth.onAuthStateChanged(user => {
      // var users = firebase.auth().currentUser;
      console.log('auth changed');
      if(user) {
        console.log(user.emailVerified)
        this.props.history.push('/queuelist')
        // this.setState({loading: false});
        console.log('no need to return!');
      } else {
        this.props.history.push('/login');
      }
    })
  }

  logOut = (e) => {
    const auth = firebase.auth();
    e.preventDefault();
    auth.signOut().then(() => {
      console.log('logout succesfully');
      this.props.history.push("/");
    })
  }

  deleteBtn(data) {
    console.log(data);
    const db =  firebase.firestore();
    db.collection("users").doc(data).delete().then(() => {
      console.log("Document successfully deleted!");
      document.location.reload();
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }

  state = {
    email: '',
    password: '',
    address: '',
    number: 0,
    userData: [],
    open: false,
  };

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  addQueue = () => {
    this.props.history.push("/signup");
  }

  render() {
    const { classes } = this.props;

    return (
      <div id="">
      <Button onClick={this.logOut} variant="contained" className={classes.button}>
          Log Out
      </Button>
      <div>
        <Button onClick={this.addQueue} id="plusqueue" variant="outlined" color="primary">
          + Queue
        </Button>
      </div>
      <Paper>  
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Complains</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.userData.map((user,index) =>
            (
              <TableRow key={user.name}>
                <TableCell component="th" scope="row">
                  {user.number}
                  {index+1}
                </TableCell>
                <TableCell align="right">{user.firstname+' '+user.lastname}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.address}</TableCell>
                <TableCell align="right">{user.complains}</TableCell>
                <TableCell><Button onClick={() => this.deleteBtn(user.userid)}>Arrived</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Paper>

          {/* {
            this.state.userData.map((user) =>{
              return(
            <Grid item>
            <Paper className={classes.PaperSize} elevation={1}>
              <Typography variant="h5" component="h3">
                {user.email}
              </Typography>
              <Typography component="p">
                {user.number}
              </Typography>
              <Button>
              </Button>
              <Button onClick={() => this.deleteBtn(user.userid)} variant="contained" className={classes.button}>
                Delete
              </Button>
            </Paper>
          </Grid>         
              )
            })
            
          } */}

        {/* <Grid container className={classes.root}>
          <Grid item>
            <Paper className={classes.PaperSize} elevation={1}>
              <Typography variant="h5" component="h3">
                4001
              </Typography>
              <Typography component="p">
                Counter 5
              </Typography>
            </Paper>
          </Grid>            
          <Grid item>
            <Grid
              container
              spacing={0}
              className={classes.demo}
              alignItems='center'
              direction='column'
              justify='center'
            >
              <Grid item>
                <Paper elevation={1} className={classes.PaperSize2}>
                  <Typography variant="h5" component="h3">
                    1308
                  </Typography>
                  <Typography component="p">
                    Counter 2
                  </Typography>
                </Paper>
              </Grid>
              <Grid item id="base">
                <Paper  elevation={1} className={classes.PaperSize2} >
                  <Typography variant="h5" component="h3">
                    2001
                  </Typography>
                  <Typography component="p">
                    Counter 3
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper  elevation={1} className={classes.PaperSize2}>
                  <Typography variant="h5" component="h3">
                    3001
                  </Typography>
                  <Typography component="p">
                    Counter 4
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper  elevation={1} className={classes.PaperSize2}>
                  <Typography variant="h5" component="h3">
                    4001
                  </Typography>
                  <Typography component="p">
                    Counter 5
                  </Typography>
                </Paper>
              </Grid>                                          
            </Grid>
          </Grid>

        </Grid>                 */}
      </div>
    );
  }
};
export default withStyles(styles)(QueueList);