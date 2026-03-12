import { useState } from 'react'
import { Card, CardHeader, CardContent } from '../components/ui/Card'
import { Network } from 'lucide-react'

let ForceGraph2D = null
try {
  ForceGraph2D = require('react-force-graph-2d').default
} catch {
  ForceGraph2D = null
}

const sampleGraph = {
  nodes: [
    { id: 'v1', name: 'Voter 1', type: 'voter' },
    { id: 'v2', name: 'Voter 2', type: 'voter' },
    { id: 'v3', name: 'Voter 3', type: 'voter' },
    { id: 'b1', name: 'Booth B001', type: 'booth' },
    { id: 'b2', name: 'Booth B002', type: 'booth' },
    { id: 's1', name: 'PM-KISAN', type: 'scheme' },
    { id: 's2', name: 'Skill India', type: 'scheme' },
  ],
  links: [
    { source: 'v1', target: 'b1' }, { source: 'v2', target: 'b1' },
    { source: 'v3', target: 'b2' }, { source: 'v1', target: 's1' },
    { source: 'v2', target: 's2' }, { source: 'b1', target: 's1' },
  ],
}

export default function KnowledgeGraphPage() {
  const [highlight, setHighlight] = useState(null)

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Knowledge Graph</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        Interactive graph: Voters, Booths, Government Schemes — scroll to zoom, drag to pan
      </p>

      <div className="flex gap-4 mb-4 text-sm text-slate-500">
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#0ea5e9]" /> Voters</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#14b8a6]" /> Booths</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#f97316]" /> Schemes</span>
      </div>

      <Card>
        <CardHeader title="Graph Visualization" subtitle="Click nodes to highlight relationships" />
        <CardContent>
          <div className="h-[500px] rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden">
            {ForceGraph2D ? (
              <ForceGraph2D
                graphData={sampleGraph}
                nodeLabel="name"
                nodeColor={(n) =>
                  n.type === 'voter' ? '#0ea5e9' : n.type === 'booth' ? '#14b8a6' : '#f97316'
                }
                linkColor={() => '#94a3b8'}
                onNodeClick={(n) => setHighlight(n?.name)}
              />
            ) : (
              <div className="text-center">
                <Network className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500">Graph visualization</p>
                <p className="text-sm text-slate-400 mt-1">Run: npm install react-force-graph-2d</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
