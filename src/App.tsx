import './App.css'
import { BrowserRouter as Router, Route, Routes, useSearchParams } from 'react-router-dom';

interface Parameters {
  action: string;
  policy_id?: string;
  client_url?: string;
  cf_colo?: string;
  rbi_debug_id?: string;
  [key: string]: string | undefined;
}

function BlockDialog({ title, params }: { title: string; params: Parameters }) {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '24px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      width: '90%',
      maxWidth: '100%',
    }}>
      <h2 style={{
        fontSize: '20px',
        fontWeight: '600',
        marginTop: 0,
        marginBottom: '16px'
      }}>{title}</h2>
      
      <p style={{
        margin: '16px 0',
        color: '#4444dd',
        fontSize: '14px'
      }}>
        Your organization requires this website to load in an isolated browser.
      </p>

      <div style={{
        color: '#666',
        fontSize: '12px',
        marginTop: '16px',
        wordBreak: 'break-all'
      }}>
        {params.client_url}
        <br />
        {params.rbi_debug_id}
        <br />
        {new Date().toISOString()}
      </div>

      <button style={{
        position: 'absolute',
        bottom: '24px',
        right: '24px',
        padding: '8px 16px',
        backgroundColor: '#4444dd',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
      }}>
        Close
      </button>
    </div>
  );
}

function BlockPage() {
  const [searchParams] = useSearchParams();
  
  const params: Parameters = {
    action: searchParams.get('action') || 'unknown',
    policy_id: searchParams.get('policy_id') || undefined,
    client_url: searchParams.get('client_url') || undefined,
    cf_colo: searchParams.get('cf_colo') || undefined,
    rbi_debug_id: searchParams.get('rbi_debug_id') || undefined
  };
  
  const titles: Record<string, string> = {
    copy: 'Copy blocked',
    paste: 'Paste blocked',
    download: 'Download blocked',
    keyboard: 'Keyboard blocked',
    print: 'Print blocked',
    upload: 'Upload blocked'
  };

  const title = titles[params.action] || 'Action blocked';
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <BlockDialog title={title} params={params} />
    </div>
  );
}

function App() {
  // Get the base URL from the environment or default to '/'
  const basename = import.meta.env.BASE_URL || '/';
  
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/block" element={<BlockPage />} />
        {/* Add a default route that redirects to /block */}
        <Route path="/" element={<BlockPage />} />
      </Routes>
    </Router>
  );
}

export default App;
