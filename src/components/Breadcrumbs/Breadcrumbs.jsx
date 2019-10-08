import React from 'react';

export default class Breadcrumbs extends React.Component {

    getLinks() {
        if (!this.props.data) {
            console.log('no breadcrumbs');
            return;
        }

        return this.props.data.map((breadcrumb, i , arr) => {
            
            let activeClass = '';
            if (i === arr.length - 1) {
                activeClass = 'Breadcrumbs-Link_active';
            }

            return (
                <a key={i} className={`Breadcrumbs-Link ${activeClass}`} href={breadcrumb.link}>{breadcrumb.name}</a>
            )
        })        
    }

    render() {
        return (
            <section className="Breadcrumbs">
                <a className='Breadcrumbs-Link Breadcrumbs-Link_active' href='/'>test-repository</a>
                {this.getLinks()}
            </section>
        )
    }
}