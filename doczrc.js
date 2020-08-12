const colors = {
  white: '#FFFFFF',
  grayUltraLight: '#F9FAFB',
  grayExtraLight: '#F5F6F7',
  grayLight: '#CED1D5',
  gray: '#8A8F9C',
  grayDark: '#2F3337',
  grayExtraDark: '#080808',
  dark: '#17181A',
  skyBlue: '#1FB6FF',
  blue: '#389BFF',
  background: '#080808',
  border: '#545658',
  negative: '#FE0625'
}

const prismDark = {
  plain: {
    color: '#d6deeb',
    backgroundColor: '#13161F'
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'rgb(162, 191, 252)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgba(239, 83, 80, 0.56)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: 'rgb(173, 219, 103)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['comment'],
      style: {
        color: 'rgb(99, 119, 119)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['string', 'url'],
      style: {
        color: 'rgb(173, 219, 103)'
      }
    },
    {
      types: ['variable'],
      style: {
        color: 'rgb(214, 222, 235)'
      }
    },
    {
      types: ['number'],
      style: {
        color: 'rgb(247, 140, 108)'
      }
    },
    {
      types: ['builtin', 'char', 'constant', 'function'],
      style: {
        color: 'rgb(130, 170, 255)'
      }
    },
    {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ['punctuation'],
      style: {
        color: 'rgb(199, 146, 234)'
      }
    },
    {
      types: ['selector', 'doctype'],
      style: {
        color: 'rgb(199, 146, 234)',
        fontStyle: 'italic'
      }
    },
    {
      types: ['class-name'],
      style: {
        color: 'rgb(255, 203, 139)'
      }
    },
    {
      types: ['tag', 'operator', 'keyword'],
      style: {
        color: 'rgb(127, 219, 202)'
      }
    },
    {
      types: ['boolean'],
      style: {
        color: 'rgb(255, 88, 116)'
      }
    },
    {
      types: ['property'],
      style: {
        color: 'rgb(128, 203, 196)'
      }
    },
    {
      types: ['namespace'],
      style: {
        color: 'rgb(178, 204, 214)'
      }
    }
  ]
}

const dark = {
  ...colors,
  primary: colors.skyBlue,
  text: colors.grayExtraLight,
  muted: colors.gray,
  link: colors.skyBlue,
  background: colors.grayExtraDark,
  border: colors.grayDark,
  sidebar: {
    bg: colors.grayExtraDark,
    navGroup: colors.gray,
    navLink: colors.grayLight,
    navLinkActive: colors.skyBlue,
    tocLink: colors.gray,
    tocLinkActive: colors.grayLight
  },
  header: {
    bg: colors.dark,
    text: colors.grayLight,
    border: colors.grayDark,
    button: {
      bg: colors.skyBlue,
      color: colors.white
    }
  },
  props: {
    bg: colors.dark,
    text: colors.gray,
    highlight: colors.skyBlue,
    defaultValue: colors.grayDark,
    descriptionText: colors.gray,
    descriptionBg: colors.grayExtraDark
  },
  playground: {
    bg: colors.dark,
    border: colors.grayDark
  },
  blockquote: {
    bg: colors.grayDark,
    border: colors.gray,
    color: colors.gray
  },
  prism: {
    ...prismDark
  }
}

export default {
  title: 'Mattress Firm Component Library',
  description: 'React Component Library for UI consistency between repositories',
  dest: './docz_dest',
  src: './src',
  port: 4000,
  typescript: true,
  themeConfig: {
    showPlaygroundEditor: true,
    initialColorMode: 'dark',
    codemirrorTheme: 'material',
    colors: {
      light: {
        ...colors
      },
      dark
    },
    mode: 'dark',
    /** Styles */
    styles: {
      body: {
        fontFamily: "'Rubik', 'Arial', sans-serif"
      }
    }
  },
  htmlContext: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://codemirror.net/theme/material.css'
        }
      ]
    }
  }
}
