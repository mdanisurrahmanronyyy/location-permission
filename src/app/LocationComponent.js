import React from 'react'
import Script from 'next/script'

const LocationComponent = () => {
  return (
    <div>
      <h1>Location Component</h1>
      <Script src="https://cdn.us-bangla.com/user-tracking/tn-maps.js" />
    </div>
  )
}

export default LocationComponent
