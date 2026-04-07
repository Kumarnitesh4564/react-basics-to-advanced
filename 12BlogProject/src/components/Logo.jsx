import React from 'react'

function Logo({width = '48px'}) {
  return (
    <div className="flex items-center">
      <img
        src="https://logodix.com/logo/1589038.jpg"
        alt="College Logo"
        className="h-10 w-auto object-contain rounded"
        style={{ maxWidth: width }}
      />
    </div>
  )
}

export default Logo