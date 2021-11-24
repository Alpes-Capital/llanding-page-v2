import { memo } from 'react'
import Image from 'next/image'

import {
   HeaderContainer,
   HeaderContent
} from './style'

import TestImage from '@p-images/index/test.jpg'
import AlpesLogo from '@images/global/mini.svg'

const Header = () => {
   return (
      <HeaderContainer>
         <Image 
         id="background"
         src={TestImage} 
         alt="background"
         layout='fill'
         objectFit="none"
         placeholder="blur"
         quality={100} />
         <HeaderContent>
            <h2>Hello World from AlpesCap !</h2>
            <p>Nós somos a Alpes Capital, olá!!👋😉</p>
         </HeaderContent>
         <AlpesLogo  id='HeaderLogo' />
      </HeaderContainer>
   )
}

export default Header
