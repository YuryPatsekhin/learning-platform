import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import api from '~/Services/api';
import { addWords } from '~Redux/Actions';
import './vocabulary.css';

export const Topic = ({ theme, topicsOfUsers }) => {
  const dispatch = useDispatch();

  const [word, setWord] = useState('');
  const [translate, setTranslate] = useState('');

  const pupil = topicsOfUsers.pupil;
  const topic = theme;
  const wordsOfTopic = topicsOfUsers.words.find(wordsList => wordsList.topic === theme);
  const words = wordsOfTopic && wordsOfTopic.words;

  const onAddClick = () => {
    if (word && translate) {
      const data = {
        word,
        translate,
        theme,
        pupil: topicsOfUsers.pupil
      }

      api.addWord(data).then(answer => {
        const words = answer.words;

        if (words) {
          dispatch(addWords({ pupil, topic, words }));
          setWord('');
          setTranslate('');
        }
      })
    }
  }

  const onWordChange = (e) => {
    setWord(e.target.value);
  };

  const onTranslateChange = (e) => {
    setTranslate(e.target.value);
  };

  const onOpen = () => {
    if (!words) {
      api.getWords({ pupil, topic }).then(answer => {
        const words = answer.words;
        if (words) {
          dispatch(addWords({ pupil, topic, words }));
        }
      })
    }
  };

  return (
    <Accordion onChange={onOpen}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{theme}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className='table'>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Words</TableCell>
                <TableCell align="right">Translate</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {words && words.map((word, index) => (
                <TableRow key={word.word + index}>
                  <TableCell component="th" scope="row">
                    {word.word}
                  </TableCell>
                  <TableCell align="right">
                    {word.translate}
                  </TableCell>
                  <TableCell align="right"><DeleteIcon /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className='buttons'>
            <TextField value={word} onChange={onWordChange} id="outlined-basic" label="Word" variant="outlined" />
            <TextField value={translate} onChange={onTranslateChange} style={{ marginLeft: 15 }} id="outlined-basic" label="Translate" variant="outlined" />
          </div>
          <Button onClick={onAddClick} style={{ marginTop: 15 }} variant="contained" color="primary">
            Add
          </Button>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
