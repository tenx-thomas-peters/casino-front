import { makeStyles } from "@material-ui/core/styles/index";

const useStyles = makeStyles(theme => ({
    alert: {
        padding: theme.spacing(1),
        margin: theme.spacing(1, 0),
        border: '1px solid',
    },
    root: {
        backgroundColor: '#1e1f21',
        boxShadow: 'none',
        '& > *': {
            marginTop: theme.spacing(4),
          },
    },
    cardHeader: {
        backgroundImage: `url('/images/notice/noticeCardHeaderImg.png')`,
        height: 80,
        borderRadius: '10px',
        borderBottom: '6px solid #641609',
        marginBottom: '30px',
        backgroundColor: '#2e2e2e',
        backgroundSize: 'cover',
        '& span': {
            display: 'inline-block'
        },
        '& span:first-child': {
            fontSize: '30px',
            margin: '20px 5px 15px 20px',
        },
        '& span:first-child:first-letter': {
            textTransform: 'capitalize'
        },
        '& span:last-child': {
            fontSize: '15px',
            margin: '5px'
        }
    },
    cardContent: {
        backgroundColor: '#1e1f21',
        padding: '0px'
    },
    tableHeader: {
        backgroundColor: '#641707',
        borderRadius: '15px',
        boxShadow: '0px 4px 0px 0 #851f09'
    },
    tableHeader1: {
        width: '15%',
        textAlign: 'center',
        fontSize: '15px',
        borderBottom: 'none',
        borderTopLeftRadius: '15px',
        borderBottomLeftRadius: '15px',
        '&:last-child': {
            borderTopLeftRadius: '0',
            borderTopRightRadius: '15px',
            borderBottomLeftRadius: '0',
            borderBottomRightRadius: '15px',
        }
    },
    tableHeader2: {
        textAlign: 'center',
        fontSize: '15px',
        borderBottom: 'none',
    },
    tableRowGradient: {
        color: '#d1ac16',
        borderRadius: '30px',
        borderStyle: 'solid',
        borderWidth: 'thin',
        textTransform: 'lowercase',
        '& span:first-child': {
            color: '#ffffff'
        }
    },
    tableFilledGradient: {
        background: 'linear-gradient(to right, #c59e31,#e1c864,#c59e31)',
        borderRadius: '30px',
        borderStyle: 'solid',
        borderWidth: 'thin',
        textTransform: 'lowercase'
    },
    pageNumDiv: {
        margin: '15px',
        textAlign: 'center',
    },
    pageNumSpan: {
        color: '#d1ac16',
        borderStyle: 'solid',
        border: '2px',
        padding: '6px 10px 6px 10px',
        margin: '2px'
    },
    contentCenter: {
        display: 'flex',
        justifyContent: 'center'
    },
    textField: {
        width: '100%',
        border: 'none',
        borderLeft: 'solid #404447 1px',
        paddingBottom: '0px'
    },
    uppercase: {
        textTransform: 'uppercase'
    },
    lowercase: {
        textTransform: 'lowercase'
    },
    capitalize: {
        textTransform: 'capitalize'
    },
    paginationBtn: {
        '& button': {
            border: '1px solid #d1ac16',
            color: '#d1ac16',
            backgroundColor: 'transparent'
        }
    },
    outlinedActionButton: {
        border: '1px solid #d1ac16',
        color: '#fff',
        background: '#100f14',
        borderRadius: '20px',
        padding: '10px 30px',
        marginRight: '20px',
        textTransform: 'none'
    },
    containedActionButton: {
        background: 'linear-gradient(to right, #c59e31,#e1c864,#c59e31)',
        color: '#000',
        borderRadius: '20px',
        padding: '10px 30px',
        marginRight: '20px',
        textTransform: 'none',
    },
    goldBorder: {
        border: '1px solid #c69b18'
    },
    detailBox: {
        width: '100%',
        borderRadius: '10px',
        borderBottom: '6px solid #641609',
        marginBottom: '30px',
        background: '#100f14'
    },
    detailHeader: {
        margin: '10px',
        borderBottom: '1px solid #404447'
    },
    detailHeader1: {
        borderColor: '#d1ac16',
        borderRadius: '30px',
        borderStyle: 'solid',
        borderWidth: 'thin',
        textTransform: 'lowercase',
        margin:'10px',
        textAlign: 'center',
        background: '#252429'
    },
    detailHeader2: {
        textAlign: 'left',
        marginLeft: '10px',
        paddingTop: '10px'
    },
    detailHeader3: {
        textAlign: 'right',
        paddingTop: '10px'
    },
    detailContent: {
        margin: '20px'
    },
    detailListButton: {
        background: 'linear-gradient(to right, #bb8c0a,#dfc54c,#bb8c0a)',
        borderRadius: '30px',
        borderStyle: 'solid',
        textTransform: 'lowercase',
        height: '50px',
        width: '180px'
    },

    numberFormatStyle: {
        border: 'none',
        fontSize: '18px',
        color: '#d3b44b',
        textAlign: 'right',
        width: '30%',
        backgroundColor: '#1e1f21',
        paddingRight: 10,
    },
    hiddenSm: {
        '@media screen and (max-width: 968px)': {
            display: 'none'
        }
    },
    showXs: {
        '@media screen and (max-width: 967px)': {
            visibility: 'show'
        },
        '@media screen and (min-width: 968px)': {
            display: 'none'
        }
    },
    hiddenXs: {
        '@media screen and (max-width: 968px)': {
            display: 'none',
        }
    }
}));

export default useStyles;