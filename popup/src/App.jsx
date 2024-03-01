import { useEffect, useState } from "react";
import Note from "./components/Note";
import { EmptySelection } from "./components/EmptySelection";

async function getCurrentSelectionData() {
  const [currentTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  let [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: currentTab.id },
    func: async () => {
      let selectionText = await chrome.storage.local.get(["snip_content", "snip_type"]);

      if (!window.location.href.endsWith(".pdf") && selectionText.snip_content === undefined) {
        return {
          snip_content: window.getSelection().toString(),
          snip_type: "text",
        };
      } else {
        return selectionText;
      }
    },
  });

  return {
    source: currentTab.url,
    title: currentTab.title,
    type: result.snip_type,
    content: result.snip_content,
    date: new Date().toLocaleDateString() + ", " + new Date().toLocaleTimeString() ,
  };
}

function App() {
  const [snipd, setSnipd] = useState();

  

  useEffect(() => {
    const updateSnipdFromSelection = () => {
        getCurrentSelectionData()
            .then((selection) => {
                setSnipd(selection);
                console.log(selection);
            });
    };

    updateSnipdFromSelection(); 

    const listener = (changes, namespace) => {
        if (namespace === 'local') {
            updateSnipdFromSelection();
        }
    };

    chrome.storage.onChanged.addListener(listener);
    return () => {
        chrome.storage.onChanged.removeListener(listener); 
    };
}, []); 

  return (
    <div
      className="App"
      >
      {!!snipd?.content ? (
        <Note
          snipd={snipd}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <EmptySelection />
      )}
    </div>
  );
}

export default App;