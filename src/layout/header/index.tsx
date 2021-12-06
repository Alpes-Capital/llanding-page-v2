import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useSpring, config, a } from '@react-spring/web'

import { scale } from '@components/utils'

//* Three and Image backgrounds types for header custom bg options
import type { CustomImgBgProps } from './imageBg'

import {
   HeaderContainer,
   HeaderContent,
   HeaderDisplayButton
} from './style'

//* Background components that will be dynamically imported based 
//* if customBg is chosen between custom threeBg and imageBg
const DynamicImageImport = dynamic(() => import('./imageBg'))
const DefaultIllustrationImport = dynamic(() => import('./defaultIllustration'))

type DefaultProps = {
   title: string
   subTitle: string
   bgAlt?: string
   customMask?: string
   illustrationDisplay: boolean
   CustomIllustration?: React.FC<any>
   optionalButton?: {
      text: string
      url: string
      isExternal?: boolean
   }
}

const windowCheck = typeof window !== "undefined"  
? window : false

type HeaderProps = DefaultProps & { isCustomImgBg?: CustomImgBgProps }
const Header: React.FC<HeaderProps> = ({
   title, subTitle, bgAlt, customMask, optionalButton,
   illustrationDisplay, CustomIllustration, isCustomImgBg
   }) => {

   const [scrollVal, scrollValSet] = useState<number>(0)

   //Getting scrolled value for spring parallax
   useEffect(() => {
      //*Check if window var exists (check if is ssr)
      if(!windowCheck) return

      //* Funtion for setting things with scroll y defining a scroll percentage from 0 to 100vh
      const onScroll = () => {
         if((window.innerHeight - window.scrollY) < 0) return scrollValSet(100)
         else if((window.innerHeight - window.scrollY) === window.innerHeight) return scrollValSet(0)
         return scrollValSet(window.scrollY / window.innerHeight * 100)
      }

      window.addEventListener("scroll", onScroll)
   }, [scrollVal])

   const mainContParallaxY = scale(scrollVal, 0, 100, 0, 600)
   const mainContentSpring = useSpring({
      y: mainContParallaxY,
      opacity: scale(mainContParallaxY, 300, 500, 1, 0),
      transform: 'translateY(0)',
      from: {
         opacity: 0,
         transform: 'translateY(100px)'
      },
      delay: 50,
      config: {
         ...config.molasses
      }
   })

   const opacityConst = 1
   const illustParallaxY = scale(scrollVal, 0, 100, 0, 500)
   const illustParallaxOpacity = scale(illustParallaxY, 250, 400, opacityConst, 0)
   const illustrationSpring = useSpring({
      y: illustParallaxY,
      opacity: illustParallaxOpacity > opacityConst ? opacityConst : illustParallaxOpacity,
      transform: 'translateY(0) rotateY(0) rotateX(0)',
      from: {
         opacity: 0,
         transform: 'translateY(100px)'
      },
      delay: 50,
      config: {
         ...config.molasses
      }
   })

   const hiderParallaxSpring = useSpring({
      opacity: scale(scrollVal, 30, 90, 0, 1),
      config: {
         ...config.stiff
      }
   })
   
   return (
      <HeaderContainer>
         <DynamicImageImport
            imgSource={isCustomImgBg?.imgSource}
            bgAlt={bgAlt} 
            customBlurDataURL={isCustomImgBg?.customBlurDataURL}
            customPlaceholder={isCustomImgBg?.customPlaceholder}
            />
         <HeaderContent customMask={customMask}>
            <a.h2 style={mainContentSpring}>{title}</a.h2>
            <a.p style={mainContentSpring}>{subTitle}</a.p>
            {optionalButton && (
               optionalButton.isExternal ? (
                  <HeaderDisplayButton 
                  style={mainContentSpring}
                  href={optionalButton.url}>{optionalButton.text}</HeaderDisplayButton>
               ) : (
                  <Link href={optionalButton.url} passHref>
                     <HeaderDisplayButton
                     style={mainContentSpring}>{optionalButton.text}</HeaderDisplayButton>
                  </Link>
               )
            )}
         </HeaderContent>
         {(illustrationDisplay && !CustomIllustration) && (
            <a.div style={illustrationSpring} id='headerIllustration'>
               <DefaultIllustrationImport />
            </a.div>
         )}
         {(illustrationDisplay && CustomIllustration) && (
            <a.div style={illustrationSpring} id='headerIllustration'>
               <CustomIllustration />
            </a.div>
         )}
         <a.div style={hiderParallaxSpring} id='parallaxHideEffect' />
      </HeaderContainer>
   )
}

export default Header
