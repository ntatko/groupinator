import { useEffect, useState } from 'react'
import './App.css'
import { AppBar, Button, Card, CardActions, CardContent, CardHeader, IconButton, List, ListItem, TextField } from '@mui/material'
import { Delete } from '@mui/icons-material'

function App() {
  const [people, setPeople] = useState([''])
  const [topics, setTopics] = useState([''])
  const [groups, setGroups] = useState(null)

  useEffect(() => {
    if (people.length == 0) setPeople([''])
  }, [people])

  useEffect(() => {
    if (topics.length == 0) setTopics([''])
  }, [topics])

  const handlePeopleChange = (index) => (event) => {
    setPeople(ps => ps.map((p, i) => i == index ? event.target.value : p))
  }

  const handlePeopleKeyDown = (index) => (event) => {
    if (event.key == 'Enter') {
      setPeople(ps => [...ps, ''])
    } else if (event.key == 'Backspace' && people[index] == '') {
      setPeople(ps => ps.filter((p, i) => i != index))
    }
  }

  const handleTopicsChange = (index) => (event) => {
    setTopics(ts => ts.map((t, i) => i == index ? event.target.value : t))
  }

  const handleTopicsKeyDown = (index) => (event) => {
    if (event.key == 'Enter') {
      setTopics(ts => [...ts, ''])
    } else if (event.key == 'Backspace' && topics[index] == '') {
      setTopics(ts => ts.filter((t, i) => i != index))
    }
  }

  const generateGroups = () => {
    const peopleCopy = [...people]
    peopleCopy.sort((a, b) => Math.random() - 0.5)
    const groupings = {}
    for (let i = 0; i < peopleCopy.length; i++) {
      const person = peopleCopy[i]
      const topic = topics[i % topics.length]
      if (groupings[topic]) {
        groupings[topic].push(person)
      } else {
        groupings[topic] = [person]
      }
    }
    setGroups(groupings)
  }
    
  console.log(groups)

  return (
    <div className="App">
      <AppBar />
      <div className='side-by-side'>
        <div className="input-cards">
          <Card className="card">
            <CardHeader title="People" />
            <CardContent>
              <List>
                {people.map((person, index) => (
                  <ListItem key={index}>
                    <TextField autoFocus value={person} onChange={handlePeopleChange(index)} onKeyDown={handlePeopleKeyDown(index)} />
                    <IconButton onClick={() => setPeople(ps => ps.filter((p, i) => i != index))}>
                      <Delete />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button onClick={() => setPeople(ps => [...ps, ''])}>Add Person</Button>
            </CardActions>
          </Card>
          <Card className='card'>
            <CardHeader title="Topics" />
            <CardContent>
              <List>
                {topics.map((topic, index) => (
                  <ListItem key={index}>
                    <TextField autoFocus value={topic} onChange={handleTopicsChange(index)} onKeyDown={handleTopicsKeyDown(index)} />
                    <IconButton onClick={() => setTopics(ts => ts.filter((t, i) => i != index))}>
                      <Delete />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button onClick={() => setTopics(ts => [...ts, ''])}>Add Topic</Button>
            </CardActions>
          </Card>
          <Button variant="contained" color="primary" onClick={generateGroups}>Generate</Button>
        </div>
        <div className="groups">
          {groups && Object.keys(groups).map(topic => (
            <Card className="card">
              <CardHeader title={topic} />
              <CardContent>
                <List>
                  {groups[topic].map(person => (
                    <ListItem>{person}</ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
