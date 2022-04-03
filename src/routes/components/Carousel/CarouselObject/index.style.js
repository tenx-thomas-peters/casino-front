import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  mediaObject: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
  },
  mediaImageTop: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  mediaImageCenter: {
    alignSelf: 'center',
  },
  mediaImageBottom: {
    marginBottom: 12,
    alignSelf: 'flex-end',
  },
  rootAvatar: {
    height: 60,
    width: 60,
  },
  mediaBody: {
    flex: '1 1 0%',
    position: 'absolute',
    left: '9%',
    top: '28%'
  },
  mediaHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaHeaderContent: {
    flex: 1,
  },
  mediaActions: {
    alignSelf: 'flex-start',
  },
  mediaFooter: {
    display: 'flex',
  },
  carousel_border: {
    borderRadius: '14px'
  }
}));
export default useStyles;
