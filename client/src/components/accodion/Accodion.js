import React, { createContext, useState, useContext } from 'react';
import { Container, Title, Frame, Item, Inner, Header, Body } from './style/Accodion';

const ToggleContext = createContext();

export default function Accodion({ children, ...restProps }) {
    return (
        <div>
            <Container {...restProps}>
                <Inner>{children}</Inner>
            </Container>
        </div>
    )
}

Accodion.Title = function AccordionTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>;
};

Accodion.Frame = function AccordionFrame({ children, ...restProps }) {
    return <Frame {...restProps}>{children}</Frame>;
};

Accodion.Item = function AccordionItem({ children, ...restProps }) {
    const [toggleShow, setToggleShow] = useState(false);

    return (
        <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
            <Item {...restProps}>{children}</Item>
        </ToggleContext.Provider>
    );
};

Accodion.Header = function AccordionHeader({ children, ...restProps }) {
    const { toggleShow, setToggleShow } = useContext(ToggleContext);
    return (
        <Header onClick={() =>setToggleShow((toggleShow) => !toggleShow)} {...restProps}>
            {children}
            {toggleShow ? (
                <img src ="/images/icons/13642496711586787817.svg" alt="Open" />
            ) : (
                <img src="/images/icons/2181182971586788043.svg" alt="Close" />
            )}
        </Header>
    );
};

Accodion.Body = function AccodionBody({ children, ...restProps }) {
    const { toggleShow } = useContext(ToggleContext);

    return toggleShow ? <Body {...restProps}>{children}</Body> : null;
}
