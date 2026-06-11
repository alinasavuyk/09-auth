 import { TailSpin } from 'react-loader-spinner'
import { useState } from 'react';
 import type { CSSProperties } from 'react'

const wrapperStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
}
 function Loading() {
 const [loading] = useState(true)

  return (
    <div>
      <TailSpin
        height="100"
        width="100"
        color="#4b72e0"
        ariaLabel="tail-spin-loading"
        visible={loading}
        wrapperStyle={wrapperStyle}
      />
    </div>
  )
 }
 export default Loading