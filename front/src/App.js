import React from "react"

import Home from "./components/Home"
import Dashboard from "./components/Dashboard"
import Projects from "./components/Projects"
import Header from "./components/Header"
import Footer from "./components/Footer"

const showHome = () => {
  if (window.location.pathname === "/") {
    return <Home />
  }
}

const showDashboard = () => {
  if (window.location.pathname === "/dashboard") {
    return <Dashboard />
  }
}

const showProjects = () => {
  if (window.location.pathname === "/projects") {
    return <Projects />
  }
}

export default () => {
  return (
    <div className="ui container">
      {Header()}
      {showHome()}
      {showDashboard()}
      {showProjects()}
      {Footer()}
    </div>
  )
}
