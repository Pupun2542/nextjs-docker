import React from 'react'
import Tabletop from 'tabletop'
export default function SpreadsheetHandler() {

  const tt = Tabletop.init({
    key: '1sbyMINQHPsJctjAtMW0lCfLrcpMqoGMOJj6AN-sNQrc',
    callback: googleData =>{
      console.log(googleData)
    }
  })
  
  return (
    <div>SpreadsheetHandler</div>
  )
}