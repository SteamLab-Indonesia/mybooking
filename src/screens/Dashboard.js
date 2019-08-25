import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Paper from '@material-ui/core/Paper';
import firebase from '../libs/firebase';
import {getUser, getUserQueue} from '../libs/Users';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    padding: theme.spacing(3, 2),
  },
  container: {
    width: '100%',
  },
  paper: {
    height: 185,
    width: '85%',
    textAlign: 'center',
    justifyContent: 'center',
    verticalAlign: 'center',
    marginRight: 70,
  },
  paper2: {
    height: 105,
    width: '70%',
    textAlign: 'center',
    justifyContent: 'center',
    verticalAlign: 'center',
    marginTop: 30,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class Dashboard extends React.Component {
  state = {
    open: false,
    userNum: 0,
    userData: [],
    queueNumber: '',
    username: '',
  };

  componentWillMount() {
    const auth = firebase.auth();

    auth.onAuthStateChanged(user => {
      console.log('auth changed');
      if(user) {
        console.log(user.email);
        this.setState({username: user.email});
        getUser(user.email).then((data) => {
          this.setState({userData: data});
          console.log(this.state.userData);
        })
        .catch(err => {
          console.log(err);
        });

        getUserQueue(user.email).then((data) => {
          this.setState({queueNumber: data.number});
          console.log(this.state.queueNumber);
        }
        )
        .catch(err => {
          console.log(err);
        })

        this.props.history.push('/dashboard')
        console.log('no need to return!');
      } else {
        this.props.history.push('/login');
      }
    })
  }
  
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  navigate = (url) => {
    this.props.history.push(`${url}/`)
  }

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Dashboard', 'QueueList'].map((text, index) => (
              <ListItem onClick={() => this.navigate(text)} button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Setting', 'Logout'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main style={{width:'100%'}}
        //   className={classNames(classes.content, {
        //     [classes.contentShift]: open,
        //   })}
        >
          <div className={classes.drawerHeader} />
            <div className={classes.container}>
            <Paper className={classes.paper} elevation={1}>
              <Typography variant="h2" component="h3">
               108
              </Typography>
            </Paper>
            </div>
            <div className={classes.container}>
              <Paper style={{width: '100%'}} className={classes.paper2} elevation={1}>
                <Typography variant="h5" component="h3">
                  Waiting: {this.state.queueNumber}
                </Typography>
                <Typography variant="h5" component="h3">
                  EstimatedTime: ...
                </Typography>
              </Paper>
            </div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Dashboard);
