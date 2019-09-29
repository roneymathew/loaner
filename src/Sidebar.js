// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Slider from '@material-ui/core/Slider';
// import Input from '@material-ui/core/Input';
// import VolumeUp from '@material-ui/icons/VolumeUp';

// const useStyles = makeStyles({
//   root: {
//     width: 250,
//   },
//   input: {
//     width: 42,
//   },
// });

// export default function InputSlider() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(30);

//   const handleSliderChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleInputChange = event => {
//     setValue(event.target.value === '' ? '' : Number(event.target.value));
//   };

//   const handleBlur = () => {
//     if (value < 0) {
//       setValue(0);
//     } else if (value > 100) {
//       setValue(100);
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <Typography id="input-slider" gutterBottom>
//         Volume
//       </Typography>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item>
//           <VolumeUp />
//         </Grid>
//         <Grid item xs>
//           <Slider
//             value={typeof value === 'number' ? value : 0}
//             onChange={handleSliderChange}
//             aria-labelledby="input-slider"
//           />
//         </Grid>
//         <Grid item>
//           <Input
//             className={classes.input}
//             value={value}
//             margin="dense"
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             inputProps={{
//               step: 10,
//               min: 0,
//               max: 100,
//               type: 'number',
//               'aria-labelledby': 'input-slider',
//             }}
//           />
//         </Grid>
//       </Grid>
//     </div>
//   );
// }


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// // export default App;




// const useStyles = makeStyles(theme => ({
//   root: {
//     width: 500 + theme.spacing(3) * 2,
//     padding: theme.spacing(3),
//   },
//   margin: {
//     height: theme.spacing(3),
//   },
//   input: {
//     width: 55,
//   },
// }));
// function ValueLabelComponent(props) {
//   const { children, open, value } = props;

//   const popperRef = React.useRef(null);
//   React.useEffect(() => {
//     if (popperRef.current) {
//       popperRef.current.update();
//     }
//   });

//   return (
//     <Tooltip
//       PopperProps={{
//         popperRef,
//       }}
//       open={open}
//       enterTouchDelay={0}
//       placement="top"
//       title={value}>
//       {children}
//     </Tooltip>
//   );
// }

// ValueLabelComponent.propTypes = {
//   children: PropTypes.element.isRequired,
//   open: PropTypes.bool.isRequired,
//   value: PropTypes.number.isRequired,
// };
// const PrettoSlider = withStyles({
//   root: {
//     color: '#52af77',
//     height: 8,
//   },
//   thumb: {
//     height: 24,
//     width: 24,
//     backgroundColor: '#fff',
//     border: '2px solid currentColor',
//     marginTop: -8,
//     marginLeft: -12,
//     '&:focus,&:hover,&$active': {
//       boxShadow: 'inherit',
//     },
//   },
//   active: {},
//   valueLabel: {
//     left: 'calc(-50% + 4px)',
//   },
//   track: {
//     height: 8,
//     borderRadius: 4,
//   },
//   rail: {
//     height: 8,
//     borderRadius: 4,
//   },
// })(Slider);

// function input() {

//   const classes = useStyles();
//   var  [loanamount, setAmount] = React.useState(500);
//   const handleSliderChange = (event, newValue) => {
//     setAmount(newValue);
//   };

//   const handleInputChange = event => {
//     setAmount(event.target.value === '' ? '' : Number(event.target.value));

//   };
//   const handleCommit = () => {
//     if (loanamount != null ) {
//       console.log("hai")
//     }
//     else{
//       console.log("dsacd")
//     }
//       console.log(loanamount)
    
//   }  

//   const handleBlur = () => {
//     if (loanamount < 500) {
//       setAmount(500);
//     } else if (loanamount > 5000) {
//       setAmount(5000);
//     }
//   };
//   return (
//     <div className={classes.root}>
//       <Typography id="input-slider" gutterBottom>
//         Volume
//       </Typography>
//       <PrettoSlider valueLabelDisplay="auto" onChange={handleSliderChange} value={typeof loanamount === 'number' ? loanamount : 500} aria-label="pretto slider" defaultValue={500} max={5000} min ={500} />
//       <Input
//             className={classes.input}
//             value={loanamount}
//             margin="dense"
//             onChange={handleInputChange}
//             onChangeCommitted={handleCommit}
//             onBlur={handleBlur}
//             inputProps={{
//               step: 1,
//               min: 500,
//               max: 5000,
//               type: 'number',
//               'aria-labelledby': 'input-slider',
//             }}
//           />
//     </div>
//   );
// }
