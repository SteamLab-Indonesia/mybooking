import React,{Component} from 'react';
import {Paper, CircularProgress} from '@material-ui/core';


const styles = {
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
        margin: 10
    }
}

class Spinner extends Component {
        render() {
            if(this.props.status == true) {
                return(
                    <Paper style={styles.dialogBox} >
                        <CircularProgress style={styles.circularBox} />
                    </Paper>
                )   
            }
            else {
                return null;
            }
    }
            
}

export default Spinner;