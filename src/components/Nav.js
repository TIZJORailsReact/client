import React, { Component } from 'react'
import { Nav } from 'tabler-react'

export default class Navbar extends Component {
  render() {
    const user="user";
    return (
      <Nav>
        <Nav.Item active icon="globe">
          Strona główna
        </Nav.Item>
        <Nav.Item hasSubNav value={user} icon="user">
          <Nav.SubItem value="Sub Item 1" />
          <Nav.SubItem>Sub Item 2</Nav.SubItem>
          <Nav.SubItem icon="globe">Sub Item 3</Nav.SubItem>
        </Nav.Item>
      </Nav>
    )
  }
}
