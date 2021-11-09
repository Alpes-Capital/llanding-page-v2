import Link from 'next/link'
import styled, { css } from 'styled-components'

type StylesProps = {
   color?: string,
   displayAfter?: boolean,
}


export const LinkText = styled.span<StylesProps>`
   position: relative;
   font-family: 'Montserrat Alternates';
   text-decoration: none;
   width: fit-content;
   color: ${props => props.color || props.theme.palete.textWhiteBg};
   font-size: 1.2rem;
   font-weight: 400;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   overflow: visible;
   transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
   background: transparent;
   border-radius: 6px;
   padding-top: 0.1rem;
   padding-bottom: 0.1rem;
   padding-left: 0.5rem;
   padding-right: 0.5rem;
   margin: 0.3rem;
   :after, :before {
      content: '';
      background: grey;
      position: absolute;
   }
   :after {
      width: 100%;
      height: 20px;
      left: 10px;
      bottom: 0;
      transform: translateY(100%) rotateX(90deg);
   }
   :before {
      width: 20px;
      height: 100%;
      right: 0;
      transform: translateX(100%) rotateY(90deg);
      top: 10px;
   }
`

const LinkTextContainer = styled.a`
   display: block;
   perspective: 2000px;
   perspective-origin: 50% 50%;
   cursor: pointer;
   :hover ${LinkText} {
      transform: 
         scale3d(1,1,1) rotateX(17deg) rotateY(-12deg) translate3d(-2px,-2px,11px);
      background-color: ${props => props.theme.palete.accent1 + '10'};
      box-shadow: 0.5px 0.5px ${props => props.theme.palete.accent1 + '10'},
         1px 1px ${props => props.theme.palete.accent1 + '10'},
         1.5px 1.5px ${props => props.theme.palete.accent1 + '10'},
         2px 2px ${props => props.theme.palete.accent1 + '10'},
         2.5px 2.5px ${props => props.theme.palete.accent1 + '10'},
         3px 3px ${props => props.theme.palete.accent1 + '10'},
         3.5px 3.5px ${props => props.theme.palete.accent1 + '10'};
      
      text-shadow: 0px 3px 2px rgba(150, 150, 150, 1);
   }
`

type LinkProps = {
   href: string
   name: string
   customStyle?: StylesProps
}

//TODO Improve animation and style ++ add subitems to the link

const LinkCustom: React.FC<LinkProps> = ({ href, name, customStyle }) => {
  return (
    <Link href={href} passHref>
      <LinkTextContainer>
         <LinkText {...customStyle}>{name}</LinkText>
      </LinkTextContainer>
    </Link>
  )
}

export default LinkCustom