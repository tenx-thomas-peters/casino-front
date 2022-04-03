import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {Button} from '../../../../node_modules/@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {Box} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import {NotificationManager} from 'react-notifications';
import useStyles from '../../../@jumbo/common/common.style';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import clsx from 'clsx';
import {CommonConstants} from "../Common/Constants";
import NoteAPI from '../../../services/api/apps/note';

const items = [
    {
        inboxNote: <IntlMessages id={'note.inboxNote'}/>,
        number: <IntlMessages id={'note.number'}/>,
        title: <IntlMessages id={'note.title'}/>,
        receivedTime: <IntlMessages id={'note.receivedTime'}/>,
        confirmation: <IntlMessages id={'note.confirmation'}/>,
        confirm: <IntlMessages id={'note.confirm'}/>,
        viewContent: <IntlMessages id={'note.viewContent'}/>,
        readAll: <IntlMessages id={'note.readAll'}/>,
        deleteAll: <IntlMessages id={'note.deleteAll'}/>,
        delete: <IntlMessages id={'note.delete'}/>,
        writeNote: <IntlMessages id={'support.writeNote'}/>,
        millionNotePage: <IntlMessages id={'note.millionNotePage'}/>,
        noData: <IntlMessages id={'app.common.noData'}/>
    }
];

const Note = () => {
    const classes = useStyles();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [noteList, setNoteList] = useState([]);

    const deleteNote = (e, noteSeq) => {
        e.stopPropagation();
        NoteAPI.deleteNote({noteSeq}).then(res => {
            if (res.data.success) {
                NotificationManager.success(res.data.message, 'Removed successfully.');
                getInboxNoteList(pageNo, pageSize);
            } else {

            }
        });
    }
    const changeReadStatus = (e, seq) => {
        let params = {seq: seq};
        e.stopPropagation();
        NoteAPI.changeReadStatus({params}).then(res => {
            if (res.data.success) {
                NotificationManager.success(res.data.message, 'Confirmed.');
                getInboxNoteList(pageNo, pageSize);
            } else {

            }
        });
    }

    const changeReadStatusAll = () => {
        NoteAPI.changeReadStatusAll().then(res => {
            if (noteList.length === 0) {
                NotificationManager.error('no Data', 'Failed');
            } else if(res.data.success) {                
                NotificationManager.success(res.data.message, 'Changed successfully.');
                getInboxNoteList(pageNo, pageSize);
            }
        })
    }

    const removeAll = () => {
        NoteAPI.removeAll().then(res => {
			if (noteList.length === 0) {
                NotificationManager.error('no Data', 'Failed');
            } else if(res.data.success) {                
                NotificationManager.success(res.data.message, 'Changed successfully.');
                getInboxNoteList(pageNo, pageSize);
            }
        });
    };

    function Row(props) {
        const {row, index, pageNo, pageSize} = props;
        const [open, setOpen] = useState(false);
        const classes = useStyles();

        return (
            <React.Fragment>
                <TableRow onClick={() => row.content && setOpen(true)}>
                    <TableCell align='center'>{pageSize * (pageNo - 1) + (index + 1)}</TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.sendTime}</TableCell>
                    <TableCell align="center" style={{color: '#c59e31'}}>
                        {row.readStatus === 0 ? <IntlMessages id={'note.unRead'}/> : <IntlMessages id={'note.read'}/>}
                    </TableCell>
                    <TableCell align="center">
                        <Button className={classes.outlinedActionButton} style={{margin: '0'}}
                                onClick={(e) => changeReadStatus(e, row.seq)}>
                            {items[0].confirm}
                        </Button>
                    </TableCell>
                    <TableCell align="center">
                        <IconButton aria-label="delete" style={{color: 'grey'}} onClick={(e) => deleteNote(e, row.seq)}>
                            <DeleteIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6} align="center">
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box>
                                <Typography component={'p'} style={{padding: '16px'}}>
                                    <p dangerouslySetInnerHTML={{ __html: row.content }}></p>
                                </Typography>
                                <Button className={classes.outlinedActionButton} style={{margin: '0 0 20px'}}
                                        onClick={() => setOpen(false)}>
                                    <IntlMessages id={'note.toClose'}/>
                                </Button>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            seq: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            sendTime: PropTypes.string.isRequired,
            readStatus: PropTypes.number.isRequired,
            content: PropTypes.string.isRequired
        }),
        index: PropTypes.number.isRequired,
        pageNo: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired
    };

    const getInboxNoteList = (pageNo, pageSize) => {
        let type = CommonConstants.noteTypeNote;

        NoteAPI.getInboxNoteList({type, pageNo, pageSize})
            .then((res) => {
                if (res.data.success) {
                    setPageNo(res.data.result.current);
                    setPageSize(res.data.result.size);
                    setTotalPage(res.data.result.pages);
                    setNoteList(res.data.result.records);
                }
            })
            .catch(function (err) {
                NotificationManager.error(err, 'Error');
            });
    };

    useEffect(() => {
        getInboxNoteList(pageNo, pageSize);
    }, [pageNo, pageSize]);

    const changePage = (e, page) => {
        setPageNo(page);
        getInboxNoteList(page, pageSize);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.cardHeader}
                title={items[0].inboxNote}
                subheader={items[0].millionNotePage}
            />
            <CardContent className={classes.cardContent}>
                <Table>
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell align="center" className={classes.tableHeader1}>
                                {items[0].number}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeader2}>
                                {items[0].title}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeader2}>
                                {items[0].receivedTime}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeader2}>
                                {items[0].confirmation}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeader2}>
                                {items[0].viewContent}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeader1}>
                                {items[0].delete}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            noteList.length > 0
                                ?
                                noteList.map((row, index) => (
                                    <Row key={index} row={row} index={index} pageNo={pageNo} pageSize={pageSize}/>
                                ))
                                :
                                <TableRow>
                                    <TableCell colSpan={6} align={'center'}>
                                        {items[0].noData}
                                    </TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
                <Box className={clsx(classes.root, classes.contentCenter)}>
                    <Pagination count={totalPage}
                                variant="outlined"
                                shape="rounded"
                                className={classes.paginationBtn}
                                hidePrevButton
                                hideNextButton
                                onChange={(e, page) => changePage(e, page)}/>
                </Box>
                <Box align='right'>
                    <Button className={classes.containedActionButton} onClick={() => changeReadStatusAll()}>
                        {items[0].readAll}
                    </Button>
                    <Button className={classes.outlinedActionButton} onClick={() => removeAll()}>
                        {items[0].deleteAll}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default Note;