import React from 'react'
import { Button } from './components/ui/button'
import { Layout } from 'lucide-react'

function App() {
  return (
    <div>
      <Button >
        <Layout size={20}/>
        Hello world</Button>
    </div>
  )
}

export default App