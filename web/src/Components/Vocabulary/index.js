import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Topic } from './Topic';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addTopics } from '~Redux/Actions';
import { SelectPupil } from './SelectPupil';
import { ROLES } from '~constants';
import api from '~/Services/api';
import './vocabulary.css';

export const Vocabulary = () => {
  const dispatch = useDispatch();

  const [addTopicOpen, setAddTopicIsOpen] = useState(false);
  const [theme, setTheme] = useState('');
  const [pupil, setPupil] = useState('');

  const user = useSelector(state => state.user);
  const isTeacher = user && user.role === ROLES.TEACHER;

  const topicsOfUsers = useSelector(state => state.topics.find(topic => topic.pupil === pupil));
  const themes = topicsOfUsers && topicsOfUsers.themes;

  useEffect(() => {
    if (!isTeacher) {
      setPupil(user._id);
    }
    if (!themes && pupil) {
      api.getTopics(pupil).then(answer => {
        const receivedThemes = answer.themes;
        if (receivedThemes) {
          dispatch(addTopics({ pupil, themes: receivedThemes }));
        }
      })
    }
  }, [pupil]);

  const onPlusClick = () => {
    setAddTopicIsOpen(true);
  }

  const onAddClick = () => {
    const data = {
      theme,
      pupil,
    }

    if (theme) {
      api.addTopic(data).then(answer => {
        dispatch(addTopics({ pupil, themes: [answer.theme] }));
      });
    }

    setTheme('');
  }

  const onCancelClick = () => {
    setAddTopicIsOpen(false);
  }

  const onThemeChange = (e) => {
    setTheme(e.target.value);
  }

  return (
    <>
      {isTeacher && <SelectPupil setPupil={setPupil} pupil={pupil} />}
      <div className='accordion'>
        {themes && themes.map((theme, index) =>
          <Topic key={theme + index} theme={theme} topicsOfUsers={topicsOfUsers} isTeacher={isTeacher} />
        )}
        <div className='addTopic'>
          {addTopicOpen && (
            <>
              <TextField value={theme} onChange={onThemeChange} id="standard-basic" label="Theme" />
              <Button onClick={onAddClick} style={{ verticalAlign: 'bottom', marginLeft: 15 }} variant="contained" color="primary">
                Add
            </Button>
              <Button onClick={onCancelClick} style={{ verticalAlign: 'bottom', marginLeft: 5 }} variant="contained" color="secondary">
                Close
            </Button>
            </>
          )}
        </div>
        {!isTeacher && <AddCircleIcon onClick={onPlusClick} style={{ cursor: 'pointer', fontSize: 40, color: 'green' }} className='icon' />}
      </div>
    </>
  )
}
