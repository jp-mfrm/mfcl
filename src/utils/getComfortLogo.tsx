import React, { lazy, Suspense } from 'react'

// load them in dynamically for when we need them
const ExtraFirmBed = lazy(() => import('../Icons/ExtraFirmBed'))
const FirmBed = lazy(() => import('../Icons/FirmBed'))
const MediumBed = lazy(() => import('../Icons/MediumBed'))
const PlushBed = lazy(() => import('../Icons/PlushBed'))
const UltraPlushBed = lazy(() => import('../Icons/UltraPlushBed'))
const ExtraFirm = lazy(() => import('../Icons/ExtraFirm'))
const ExtraPlush = lazy(() => import('../Icons/ExtraPlush'))
const Firm = lazy(() => import('../Icons/Firm'))
const Medium = lazy(() => import('../Icons/Medium'))
const Plush = lazy(() => import('../Icons/Plush'))

const getComfortLogo = (comfort = '') => {
  switch (comfort.toLowerCase()) {
    case 'extrafirmbed': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <ExtraFirmBed />{' '}
        </Suspense>
      )
    }
    case 'firmbed': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <FirmBed />{' '}
        </Suspense>
      )
    }
    case 'mediumbed': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <MediumBed />{' '}
        </Suspense>
      )
    }
    case 'plushbed': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <PlushBed />{' '}
        </Suspense>
      )
    }
    case 'ultraplushbed': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <UltraPlushBed />{' '}
        </Suspense>
      )
    }
    case 'extrafirm': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <ExtraFirm />{' '}
        </Suspense>
      )
    }
    case 'extraplush': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <ExtraPlush />{' '}
        </Suspense>
      )
    }
    case 'firm': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <Firm />{' '}
        </Suspense>
      )
    }
    case 'medium': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <Medium />{' '}
        </Suspense>
      )
    }
    case 'plush': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <Plush />{' '}
        </Suspense>
      )
    }
    
    default:
      return comfort
  }
}

export default getComfortLogo
