import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { setCurrentPupil } from '~/Redux/Actions'
import './styles.css';

export const SelectPupil = () => {

  const dispatch = useDispatch();
  const pupils = useSelector(state => state.user && state.user.pupils);
  const [pupil, setPupil] = useState('');

  useEffect(() => {

  }, []);

  const handleChange = (event) => {
    setPupil(event.target.value);
    dispatch(setCurrentPupil(event.target.value));
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