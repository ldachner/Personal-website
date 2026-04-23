declare module 'react-simple-maps' {
  import { ComponentType, CSSProperties, MouseEvent, ReactNode } from 'react'

  interface ComposableMapProps {
    projectionConfig?: { scale?: number; center?: [number, number] }
    style?: CSSProperties
    children?: ReactNode
  }

  interface GeographiesProps {
    geography: string | object
    children: (args: { geographies: Geography[] }) => ReactNode
  }

  interface Geography {
    rsmKey: string
    id: string | number
    properties: Record<string, unknown>
    type: string
    geometry: object
  }

  interface GeographyProps {
    key?: string
    geography: Geography
    fill?: string
    stroke?: string
    strokeWidth?: number
    style?: { default?: CSSProperties; hover?: CSSProperties; pressed?: CSSProperties }
    onMouseEnter?: (evt: MouseEvent<SVGPathElement>) => void
    onMouseMove?: (evt: MouseEvent<SVGPathElement>) => void
    onMouseLeave?: (evt: MouseEvent<SVGPathElement>) => void
  }

  export const ComposableMap: ComponentType<ComposableMapProps>
  export const Geographies: ComponentType<GeographiesProps>
  export const Geography: ComponentType<GeographyProps>
}
