import styled from "styled-components"
import { a } from '@react-spring/web'

export const HeaderContainer = styled.header`
   display: inline-flex;
   justify-content: space-between;
   align-items: center;
   position: relative;
   width: 100vw;
   height: 102vh;
   z-index: var(--zIndex-headerMaster);
   perspective: 1000px;
   overflow: hidden;
   #background {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0; right: 0; left: 0; bottom: 0;
   }
   #headerIllustration {
      z-index: var(--zIndex-headerContent);
      opacity: 0.8;
      margin-right: 10vw; 
   }
   #headerIllustration * {
      backdrop-filter: var(--mods-blur);
   }
   #parallaxHideEffect {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: var(--zIndex-headerContent - 1);
      background: linear-gradient(180deg, rgba(0,0,0,0) 0%, var(--palette-background) 90%);
   }
   @media (max-width: 730px) {
      #headerIllustration {
         position: absolute;
         opacity: 0.4;
         filter: contrast(1.5) grayscale(1);
         bottom: -20%;
         left: -25vw;
         transform: none;
      }
   }
`

type HeaderContentCssProps = {
   customMask?: string
}

export const HeaderContent = styled.div<HeaderContentCssProps>`
   left: 0;
   width: 55vw;
   height: 100%;
   z-index: var(--zIndex-headerContent);
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: stretch;
   padding-left: 10vw;
   padding-right: 10vw;
   color: #fff;
   background: ${props => props.customMask ? props.customMask : 
   "linear-gradient(145deg, rgba(30,29,69,0.870886025308561) 8%, rgba(141,160,226,0.45071795808167014) 50%, rgba(58,84,180,0.2294294426755077) 77%)"};
   backdrop-filter: var(--mods-blur);
   h2{
      font-size: 3rem;
   }
   @media (max-width: 1100px) {
      h2{ font-size: 2.5rem; }
   }
   @media (max-width: 850px) {
      h2{ font-size: 2.2rem; }

   }
   @media (max-width: 730px) {
      width: 100vw;
      justify-content: flex-end;
      padding-bottom: 35vh;
      backdrop-filter: blur(0.4rem);
      h2{ font-size: 1.9rem; }
   }
`

export const HeaderDisplayButton = styled(a.a)`
   width: fit-content;
   height: fit-content;
   background: var(--palette-opaque-accent2);
   justify-content: center;
   padding: 0.55rem 1.5rem;
   color: white;
   font-size: 1rem;
   font-weight: 400;
   font-family: var(--fons-secondary);
   border: none;
   border-radius: 0.3rem;
   backdrop-filter: var(--mods-blur);
   margin-top: 5rem;
   transition: background 0.3s ease-in-out;
   :hover {
      background: linear-gradient(120deg, var(--palette-accent2) 37%, var(--palette-opaque-accent2) 100%);
   }
`