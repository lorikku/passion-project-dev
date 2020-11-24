import * as React from 'react';
import { WebView } from 'react-native-webview';

export default function BackgroundTask(props) {
  return (
    <WebView
      style={{ height: 0 }}
      onMessage={props.function}
      source={{
        html: `<script>
          setInterval(()=>{window.ReactNativeWebView.postMessage("");}, ${props.interval})
          </script>`,
      }}
    />
  );
}
