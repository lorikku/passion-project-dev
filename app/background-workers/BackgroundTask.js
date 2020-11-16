import * as React from 'react';
import { WebView } from 'react-native-webview';

export default function BackgroundTask(props) {
  return (
    <WebView
      onMessage={props.function}
      source={{
        html: `<script>
          setInterval(()=>{window.ReactNativeWebView.postMessage("");}, ${props.interval})
          </script>`,
      }}
    />
  );
}
