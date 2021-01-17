import React from 'react';
import { useSelector } from "react-redux";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import './vocabulary.css';

export const SelectPupil = ({ pupil, setPupil }) => {

  const pupils = useSelector(state => state.user && state.user.pupils);

  const handleChange = (event) => {
    setPupil(event.target.value);
  };

  return (
    <div className='selectWrapper'>
      <FormControl className='select'>
        <InputLabel htmlFor="pupil">pupil</InputLabel>
        <Select
          native
          value={pupil}
          onChange={handleChange}
          inputProps={{
            name: 'pupil',
            id: 'pupil',
          }}
        >
          <option aria-label="None" value="" />
          {pupils ?
            pupils.map(pupil => <option key={pupil.id} value={pupil.id}>{pupil.name}</option>)
            : null
          }
        </Select>
      </FormControl >
    </div >
  )
}