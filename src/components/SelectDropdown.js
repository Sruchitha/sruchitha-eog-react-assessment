import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Features/ActiveMetrics/sliceReducer';
import { Multiselect } from 'multiselect-react-dropdown';
import { cancel } from 'redux-saga/effects';

export default function SelectDropdown() {

  const [state, setState] = React.useState({
    injValveOpen: false,
    oilTemp: false,
    flareTemp: false,
    tubingPressure: false,
    casingPressure: false,
    waterTemp: false,
  });
  
  const   stateOptions =  [{name: 'injValveOpen', isselected: false,lable:'INJ Valve Open'},
              {name: 'oilTemp', isselected: false,lable:'Oil Temp'},
              {name: 'flareTemp', isselected: false,lable:'Flare Temp'},
              {name: 'tubingPressure', isselected: false,lable:'Tubing Pressure'},
              {name: 'casingPressure', isselected: false,lable:'Casing Pressure'},
              {name: 'waterTemp', isselected: false,lable:'Water Temp'}];
 
  const mutiStyle = {
        chips: {
          background: "#e6e6e6",
          color:'rgb(51, 51, 51)',
          borderRadius:'2px'
        },
        searchBox: {
          border: "none",
          "border-radius": "0px"
        },
        multiselectContainer: {
          color: "black",
          // To change css for multiselect (Width,height,etc..)
            background: "white",
            width:"40%",
            marginLeft: "55%",
            border:'1px solid rgb(204, 204, 204)',
          
          
        }
      };

  const timeStamp = useSelector(state => state.heartbeat);
  const dispatch = useDispatch();
  const activeArr = useSelector(state => state.activeMetrics.selectedMetrics);
  const selectedValue = [];
  

  const onSelect =  (selectedList, selectedItem)=>{   
    console.log(selectedItem.name);
    const metric = selectedItem.name;
   
    setState({ ...state, [selectedItem.name]:true });

      if (true) {
        dispatch(
          actions.active({
            metricName: metric,
            before: timeStamp.current,
            after: timeStamp.past,
          }),
        );
      }
  }
  const onRemove = (selectedList, selectedItem)=>{
    const metric = selectedItem.name;
    setState({ ...state, [selectedItem.name]:false });
    const metricIndex = activeArr.find(element => element.metricName === metric);
      dispatch(actions.remove(metricIndex.metricName));

  }
  const handleChange = name => event => {
    console.log(event.target.value);
    const metric = event.target.value;
    const isChecked = event.target.checked;
    setState({ ...state, [name]: event.target.checked });

    if (isChecked) {
      dispatch(
        actions.active({
          metricName: metric,
          before: timeStamp.current,
          after: timeStamp.past,
        }),
      );
    } else {
      const metricIndex = activeArr.find(element => element.metricName === metric);
      dispatch(actions.remove(metricIndex.metricName));
    }
  };
   /* const onSelect => (selectedList, selectedItem){
      
  } */

   /* onRemove(selectedList, removedItem) {
      
  } */

  return (
    <div>
      <h1> </h1>
      <Multiselect
        options={stateOptions} // Options to display in the dropdown
        selectedValues={selectedValue} // Preselected value to persist in dropdown
        onSelect={onSelect} // Function will trigger on select event
        onRemove={onRemove} // Function will trigger on remove event
        displayValue="lable"
        style={mutiStyle}
        closeIcon = {cancel} // Property name to display in the dropdown options
        />
     
    </div>
  );
}
