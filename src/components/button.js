import React from 'react'
import PropTypes from 'prop-types'
import { colors, fontSizes } from '../constants/theme'

const Button = ({ label, onClick, primary, className }) => (
  <div className={className} onClick={onClick}>
    <span>{label}</span>
    <style jsx>{`
      div {
        background: ${primary ? colors.primary : 'white'};
        cursor: pointer;
        // width: fit-content;
        padding: 10px;
        text-align: center;
      }

      span {
        font-size: ${fontSizes.h2};
        font-style: bold;
      }
    `}</style>
  </div>
)

Button.propTypes = {
  // State
  label: PropTypes.string.isRequired,

  // Handlers
  onClick: PropTypes.func.isRequired,

  // Modifiers
  primary: PropTypes.bool,
  className: PropTypes.string
}

Button.defaultProps = {
  // Modifiers
  primary: false,
  className: ''
}

export default Button
