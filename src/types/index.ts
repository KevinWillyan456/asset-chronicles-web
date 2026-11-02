export interface ActivityEntry {
  assetId: string
  id: string
  message: string
  timestamp: string
  tone: 'neutral' | 'positive' | 'warning'
}

export interface Asset {
  acquisitionDate: string
  categoryId: string
  code: string
  description: string
  id: string
  locationId: string
  name: string
  responsibleId: null | string
  serial?: string
  status: AssetStatus
  value: number
}

export type AssetStatus = 'active' | 'maintenance' | 'retired' | 'transferred'

export interface Category {
  description: string
  icon: string
  id: string
  name: string
}

export interface Location {
  building: string
  floor: string
  id: string
  name: string
}

export interface Movement {
  assetId: string
  date: string
  fromLocationId: null | string
  id: string
  note: string
  responsibleId: null | string
  toLocationId: null | string
  type: MovementType
}

export type MovementType = 'assignment' | 'maintenance' | 'registration' | 'return' | 'transfer'

export interface Responsible {
  department: string
  email: string
  id: string
  initials: string
  name: string
  role: string
}
