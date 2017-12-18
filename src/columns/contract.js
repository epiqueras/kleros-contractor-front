export default [
  {
    Header: 'Address',
    accessor: 'address'
  },
  {
    Header: 'Arbitrator',
    accessor: 'arbitrator'
  },
  {
    Header: 'Description',
    accessor: 'description'
  },
  {
    Header: 'Dispute ID',
    accessor: 'disputeId'
  },
  {
    Header: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Evidence From Party A',
    accessor: 'evidencePartyA'
  },
  {
    Header: 'Evidence From Party B',
    accessor: 'evidencePartyB'
  },
  {
    Header: 'Evidences',
    accessor: 'evidences',
    Cell: row => JSON.stringify(row.value)
  },
  {
    Header: 'Party B',
    accessor: 'partyB'
  },
  {
    Header: 'Timeout',
    accessor: 'timeout'
  }
]
