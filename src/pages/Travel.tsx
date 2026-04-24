import { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { visitedCountries } from '../content/travel'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

type Tooltip = { name: string; x: number; y: number }

export default function Travel() {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null)

  return (
    <section className="travel-section">
      <h1>Travel</h1>
      <p className="travel-count">Countries I have been to so far.</p>

      <div className="map-container">
        <div className="map-inner">
        <ComposableMap
          projectionConfig={{ scale: 153, center: [15, 10] }}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const visited = visitedCountries[String(geo.id)]
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={visited ? '#c4a265' : '#e0dcc8'}
                    stroke="#fbf9ee"
                    strokeWidth={0.5}
                    style={{
                      hover: { fill: visited ? '#a8883c' : '#d4ceb8', outline: 'none' },
                      pressed: { outline: 'none' },
                      default: { outline: 'none' },
                    }}
                    onMouseEnter={(evt) => {
                      if (visited) setTooltip({ name: visited.name, x: evt.clientX, y: evt.clientY })
                    }}
                    onMouseMove={(evt) => {
                      if (visited) setTooltip((prev) => prev ? { ...prev, x: evt.clientX, y: evt.clientY } : null)
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>
        </div>

        {tooltip && (
          <div className="map-tooltip" style={{ left: tooltip.x + 14, top: tooltip.y - 42 }}>
            {tooltip.name}
          </div>
        )}
      </div>
    </section>
  )
}
