// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';    
// import * as api from "../pages/api/posts.js";

// // import { GoogleMapsAPIKey } from 'your-google-maps-api-key'; // Replace with your Google Maps API key

// const LocationAutocomplete = (props) => {
//   const [inputValue, setInputValue] = useState('');
//   const [options, setOptions] = useState([]);
//   const [selectedOption, setSelectedOption] = useState(null);


//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handlePlaceSelect = (place) => {
//     // Handle the selected place
//     console.log(place);
//     console.log(place.description);
//     setSelectedOption(place.description);
//     console.log(selectedOption);
//   };

//   const fetchOptions =  () => {

//     if (inputValue.length > 0) {
//       api.auto_complete(inputValue).then((response) => {
//         console.log(response);
//         const data =  response.data;
//         setOptions(data.predictions);
//       });
//       // console.log(response);
//       // const data = await response.json();
//       // setOptions(data.predictions);
//     } else {
//       setOptions([]);
//     }
//   };

//   return (
//     <Autocomplete
//       options={options}
//       getOptionLabel={(option) => option.description}
//       onInputChange={handleInputChange}
//       onChange={(event, value) => handlePlaceSelect(value)}
//       onKeyUp={fetchOptions}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           required
//           fullWidth
//           label={props.label}
//           name={props.name}
//           value={selectedOption}
//           onChange={props.onChange}
//           variant="outlined"
//           InputProps={{
//             ...params.InputProps,
//             autoComplete: 'new-password',
//           }}
//         />
//       )}
//     />
//   );
// };

// export default LocationAutocomplete;

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = 'AIzaSyCp-Anp2C_fMkiB8BSaxP9KcMsSQ-fg-_g';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const LocationAutocomplete = (props) => {
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      fullWidth
      name={props.name}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations."
      onChange={(event, newValue) => {
        if(newValue){
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue.description);
        }
        
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label={props.label} fullWidth />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}

export default LocationAutocomplete;