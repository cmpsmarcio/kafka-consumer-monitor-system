import React, { Component } from 'react'

export default class Monitor extends Component {
  constructor(props) {
    super(props)

    this.intervalID;

    this.state = {
      data: []
    }
    //this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.getData()
    setInterval(this.getData(), 10000)
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID)
  }

  getData() {
    fetch('api/kafka')
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        let obj = data.map(msg => {
          return JSON.parse(msg)
        })
        obj.push(...this.state.data)
        this.setState({ data: [...obj] })
        clearTimeout(this.intervalID)
      }
      
      this.intervalID = setTimeout(this.getData.bind(this), 10000)
    })
  }
 
  render() {
    const unique = this.state.data.filter(function (a) {
      return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null))

    const row = unique.map(data => {
      if (!data.isTraceble) return

      return (
        <tr key={data.droneId}>
          <td>{data.droneId}</td>
          <td>{data.latitude}</td>
          <td>{data.longitude}</td>
          <td>link</td>
        </tr>
      )
    })

    return (
      <div>
        <table id="drones" className="tabledrone">
          <thead>
            <tr>
              <th>Id</th>
              <th>latitude</th>
              <th>longitude</th>
              <th>Mostrar no mapa</th>
            </tr>
          </thead>
          <tbody>
            {row}
          </tbody>
        </table>
      </div>
    )
  }
}