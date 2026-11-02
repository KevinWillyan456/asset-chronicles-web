import type { ActivityEntry, Asset, Category, Location, Movement, Responsible } from '@/types'

export const categories: Category[] = [
  {
    description: 'Dispositivos e aparelhos diversos',
    icon: 'bolt',
    id: 'cat-eletronicos',
    name: 'Eletrônicos',
  },
  {
    description: 'Móveis e itens de escritório',
    icon: 'chair',
    id: 'cat-mobiliario',
    name: 'Mobiliário',
  },
  {
    description: 'Computadores e periféricos',
    icon: 'chip',
    id: 'cat-informatica',
    name: 'Informática',
  },
  { description: 'Frota e locomoção', icon: 'car', id: 'cat-veiculos', name: 'Veículos' },
  {
    description: 'Máquinas e instrumentos',
    icon: 'gear',
    id: 'cat-equipamentos',
    name: 'Equipamentos',
  },
  { description: 'Itens não classificados', icon: 'spark', id: 'cat-outros', name: 'Outros' },
]

export const responsibles: Responsible[] = [
  {
    department: 'Administrativo',
    email: 'maria.oliveira@arcanum.co',
    id: 'resp-maria',
    initials: 'MO',
    name: 'Maria Oliveira',
    role: 'Analista Administrativa',
  },
  {
    department: 'Financeiro',
    email: 'joao.santos@arcanum.co',
    id: 'resp-joao',
    initials: 'JS',
    name: 'João Santos',
    role: 'Coordenador Financeiro',
  },
  {
    department: 'Produto',
    email: 'ana.clara@arcanum.co',
    id: 'resp-ana',
    initials: 'AC',
    name: 'Ana Clara',
    role: 'Designer de Produto',
  },
  {
    department: 'Tecnologia',
    email: 'carlos.mendes@arcanum.co',
    id: 'resp-carlos',
    initials: 'CM',
    name: 'Carlos Mendes',
    role: 'Técnico de Suporte',
  },
  {
    department: 'Operações',
    email: 'rafael.lima@arcanum.co',
    id: 'resp-rafael',
    initials: 'RL',
    name: 'Rafael Lima',
    role: 'Supervisor de Logística',
  },
]

export const locations: Location[] = [
  {
    building: 'Torre Alvorada',
    floor: '3º andar',
    id: 'loc-administrativo',
    name: 'Sala Administrativa',
  },
  { building: 'Torre Alvorada', floor: '4º andar', id: 'loc-financeiro', name: 'Financeiro' },
  { building: 'Torre Alvorada', floor: '2º andar', id: 'loc-reunioes', name: 'Sala de Reuniões' },
  { building: 'Anexo Exímio', floor: 'Térreo', id: 'loc-laboratorio', name: 'Laboratório Central' },
  { building: 'Anexo Exímio', floor: '1º andar', id: 'loc-estudio', name: 'Estúdio Criativo' },
  { building: 'Bloco Externo', floor: 'Subsolo', id: 'loc-garagem', name: 'Garagem Sul' },
  { building: 'Torre Alvorada', floor: 'Térreo', id: 'loc-recepcao', name: 'Recepção' },
]

