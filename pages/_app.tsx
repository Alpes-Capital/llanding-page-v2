import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ThemeProvider, ThemeTyping } from 'styled-components'
import { DefaultSeo } from 'next-seo'

import { Theme1, Theme2, GlobalStyle, makeCssThemeVars } from "@components/global-style"
import SEO from '../next-seo.config.js'
import usePersistentState from '@components/usePersistentState'
import routes from '@routes'

//Importing Layout elements
import Nav from '@layout/nav'
import MiniNav from '@layout/mini-nav'

function MyApp({ Component, pageProps }: AppProps) {
   //Theme persistent state
   const [isDarkMode, isDarkModeToggle] = usePersistentState(false, 'theme')
   
   //TODO Remove this when css variables are supported
   const [theme, themeSet] = useState<ThemeTyping>(Theme1)

   const cssTheme = useMemo(() => makeCssThemeVars(isDarkMode ? Theme2.palette : Theme1.palette, 'palette'), [isDarkMode])

   //Mini menu state
   const [miniMenu, miniMenuSet] = useState(false)

   //To switch between themes easily
   //TODO Remove this when css variables are supported
   useEffect(() => {
      isDarkMode ? themeSet(Theme2) : themeSet(Theme1)
   }, [isDarkMode])

   return (
     <>
         <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
            <base href={process.env.NEXT_PUBLIC_SITE_URL} target="_blank"></base>
            <script type="application/ld+json">
            {`
               {
                  "@context": "${process.env.NEXT_PUBLIC_SITE_URL}",
                  "@type": "ONG",
                  "url": "${process.env.NEXT_PUBLIC_SITE_URL}",
                  "name": "Alpes Capital",
                  "contactPoint": {
                     "@type": "ContactPoint",
                     "email": "alpes.capital@gmail.com",
                     "contactType": "direct"
                  }
               }
            `}
            </script>
         </Head>
         <DefaultSeo 
         titleTemplate='%s | AlpesCap'
         {...SEO}
         additionalMetaTags={[
            {
               name: 'viewport',
               content: 'width=device-width, initial-scale=1.0',
            },
            {
               name: 'theme-color',
               content: theme.palette.accent1,
            },
            {
               name: 'msapplication-TileColor',
               content: theme.palette.accent1,
            },
            {
               name: 'msapplication-TileImage',
               content: process.env.NEXT_PUBLIC_SITE_URL + '/manifest/ms-icon-150x150.png',
            },
         ]}
         />
         {/*//TODO Remove this when css variables are supported */}
         <ThemeProvider theme={theme}>
         <div style={cssTheme}>
            <GlobalStyle />
            <Nav routes={routes} isDarkTheme={isDarkMode} setTheme={isDarkModeToggle} 
            miniMenuState={miniMenu} setMiniMenu={miniMenuSet}/>
            {/* //TODO Check why all page components reloads when mini menu is opened */}
            <MiniNav routes={routes} active={miniMenu} />
            <Component {...pageProps}/>
         </div>
         </ThemeProvider>
     </>
   )
}

export default MyApp