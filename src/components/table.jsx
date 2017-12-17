import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class Table extends PureComponent {
  // eslint-disable-next-line no-undef
  getTrProps = (...args) => {
    const { onRowClick } = this.props
    return {
      onClick: onRowClick && (() => onRowClick(...args)),
      style: { cursor: onRowClick ? 'pointer' : 'normal' }
    }
  }

  render() {
    const { columns, data, loading, className } = this.props
    return (
      <ReactTable
        columns={columns}
        data={data}
        loading={loading}
        className={`${className} -striped -highlight`}
        defaultPageSize={10}
        getTrProps={this.getTrProps}
      />
    )
  }
}

Table.propTypes = {
  // State
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loading: PropTypes.bool,

  // Modifiers
  className: PropTypes.string,

  // Handlers
  onRowClick: PropTypes.func
}

Table.defaultProps = {
  // Modifiers
  className: '',
  loading: false,

  // Handlers
  onRowClick: null
}

export default Table
