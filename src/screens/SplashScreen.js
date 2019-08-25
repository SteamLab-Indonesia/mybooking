import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import CircularProgress from '@material-ui/core/CircularProgress';
import {CircularProgress} from '@material-ui/core';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: window.innerHeight,
        backgroundColor: 'lightblue'
    },
    dialogBox: {
        width: 60,
        height: 60,
        borderRadius: 10,
        position: 'absolute',
        float: 'left',
        zIndex: 1,
        left: '50%',
        marginTop: window.innerHeight * 0.3
    },
    circularBox: {
        margin: 10,
    }
    ,
    logo: {
        
    },
    logoimg: {
        width: '300px',
        height: '175px'
    }
}


class SplashScreen extends Component {

    componentWillMount() {
        setTimeout(() => {
            // this.props.history.push('/signup');
            this.props.history.push('queuelist')
        },4500)
        
    }

    render() {
            return(
                <div style={styles.container}>
                    <div style={styles.logo}>
                        <img style={styles.logoimg} src="images/logo.jpeg" />
                    </div>
                    {/* <Paper style={styles.dialogBox} > */}
                        <CircularProgress style={styles.circularBox} />
                    {/* </Paper> */}
                </div>
            )   
    }
}

export default SplashScreen;