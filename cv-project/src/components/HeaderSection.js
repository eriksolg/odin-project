import React, { component } from 'react'

class HeaderSection extends React.Component {
    constructor() {
        super();

        this.state = {
            firstName: 'Michelangelo',
            lastName: 'Crisostomus',
            profession: 'IT-specialist'
        }
    }

    render() {
        const { firstName, lastName, profession } = this.state;

        return (
            <div>
                <h1>{firstName} {lastName}</h1>
                <h3 class="text-muted">{profession}</h3>
            </div>
        )
    }
}

export default HeaderSection