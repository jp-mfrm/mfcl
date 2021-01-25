import React from 'react'
import FirmBed from '../Icons/FirmBed'
import ExtraFirmBed from '../Icons/ExtraFirmBed'
import MediumBed from '../Icons/MediumBed'
import PlushBed from '../Icons/PlushBed'
import UltraPlushBed from '../Icons/UltraPlushBed'
import ExtraFirm from '../Icons/ExtraFirm'
import ExtraPlush from '../Icons/ExtraPlush'
import Firm from '../Icons/Firm'
import Medium from '../Icons/Medium'
import Plush from '../Icons/Plush'

const getComfortLogo = (comfort = '') => {
  switch (comfort.toLowerCase()) {
    case 'extrafirmbed': {
      return <ExtraFirmBed />
    }
    break
    case 'firmbed': {
      return <FirmBed />
    }
    break
    case 'mediumbed': {
      return <MediumBed />
    }
    break
    case 'plushbed': {
      return <PlushBed />
    }
    break
    case 'ultraplushbed': {
      return <UltraPlushBed />
    }
    break
    case 'extrafirm': {
      return <ExtraFirm />
    }
    break
    case 'extraplush': {
      return <ExtraPlush />
    }
    break
    case 'firm': {
      return <Firm />
    }
    break
    case 'medium': {
      return <Medium />
    }
    break
    case 'plush': {
      return <Plush />
    }
    break
    default:
      return comfort
  }
}

export default getComfortLogo
