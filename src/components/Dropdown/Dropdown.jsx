import React from 'react';
import Button from '../../components/Button/Button';


class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listClasses: ['Dropdown-List'],
            buttonClasses: props.btnClasses,
            isShowed: false,
            links: props.links
        }
        this.handleClick = this.handleClick.bind(this);
        this.makeActive = this.makeActive.bind(this);    
    }

    

    getListClasses(additions) {
        let classes = ['Dropdown-List'];

        if (this.props.type === 'standard') {
            classes.push('Dropdown-List_standard');
        } else if (this.props.type === 'minimal') {
            classes.push('Dropdown-List_minimal');
        }

        classes.push(additions);

        return classes;
    }

    checkListClass() {
        if (this.state.isShowed) {
            this.setState({
                listClasses: this.getListClasses('Dropdown-List_show'),
                buttonClasses: this.state.buttonClasses.filter(cls => cls !== 'Button_arrow_down').concat('Button_arrow_up'),
            })
        } else {
            this.setState({
                listClasses: this.getListClasses(),
                buttonClasses: this.state.buttonClasses.filter(cls => cls !== 'Button_arrow_up').concat('Button_arrow_down'),
            })
        }
    }

    handleClick() {
        let isShowed = !this.state.isShowed;
        this.setState({isShowed});
        this.checkListClass();
    }

    makeActive(e) {
        e.preventDefault();
        let active = e.target.innerText;
        // this.props.setActiveRepository(active);
        // this.props.history.push(`?repo=${active}`);
    }

    renderLinks() {
        if (!this.props.repositoriesList) {
            console.log('no data about repositories');
            return;
        }


        return this.props.repositoriesList.map((name, i) => {
            let classes = ['Dropdown-Link'];

            if (this.props.type === 'standard') {
                classes.push('Dropdown-Link_standard');
            } else {
                classes.push('Dropdown-Link_minimal');
            }

            return (
                <a onClick={this.makeActive} key={i} className={classes.join(' ')} href={name}>{name}</a>
            )
        });
    }

    render() {
        return (
            <div className="Dropdown">
                <Button click={this.handleClick} classes={this.state.buttonClasses} title={this.props.btnTitle} text={this.props.activeLink}/>
                <div className="Dropdown-Content">
                    <div className={this.state.listClasses.join(' ')}>
                        {this.renderLinks()}
                    </div>
                </div>
            </div>
        )
    }
}


export default Dropdown;