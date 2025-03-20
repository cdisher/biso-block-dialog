import './App.css'
import { BrowserRouter as Router, Route, Routes, useSearchParams } from 'react-router-dom';
import { BlockDialog } from './BlockDialog';

type BlockedAction = 'copy' | 'paste' | 'download' | 'keyboard' | 'print' | 'upload'

type StringMap = { [k: string]: string}
interface Parameters extends StringMap {
  action: BlockedAction
  // Gateway Firewall policy id
  policy_id: string
  client_url: string
  cf_colo: string
  rbi_debug_id: string
}

function BlockPage() {
  const [searchParams] = useSearchParams();

  const params = Object.fromEntries(searchParams) as Parameters
  switch(params.action) {

    // TODO: Add text and customizeable link to each one of these
  case 'copy':
    return <BlockDialog title='Copy Blocked'/>
  case 'paste':
    return <BlockDialog title='Paste Blocked'/>
  case 'download':
    return <BlockDialog title='Download Blocked'/>
  case 'keyboard':
    return <BlockDialog title='Keyboard Blocked'/>
  case 'print':
    return <BlockDialog title='Print Blocked'/>
  case 'upload':
    return <BlockDialog title='Upload Blocked'/>
  }
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/block" element={<BlockPage/>} />
      </Routes>
    </Router>
  )
}

export default App
