import React from 'react';
import Tabs from '../../components/Tabs/Tabs';
import BreadcrumbsContainer from'../../components/Breadcrumbs/BreadcrumbsContainer';

export default class PageHeader extends React.Component {
    render() {
        return (
            <header className="Page-header">
                <BreadcrumbsContainer />
                <h1 className="Page-header-Title">test-repository&nbsp;<button className="Button Button_arrow Button_arrow_down Button_color_grey Button_font_inherit Button_weight_normal Page-header-Button">trunk</button>
                </h1>
                <p className="Page-header-Text">Last commit <a className="Link" href="/">c4d248</a> on <a href="/" className="Link">20 Oct 2017, 12:24</a> by <span className="Name">robot-srch-releaser</span></p>
                <Tabs />
            </header>
        )
    }
}

