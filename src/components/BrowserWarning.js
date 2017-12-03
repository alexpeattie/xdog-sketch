import React from 'react'
import styled from 'styled-components'
import { detect } from 'detect-browser'

const Warning = styled.div`
  background: rgba(232, 86, 0, .9);
  border-color: #e85600;
  padding: 0.5rem 2rem;
  color: #fff;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  min-width: 1000px;
`

const BrowserWarning = props => {
  const { name, version } = (detect() || {})
  const isRecentChrome = (name === 'chrome' && parseFloat(version) > 50)

  return !isRecentChrome && (<Warning>
      It's recommended you use a recent version of Chrome with this tool; other browsers haven't been tested and may cause unexpected results.
    </Warning>)
}

export default BrowserWarning