export const assets: Asset[] = [
  {
    acquisitionDate: '2026-01-18',
    categoryId: 'cat-informatica',
    code: 'PAT-00124',
    description:
      'Notebook corporativo de alto desempenho, com teclado retroiluminado e criptografia nativa de disco.',
    id: 'asset-00124',
    locationId: 'loc-administrativo',
    name: 'Notebook ArcaneBook',
    responsibleId: 'resp-maria',
    serial: 'ACB-9921-X',
    status: 'active',
    value: 8940,
  },
  {
    acquisitionDate: '2025-11-02',
    categoryId: 'cat-eletronicos',
    code: 'PAT-00125',
    description: 'Monitor ultrafino 27 polegadas, painel IPS com calibração de cor de fábrica.',
    id: 'asset-00125',
    locationId: 'loc-estudio',
    name: 'Monitor Lumina 27"',
    responsibleId: 'resp-ana',
    serial: 'LUM-2715-A',
    status: 'active',
    value: 2380,
  },
  {
    acquisitionDate: '2025-08-21',
    categoryId: 'cat-equipamentos',
    code: 'PAT-00126',
    description: 'Projetor portátil 4000 lúmens, ideal para apresentações em salas de reunião.',
    id: 'asset-00126',
    locationId: 'loc-reunioes',
    name: 'Projetor Astra',
    responsibleId: 'resp-joao',
    serial: 'AST-4000-R',
    status: 'transferred',
    value: 4150,
  },
  {
    acquisitionDate: '2026-03-09',
    categoryId: 'cat-eletronicos',
    code: 'PAT-00127',
    description: 'Tablet de 11 polegadas utilizado em vistorias e coleta de assinaturas digitais.',
    id: 'asset-00127',
    locationId: 'loc-laboratorio',
    name: 'Tablet Crystal',
    responsibleId: 'resp-carlos',
    serial: 'CRY-1104-T',
    status: 'active',
    value: 3270,
  },
  {
    acquisitionDate: '2024-06-12',
    categoryId: 'cat-mobiliario',
    code: 'PAT-00128',
    description: 'Cadeira ergonômica com apoio lombar ajustável e braços multifuncionais.',
    id: 'asset-00128',
    locationId: 'loc-administrativo',
    name: 'Cadeira Executive Nova',
    responsibleId: 'resp-rafael',
    serial: 'EXN-2201',
    status: 'active',
    value: 1890,
  },
  {
    acquisitionDate: '2024-02-27',
    categoryId: 'cat-equipamentos',
    code: 'PAT-00129',
    description:
      'Impressora multifuncional laser com digitalização em rede e cartuchos recarregáveis.',
    id: 'asset-00129',
    locationId: 'loc-administrativo',
    name: 'Impressora MysticPrint',
    responsibleId: 'resp-maria',
    serial: 'MYP-3320',
    status: 'maintenance',
    value: 2640,
  },
  {
    acquisitionDate: '2025-04-14',
    categoryId: 'cat-informatica',
    code: 'PAT-00130',
    description: 'Servidor rack de médio porte para serviços internos e rotinas de backup.',
    id: 'asset-00130',
    locationId: 'loc-laboratorio',
    name: 'Servidor Umbral X2',
    responsibleId: 'resp-carlos',
    serial: 'UMB-X2-77',
    status: 'active',
    value: 28700,
  },
  {
    acquisitionDate: '2025-09-30',
    categoryId: 'cat-informatica',
    code: 'PAT-00131',
    description: 'Notebook leve para trabalho remoto, com bateria de longa duração.',
    id: 'asset-00131',
    locationId: 'loc-financeiro',
    name: 'Notebook Viper Slate',
    responsibleId: 'resp-joao',
    serial: 'VPS-4410',
    status: 'transferred',
    value: 6420,
  },
  {
    acquisitionDate: '2024-10-05',
    categoryId: 'cat-mobiliario',
    code: 'PAT-00132',
    description: 'Mesa modular para oito lugares com passagem interna de cabos.',
    id: 'asset-00132',
    locationId: 'loc-reunioes',
    name: 'Mesa de Reunião Prisma',
    responsibleId: null,
    serial: 'PRS-880',
    status: 'active',
    value: 5300,
  },
  {
    acquisitionDate: '2026-02-11',
    categoryId: 'cat-equipamentos',
    code: 'PAT-00133',
    description: 'Kit de videoconferência com barra de som, câmera 4K e microfones direcionais.',
    id: 'asset-00133',
    locationId: 'loc-reunioes',
    name: 'Videoconferência Halo',
    responsibleId: 'resp-ana',
    serial: 'HAL-4K-20',
    status: 'active',
    value: 9800,
  },
  {
    acquisitionDate: '2023-05-19',
    categoryId: 'cat-veiculos',
    code: 'PAT-00134',
    description: 'Veículo utilitário para transporte de equipamentos entre unidades.',
    id: 'asset-00134',
    locationId: 'loc-garagem',
    name: 'Van Logística Greywind',
    responsibleId: 'resp-rafael',
    serial: 'GW-5580-BR',
    status: 'maintenance',
    value: 138500,
  },
  {
    acquisitionDate: '2026-01-05',
    categoryId: 'cat-equipamentos',
    code: 'PAT-00135',
    description: 'Scanner tridimensional para digitalização de peças e protótipos.',
    id: 'asset-00135',
    locationId: 'loc-laboratorio',
    name: 'Scanner Arcano 3D',
    responsibleId: 'resp-carlos',
    serial: 'ARC-3D-09',
    status: 'active',
    value: 21400,
  },
  {
    acquisitionDate: '2021-07-23',
    categoryId: 'cat-informatica',
    code: 'PAT-00136',
    description: 'Notebook antigo mantido como reserva técnica para operações pontuais.',
    id: 'asset-00136',
    locationId: 'loc-laboratorio',
    name: 'Notebook Legacy Lynx',
    responsibleId: null,
    serial: 'LXY-1120',
    status: 'retired',
    value: 3990,
  },
  {
    acquisitionDate: '2026-05-28',
    categoryId: 'cat-eletronicos',
    code: 'PAT-00137',
    description: 'Headset com cancelamento ativo de ruído para equipes de atendimento.',
    id: 'asset-00137',
    locationId: 'loc-estudio',
    name: 'Headset Aether Pro',
    responsibleId: 'resp-ana',
    serial: 'AET-PRO-31',
    status: 'active',
    value: 1290,
  },
  {
    acquisitionDate: '2024-03-16',
    categoryId: 'cat-mobiliario',
    code: 'PAT-00138',
    description: 'Poltrona estofada para o hall de recepção, em tecido lavável.',
    id: 'asset-00138',
    locationId: 'loc-recepcao',
    name: 'Poltrona de Recepção Velvet',
    responsibleId: null,
    serial: 'VLV-770',
    status: 'active',
    value: 1420,
  },
]

