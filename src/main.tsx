import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

class RootErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Root Rendering Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '3rem', fontFamily: 'sans-serif', color: '#000', background: '#fff', minHeight: '100vh' }}>
          <h2>Application Error</h2>
          <p style={{ color: '#e11d48' }}>{this.state.error?.toString()}</p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '0.5rem 1rem', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
)
