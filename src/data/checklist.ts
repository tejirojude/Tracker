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

type ChecklistSeed = Omit<ChecklistItem, 'id' | 'notes' | 'section'>

const checklistSections: Array<{ section: string; items: ChecklistSeed[] }> = [
  {
    section: 'Company and legal setup',
    items: [
      {
        item: 'Register the company and confirm ownership',
        instruction: 'Register with Companies House and confirm the company directors and ownership structure.',
        due: 'Done',
        status: 'Done',
      },
      {
        item: 'Set up registered office and business contact details',
        instruction: 'Set the registered office address, business email, and contact number.',
        due: 'Today',
        status: 'To do',
      },
      {
        item: 'Open the business bank account',
        instruction: 'Make sure the bank account is ready for trading and service income.',
        due: '24 Apr',
        status: 'Waiting',
      },
      {
        item: 'Confirm trading name consistency',
        instruction: 'Check the trading name is the same across application, documents, and branding.',
        due: '24 Apr',
        status: 'To do',
      },
    ],
  },
  {
    section: 'Registration model',
    items: [
      {
        item: 'Confirm personal care and domiciliary care scope',
        instruction: 'Make sure the application is for Personal Care and domiciliary care in people’s own homes.',
        due: 'Today',
        status: 'To do',
      },
      {
        item: 'Confirm the registered location and operating area',
        instruction: 'Confirm the CQC registered location and the geographical area to be covered.',
        due: '24 Apr',
        status: 'To do',
      },
      {
        item: 'Define service user groups and exclusions',
        instruction: 'Set out who the service will support and what the service will not provide.',
        due: '24 Apr',
        status: 'Waiting',
      },
    ],
  },
  {
    section: 'Key people',
    items: [
      {
        item: 'Identify the provider and nominated individual',
        instruction: 'Confirm the named provider and nominated individual for the application.',
        due: 'Today',
        status: 'Done',
      },
      {
        item: 'Confirm the registered manager',
        instruction: 'Check the registered manager details, experience, and CV.',
        due: '24 Apr',
        status: 'Waiting',
      },
      {
        item: 'Confirm governance and safeguarding oversight',
        instruction: 'Make sure roles are clear, realistic, and tied to safeguarding and governance oversight.',
        due: '24 Apr',
        status: 'To do',
      },
    ],
  },
  {
    section: 'Statement of Purpose',
    items: [
      {
        item: 'Draft provider and location details',
        instruction: 'Add provider details, registered office, and registered location.',
        due: '24 Apr',
        status: 'To do',
      },
      {
        item: 'Describe aims, objectives, and office base',
        instruction: 'Explain the office base, aims, and objectives of the service.',
        due: '25 Apr',
        status: 'To do',
      },
      {
        item: 'Set out service type and regulated activity',
        instruction: 'State clearly that care is delivered in people’s own homes and match the regulated activity exactly.',
        due: '25 Apr',
        status: 'Waiting',
      },
      {
        item: 'Add user bands and final consistency check',
        instruction: 'Add the service user bands and check the wording matches the application.',
        due: '26 Apr',
        status: 'To do',
      },
    ],
  },
  {
    section: 'Business and service planning',
    items: [
      {
        item: 'Draft the business plan and service offer',
        instruction: 'Set out the services to be offered and how the service will operate commercially.',
        due: '25 Apr',
        status: 'To do',
      },
      {
        item: 'Define referral, assessment, and onboarding flow',
        instruction: 'Map the referral process, assessment process, and new service user onboarding steps.',
        due: '26 Apr',
        status: 'To do',
      },
      {
        item: 'Define care planning and review process',
        instruction: 'Explain how care plans are created, reviewed, and updated.',
        due: '26 Apr',
        status: 'To do',
      },
      {
        item: 'Set staffing, out-of-hours, governance, pricing, and mobilisation',
        instruction: 'Build the staffing model, out-of-hours arrangements, governance structure, financial model, and mobilisation plan.',
        due: '27 Apr',
        status: 'Waiting',
      },
    ],
  },
  {
    section: 'Policies and procedures',
    items: [
      {
        item: 'Draft the core care and safety policies',
        instruction: 'Cover safeguarding, complaints, consent and Mental Capacity, medicines, infection control, and equality and human rights.',
        due: '27 Apr',
        status: 'To do',
      },
      {
        item: 'Draft the people and workforce policies',
        instruction: 'Cover recruitment and safer recruitment, supervision and appraisal, staff training and induction, and whistleblowing.',
        due: '28 Apr',
        status: 'Waiting',
      },
      {
        item: 'Draft the governance and business continuity policies',
        instruction: 'Cover governance, incident reporting, health and safety, lone working, risk assessment, confidentiality, data protection, records, and business continuity.',
        due: '28 Apr',
        status: 'To do',
      },
      {
        item: 'Add missed visits and call monitoring procedure',
        instruction: 'Make sure missed visits and call monitoring are clearly documented.',
        due: '29 Apr',
        status: 'To do',
      },
    ],
  },
  {
    section: 'Core operational documents',
    items: [
      {
        item: 'Create the referral and assessment pack',
        instruction: 'Build the referral form, initial assessment form, and pre-service checklist.',
        due: '28 Apr',
        status: 'To do',
      },
      {
        item: 'Create the care planning and consent pack',
        instruction: 'Build the care plan template, risk assessment template, consent form, capacity assessment form, and best interests form.',
        due: '29 Apr',
        status: 'To do',
      },
      {
        item: 'Create the medication, incident, and safeguarding forms',
        instruction: 'Add the medication assessment form, MAR chart system, incident form, and safeguarding concern form.',
        due: '29 Apr',
        status: 'Waiting',
      },
      {
        item: 'Create the complaint, review, and audit tools',
        instruction: 'Add the complaint form, complaint log, spot check form, supervision template, service review form, audit tools, on-call log, risk register, and quality improvement plan.',
        due: '30 Apr',
        status: 'To do',
      },
    ],
  },
  {
    section: 'Recruitment system',
    items: [
      {
        item: 'Create job and recruitment documents',
        instruction: 'Prepare job descriptions, person specifications, application forms, interview questions, and the recruitment checklist.',
        due: '28 Apr',
        status: 'Done',
      },
      {
        item: 'Build vetting and compliance checks',
        instruction: 'Set out DBS, right to work, reference, and employment history checks.',
        due: '29 Apr',
        status: 'To do',
      },
      {
        item: 'Prepare offer, probation, and personnel files',
        instruction: 'Draft the conditional offer letter, contract of employment, probation process, and personnel file structure.',
        due: '29 Apr',
        status: 'To do',
      },
    ],
  },
  {
    section: 'Training system',
    items: [
      {
        item: 'Design the induction and Care Certificate route',
        instruction: 'Set out the staff induction programme and the Care Certificate framework.',
        due: '29 Apr',
        status: 'To do',
      },
      {
        item: 'Build the mandatory training and refresher matrix',
        instruction: 'List the mandatory training, refresher schedule, and training matrix.',
        due: '30 Apr',
        status: 'Waiting',
      },
      {
        item: 'Define competency and supervision checks',
        instruction: 'Include competency assessments, medication checks, moving and handling checks, supervision timetable, and appraisal process.',
        due: '30 Apr',
        status: 'To do',
      },
    ],
  },
  {
    section: 'Governance system',
    items: [
      {
        item: 'Create the monthly audit schedule',
        instruction: 'Set up the audit calendar, including care plan, medication, infection control, staff file, complaints, safeguarding, and incident audits.',
        due: '30 Apr',
        status: 'To do',
      },
      {
        item: 'Set up KPI tracking and governance meetings',
        instruction: 'Track KPIs, hold monthly governance meetings, and keep an action log for improvements.',
        due: '02 May',
        status: 'Waiting',
      },
      {
        item: 'Build quarterly review and quality improvement cycle',
        instruction: 'Set the quarterly management review and quality improvement plan process.',
        due: '02 May',
        status: 'To do',
      },
    ],
  },
  {
    section: 'Data protection and compliance',
    items: [
      {
        item: 'Complete ICO and privacy setup',
        instruction: 'Register with the ICO and prepare the privacy notice.',
        due: '29 Apr',
        status: 'Waiting',
      },
      {
        item: 'Set secure storage and access controls',
        instruction: 'Put secure document storage, access controls, and controlled record handling in place.',
        due: '30 Apr',
        status: 'To do',
      },
      {
        item: 'Prepare breach and subject access processes',
        instruction: 'Write the data breach process, SAR process, and record retention arrangements.',
        due: '30 Apr',
        status: 'To do',
      },
    ],
  },
  {
    section: 'Insurance and business protection',
    items: [
      {
        item: 'Arrange employers and public liability cover',
        instruction: 'Put employers’ liability and public liability insurance in place.',
        due: 'Before submission',
        status: 'Waiting',
      },
      {
        item: 'Arrange professional indemnity and any additional cover',
        instruction: 'Confirm professional indemnity and any extra cover needed for care operations.',
        due: 'Before submission',
        status: 'To do',
      },
    ],
  },
  {
    section: 'Office and infrastructure',
    items: [
      {
        item: 'Confirm the registered location and secure records storage',
        instruction: 'Make sure the registered location is ready and records can be stored securely.',
        due: '30 Apr',
        status: 'To do',
      },
      {
        item: 'Set up IT, email, phone, and contact arrangements',
        instruction: 'Make sure systems, email, and contact routes are live and consistent.',
        due: '30 Apr',
        status: 'To do',
      },
      {
        item: 'Prepare staff file storage and controlled policy format',
        instruction: 'Create staff file storage and a controlled format for policies and documents.',
        due: '30 Apr',
        status: 'To do',
      },
      {
        item: 'Confirm space for induction, meetings, and governance work',
        instruction: 'Make sure there is practical office space for induction, meetings, and governance activity.',
        due: '30 Apr',
        status: 'Waiting',
      },
    ],
  },
  {
    section: 'CQC application work',
    items: [
      {
        item: 'Complete the provider and manager applications',
        instruction: 'Prepare the provider application and the registered manager application.',
        due: '02 May',
        status: 'To do',
      },
      {
        item: 'Upload supporting documents',
        instruction: 'Upload the supporting pack and make sure the file set is complete.',
        due: '02 May',
        status: 'To do',
      },
      {
        item: 'Check all names, addresses, roles, and service descriptions',
        instruction: 'Verify that names, addresses, phone numbers, role titles, and service descriptions all match.',
        due: '02 May',
        status: 'Waiting',
      },
      {
        item: 'Check all policies reflect domiciliary care',
        instruction: 'Make sure the policy pack reflects domiciliary care and not residential care.',
        due: '02 May',
        status: 'To do',
      },
    ],
  },
  {
    section: 'Interview preparation',
    items: [
      {
        item: 'Prepare the nominated individual and registered manager',
        instruction: 'Rehearse the key responsibilities and the service model with both interviewees.',
        due: 'Before interview',
        status: 'To do',
      },
      {
        item: 'Rehearse safeguarding, complaints, and MCA questions',
        instruction: 'Practice answers for safeguarding, complaints, consent, and Mental Capacity questions.',
        due: 'Before interview',
        status: 'To do',
      },
      {
        item: 'Rehearse medicines, staffing, and governance questions',
        instruction: 'Practice answers for medicines, staffing, recruitment, governance, and day-to-day service delivery.',
        due: 'Before interview',
        status: 'Waiting',
      },
      {
        item: 'Align verbal answers to written documents',
        instruction: 'Make sure the interview answers match the written documents exactly.',
        due: 'Before interview',
        status: 'To do',
      },
    ],
  },
  {
    section: 'Post-submission support',
    items: [
      {
        item: 'Respond to CQC queries and clarifications',
        instruction: 'Track and respond to any CQC questions during review.',
        due: 'After submission',
        status: 'Waiting',
      },
      {
        item: 'Amend weak documents if needed',
        instruction: 'Update any weak documents and resubmit the revised versions.',
        due: 'After submission',
        status: 'To do',
      },
      {
        item: 'Support interview follow-up and approval tracking',
        instruction: 'Handle any follow-up after the interview and track the route to approval.',
        due: 'After submission',
        status: 'To do',
      },
    ],
  },
  {
    section: 'Pre-start mobilisation after approval',
    items: [
      {
        item: 'Finalise recruitment and training compliance',
        instruction: 'Complete any remaining recruitment and training actions before start.',
        due: 'After approval',
        status: 'To do',
      },
      {
        item: 'Finalise the digital care system and service user pack',
        instruction: 'Make sure the digital care system and service user pack are ready.',
        due: 'After approval',
        status: 'To do',
      },
      {
        item: 'Finalise service agreement, on-call, and audit calendar',
        instruction: 'Lock down the service agreement, on-call arrangements, and audit calendar.',
        due: 'After approval',
        status: 'Waiting',
      },
      {
        item: 'Prepare for first referral and safe package start',
        instruction: 'Get ready for the first referral and first package to start safely.',
        due: 'After approval',
        status: 'To do',
      },
    ],
  },
]

let nextId = 1

export const checklistItems: ChecklistItem[] = checklistSections.flatMap(({ section, items }) =>
  items.map((item) => ({
    id: nextId++,
    section,
    ...item,
    notes: '',
  })),
)