export const movements: Movement[] = [
  {
    assetId: 'asset-00124',
    date: '2026-09-03',
    fromLocationId: 'loc-financeiro',
    id: 'mov-0001',
    note: 'Atribuído à Maria Oliveira após configuração inicial, vindo do setor financeiro.',
    responsibleId: 'resp-maria',
    toLocationId: 'loc-administrativo',
    type: 'assignment',
  },
  {
    assetId: 'asset-00126',
    date: '2026-09-01',
    fromLocationId: 'loc-estudio',
    id: 'mov-0002',
    note: 'Movido para a sala de reuniões para uso em apresentações de comitê.',
    responsibleId: 'resp-joao',
    toLocationId: 'loc-reunioes',
    type: 'transfer',
  },
  {
    assetId: 'asset-00127',
    date: '2026-08-27',
    fromLocationId: null,
    id: 'mov-0003',
    note: 'Cadastro inicial do tablet com termo de responsabilidade assinado.',
    responsibleId: 'resp-carlos',
    toLocationId: 'loc-laboratorio',
    type: 'registration',
  },
  {
    assetId: 'asset-00129',
    date: '2026-08-22',
    fromLocationId: 'loc-administrativo',
    id: 'mov-0004',
    note: 'Enviado para manutenção preventiva: substituição do fusor e limpeza interna.',
    responsibleId: 'resp-maria',
    toLocationId: 'loc-laboratorio',
    type: 'maintenance',
  },
  {
    assetId: 'asset-00131',
    date: '2026-08-18',
    fromLocationId: 'loc-administrativo',
    id: 'mov-0005',
    note: 'Transferido para o setor financeiro durante o rodízio de equipamentos.',
    responsibleId: 'resp-joao',
    toLocationId: 'loc-financeiro',
    type: 'transfer',
  },
  {
    assetId: 'asset-00134',
    date: '2026-08-11',
    fromLocationId: 'loc-garagem',
    id: 'mov-0006',
    note: 'Revisão de 40.000 km agendada na oficina credenciada.',
    responsibleId: 'resp-rafael',
    toLocationId: 'loc-garagem',
    type: 'maintenance',
  },
  {
    assetId: 'asset-00133',
    date: '2026-07-29',
    fromLocationId: 'loc-laboratorio',
    id: 'mov-0007',
    note: 'Kit instalado definitivamente na sala de reuniões principal.',
    responsibleId: 'resp-ana',
    toLocationId: 'loc-reunioes',
    type: 'assignment',
  },
  {
    assetId: 'asset-00136',
    date: '2026-07-15',
    fromLocationId: 'loc-administrativo',
    id: 'mov-0008',
    note: 'Devolvido ao estoque técnico e marcado como reserva após substituição.',
    responsibleId: null,
    toLocationId: 'loc-laboratorio',
    type: 'return',
  },
  {
    assetId: 'asset-00137',
    date: '2026-06-30',
    fromLocationId: 'loc-laboratorio',
    id: 'mov-0009',
    note: 'Entregue à equipe de produto para testes de usabilidade.',
    responsibleId: 'resp-ana',
    toLocationId: 'loc-estudio',
    type: 'assignment',
  },
]

