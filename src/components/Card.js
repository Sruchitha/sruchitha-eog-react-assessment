import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function SimpleCard(props) {
  const useStyles = makeStyles({
    card: {
      float: 'left',
      marginLeft: 15,
      width:"300px",
      margin:"2%"
    },
    title: {
      fontSize: '1.25rem',
      fontWeight:500
    },
    pos: {
      marginBottom: 12,
    },
    metric: {
      color: 'black',
      fontWeight:400,
      fontSize:'3rem'
    },
  });

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {props.metric}
        </Typography>
        <Typography className={classes.metric} variant="body2" component="p">
          {props.data}
        </Typography>
      </CardContent>
    </Card>
  );
}
