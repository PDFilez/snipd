import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import Note from './components/Note'
import Skeleton from '@mui/material/Skeleton';
import { EmptySelecion } from './components/EmptySelecion';

async function getCurrentSelection() {
    const [currentTab] = await chrome.tabs.query({active: true, currentWindow: true});
    let [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        func: () => window.getSelection().toString(),
    });
    return result
}

async function getSnipObjectFromCurrentSelection() {
    const [currentTab] = await chrome.tabs.query({active: true, currentWindow: true});
    let currentSelection = await getCurrentSelection();

    return {
        "source": currentTab.url,
        "title": currentTab.title,
        "content": currentSelection,
        "date": (new Date()).toString()
    };
}

function App() {
  const [title, setTitle] = useState("");
  const [source, setSource] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
     getSnipObjectFromCurrentSelection().then(selection => {
         setTitle(selection.title);
         setSource(selection.source);
         setContent(selection.content);
         setDate(selection.date);
     });
  }, []);

  return (
    <div className="App" style={{
      width:'100%', height:'100%'
    }}>
      {(content !== "" ? <Note 
      bookName={title}
      highlightedText={content}
      pageNumber={""}
      date={(new Date(date)).toLocaleDateString()}
      time={(new Date(date)).toLocaleTimeString()}
      style={{
        width:'100%', height:'100%'
      }}/> : <EmptySelecion />)}
    </div>
  )
}

export default App