const now = Date.now()
const minutesAgo = (minutes: number) => new Date(now - minutes * 60_000).toISOString()

export const activity: ActivityEntry[] = [
  {
    assetId: 'asset-00124',
    id: 'act-001',
    message: 'Notebook ArcaneBook foi atribuído a Maria Oliveira.',
    timestamp: minutesAgo(24),
    tone: 'positive',
  },
  {
    assetId: 'asset-00126',
    id: 'act-002',
    message: 'Projetor Astra foi transferido para a Sala de Reuniões.',
    timestamp: minutesAgo(95),
    tone: 'neutral',
  },
  {
    assetId: 'asset-00127',
    id: 'act-003',
    message: 'Tablet Crystal foi cadastrado no acervo.',
    timestamp: minutesAgo(280),
    tone: 'positive',
  },
  {
    assetId: 'asset-00129',
    id: 'act-004',
    message: 'Impressora MysticPrint entrou em manutenção preventiva.',
    timestamp: minutesAgo(430),
    tone: 'warning',
  },
  {
    assetId: 'asset-00131',
    id: 'act-005',
    message: 'Notebook Viper Slate foi transferido para o Financeiro.',
    timestamp: minutesAgo(720),
    tone: 'neutral',
  },
  {
    assetId: 'asset-00137',
    id: 'act-006',
    message: 'Headset Aether Pro foi atribuído ao Estúdio Criativo.',
    timestamp: minutesAgo(1180),
    tone: 'positive',
  },
]

// --- Selector helpers -------------------------------------------------------

export function getAssetByCode(code: string): Asset | undefined {
  return assets.find((asset) => asset.code.toLowerCase() === code.toLowerCase())
}

export function getAssetById(id: string): Asset | undefined {
  return assets.find((asset) => asset.id === id)
}

export function getCategory(id: string): Category | undefined {
  return categories.find((category) => category.id === id)
}

export function getLocation(id: null | string): Location | undefined {
  if (!id) return undefined
  return locations.find((location) => location.id === id)
}

export function getMovementsForAsset(assetId: string): Movement[] {
  return movements
    .filter((movement) => movement.assetId === assetId)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getResponsible(id: null | string): Responsible | undefined {
  if (!id) return undefined
  return responsibles.find((responsible) => responsible.id === id)
}

export function getTotalValue(): number {
  return assets.reduce((sum, asset) => sum + asset.value, 0)
}
