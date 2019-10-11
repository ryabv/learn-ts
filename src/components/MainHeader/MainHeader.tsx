import React from 'react';
import Logo from '../../components/Logo/Logo';
import DropdownContainer from '../../components/Dropdown/DropdownContainer';

export default function() {
    return (
        <header className="Main-header">
			<div className="Container Container_flex">
                <a href="/" className="Main-header-El Main-header-El_m_right">
                    <Logo />
                </a>
                <DropdownContainer
                    type="minimal"
                    btnTitle="Repository"
                    btnClasses={[
                        'Button_arrow',
                        'Button_arrow_down',
                        'Button_bb Main-header-El',
                    ]}
                />
			</div>
		</header>
    )
}