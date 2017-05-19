import React from 'react'

let AppLayout = function(props) {
  return (
    <div>
      <header>
        <h1>Welcome to the Star Wars page</h1>
        <hr />
      </header>
      <main>
        {props.children}
      </main>
      <footer>
        <hr />
        Data Served From: <a href="http://swapi.co">SWAPI.co</a>
      </footer>
    </div>
  )
}

export default AppLayout
