import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'material',
    padding: 0
  },
}));


function App() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [html, setHtml] = useState('<h1>Sagar Pandey 18BCE1002</h1>')
  const [css, setCss] = useState('body{ color: purple }')
  const [js, setJs] = useState("document.body.style.background='#E3F1E6'")
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="index.html" {...a11yProps(0)} />
        <Tab label="index.css" {...a11yProps(1)} />
        <Tab label="index.js" {...a11yProps(2)} />
      </Tabs>
    </AppBar>
    <TabPanel value={value} index={0}>
      <div className="pane top-pane">
          <Editor
            language="xml"
            value={html}
            onChange={setHtml}
          />
        </div>
    </TabPanel>
    <TabPanel value={value} index={1}>
      <div className="pane top-pane">
        <Editor
              language="css"
              value={css}
              onChange={setCss}
          />
      </div>
    </TabPanel>
    <TabPanel value={value} index={2}>
      <div className="pane top-pane">
        <Editor
            language="javascript"
            value={js}
            onChange={setJs}
          />
        </div>
    </TabPanel>
    <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
  </div>
  );
}

export default App;
