import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Topic } from './Topic';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addTopics } from '~Redux/Actions';
import api from '~/Services/api';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './vocabulary.css';

export const Vocabulary = () => {
  const dispatch = useDispatch();

  const [addTopicOpen, setAddTopicIsOpen] = useState(false);
  const [theme, setTheme] = useState('');
  const [tab, setTab] = useState('');

  const pupil = useSelector(state => state.user);
  const pupilId = pupil._id;
  const topicsOfUsers = useSelector(state => state.topics.find(topic => topic.pupil === pupilId));
  const themes = topicsOfUsers && topicsOfUsers.themes;

  useEffect(() => {
    if (!themes) {
      api.getTopics(pupilId).then(answer => {
        const receivedThemes = answer.themes;
        if (receivedThemes) {
          dispatch(addTopics({ pupil: pupilId, themes: receivedThemes }));
        }
      })
    }
  }, []);

  const onPlusClick = () => {
    setAddTopicIsOpen(true);
  }

  const onAddClick = () => {
    const data = {
      theme,
      pupil: pupilId,
    }

    if (theme) {
      api.addTopic(data).then(answer => {
        dispatch(addTopics({ pupil: pupilId, themes: [answer.theme] }));
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

  const onTabChange = (e) => {

  }

  return (
    <>
      <Tabs value={tab} onChange={onTabChange} aria-label="simple tabs example">
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
      <div className='accordion'>
        {themes && themes.map((theme, index) =>
          <Topic key={theme + index} theme={theme} topicsOfUsers={topicsOfUsers} />
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
        <AddCircleIcon onClick={onPlusClick} style={{ fontSize: 40, color: 'green' }} className='icon' />
      </div>
    </>
  )
}
