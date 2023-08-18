import debounce from "lodash-es/debounce";
import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

type HARLog = chrome.devtools.network.HARLog;

type NetorkReq = {
  url: string;
};

function NetworkRequests() {
  const [harPages, setPageCount] = useState<number>(0);
  const [requests, setRequests] = useState<NetorkReq[]>([]);

  const updateRequests = debounce((urls: NetorkReq[]) => {
    setRequests(urls);
  }, 300);

  chrome.devtools.network.onRequestFinished.addListener((req) => {
    updateRequests([
      ...new Set([
        ...requests,
        {
          url: req.request.url,
        },
      ]),
    ]);
  });

  return (
    <>
      <ul>
        {requests.map((req) => (
          <li key={req.url}>{req.url}</li>
        ))}
      </ul>
    </>
  );
}

const App = (props: { message: string }) => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => {
    setCount((count) => count + 1);
  }, [count]);
  return (
    <>
      <h1>Network analysis</h1>
      <NetworkRequests />
    </>
  );
};

const container = document.getElementById("output");
if (container) {
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(
    <App message="Hello World! Simple Counter App built on ESBuild + React + Typescript" />
  );
}
