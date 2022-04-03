import { makeStyles } from "@material-ui/core/styles/index";

const supportStyles = makeStyles(theme => ({
    buttonGradient: {
        padding: '8px 30px'
    },
    messageContent: {
        backgroundColor: 'black',
        borderRadius: '15px',
        marginBottom: '10px',
        display: 'flex',
        width: '100%',
        padding: '0px'
    },
    messageHeader: {
        width: '10%',
        fontSize: '20px',
        float: 'left',
        textAlign: 'center',
        margin: 'auto'
    },
    messageText: {
        width: '90%',
        float: 'left',
    },
    askButton: {
        fontSize: '20px',
        padding: '10px 20px',
    },
    closeButton: {
        fontSize: '20px',
        padding: '10px 20px',
    },
    inputField: {
        '& div:before': {
            borderBottom: 'none !important'
        }
    },
    noPadding: {
        paddingTop: 0,
        paddingBottom: 0
    }
}));

export default supportStyles;