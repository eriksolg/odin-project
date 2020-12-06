import React, { component } from 'react'

class HeaderSection extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <h1>Firstname Lastname</h1>
                <h3 class="text-muted">Profession</h3>
            </div>
        )
    }
}

export default HeaderSection