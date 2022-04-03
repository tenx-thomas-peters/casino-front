import React  from 'react';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Box } from '@material-ui/core';

import { CmtTitle } from '../../../../@coremat/CmtTypography';
import useStyles from './index.style';
import CmtImage from '../../../../@coremat/CmtImage';

const CarouselObject = ({
  background_img,
  onBodyClick,
  title,
  titleProps,
  children,
  className,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.mediaObject, className, 'Cmt-media-object')} {...rest}>
      <CmtImage src={background_img} className={clsx(classes.carousel_border, className, 'carousel-border')}/>
      <div className={clsx(classes.mediaBody, 'Cmt-media-body')} onClick={onBodyClick}>
        <div className={clsx(classes.mediaHeader, 'Cmt-media-header')}>
          <div className={clsx(classes.mediaHeaderContent, 'Cmt-media-header-content')}>
            {title && <CmtTitle content={title} {...titleProps} style={{fontSize: '32px'}}/>}
          </div>
        </div>
        {children}
      </div>
    </Box>
  );
};

CarouselObject.prototype = {
  background_img: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onBodyClick: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleProps: PropTypes.object,
  className: PropTypes.func,
};

CarouselObject.defaultProps = {
  background_img: '',
  title: '',
  titleProps: {
    variant: 'h3',
    component: 'div',
  },
};

export default React.memo(CarouselObject);
