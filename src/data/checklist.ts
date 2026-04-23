export type ChecklistStatus = 'To do' | 'Waiting' | 'Done'

export type FilterValue = 'All' | ChecklistStatus

export interface ChecklistItem {
  id: number
  section: string
  item: string
  instruction: string
  due: string
  status: ChecklistStatus
  notes: string
}

export const checklistItems: ChecklistItem[] = [
  {
    id: 1,
    section: 'Setup',
    item: 'Confirm company details',
    instruction: 'Check company name, address, and contact details.',
    due: 'Today',
    status: 'To do',
    notes: '',
  },
  {
    id: 2,
    section: 'Setup',
    item: 'Confirm nominated individual',
    instruction: 'Check nominated individual details.',
    due: '24 Apr',
    status: 'To do',
    notes: '',
  },
  {
    id: 3,
    section: 'Setup',
    item: 'Confirm registered manager',
    instruction: 'Check manager details and CV.',
    due: '24 Apr',
    status: 'Waiting',
    notes: '',
  },
  {
    id: 4,
    section: 'Documents',
    item: 'Statement of Purpose',
    instruction: 'Read draft and approve.',
    due: '24 Apr',
    status: 'To do',
    notes: '',
  },
  {
    id: 5,
    section: 'Documents',
    item: 'Business Plan',
    instruction: 'No action needed right now.',
    due: 'Done',
    status: 'Done',
    notes: '',
  },
  {
    id: 6,
    section: 'Documents',
    item: 'Service User Guide',
    instruction: 'Review guide and approve.',
    due: '27 Apr',
    status: 'To do',
    notes: '',
  },
  {
    id: 7,
    section: 'Compliance',
    item: 'DBS evidence',
    instruction: 'Upload DBS certificate.',
    due: 'Today',
    status: 'To do',
    notes: '',
  },
  {
    id: 8,
    section: 'Compliance',
    item: 'Insurance',
    instruction: 'Upload insurance documents.',
    due: '25 Apr',
    status: 'Waiting',
    notes: '',
  },
  {
    id: 9,
    section: 'Compliance',
    item: 'ICO registration',
    instruction: 'Upload ICO confirmation.',
    due: '29 Apr',
    status: 'To do',
    notes: '',
  },
  {
    id: 10,
    section: 'Application',
    item: 'Review application details',
    instruction: 'Check application before submission.',
    due: '30 Apr',
    status: 'Waiting',
    notes: '',
  },
  {
    id: 11,
    section: 'Application',
    item: 'Confirm submission',
    instruction: 'Approve final submission.',
    due: '02 May',
    status: 'To do',
    notes: '',
  },
  {
    id: 12,
    section: 'Policies',
    item: 'Training records',
    instruction: 'Review the staff training evidence pack.',
    due: '28 Apr',
    status: 'To do',
    notes: '',
  },
]
