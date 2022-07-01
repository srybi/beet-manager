import styled from "styled-components";


export const HeaderWrapper = styled.header`
  grid-column: 1 / -1;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
  }

  @media (min-width: 48em) {
    li {
      float: left;
    }

    li a {
      padding: 20px 30px;
    }
  }
`;

export const Logo = styled.a`
  display: block;
  float: left;
  font-size: 2em;
  padding: 10px 20px;
  text-decoration: none;
`;

export const Menu = styled.ul`
  clear: both;
  max-height: 0;
  transition: max-height 0.2s ease-out;

  @media (min-width: 48em) {
    clear: none;
    float: right;
    max-height: none;
  }
`;

export const MenuIcon = styled.label`
  cursor: pointer;
  display: inline-block;
  float: right;
  padding: 28px 20px;
  position: relative;
  user-select: none;

  @media (min-width: 48em) {
    display: none;
  }
`;
