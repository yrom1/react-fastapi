import React, { useState } from "react"

import Hi from "./components/Hi"

const showHi = () => {
  if (window.location.pathname === "/") {
    return <Hi />
  }
}

export default () => {
  return <div className="ui container">{showHi()}</div>
}
