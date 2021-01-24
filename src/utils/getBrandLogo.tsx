import React, { lazy, Suspense } from 'react'

// load them in dynamically for when we need them
const BeautyRestBrand = lazy(() => import('../Icons/BeautyRestBrand'))
const IntellibedBrand = lazy(() => import('../Icons/IntellibedBrand'))
const LullBrand = lazy(() => import('../Icons/LullBrand'))
const PurpleBrand = lazy(() => import('../Icons/PurpleBrand'))
const SertaBrand = lazy(() => import('../Icons/SertaBrand'))
const SealyBrand = lazy(() => import('../Icons/SealyBrand'))
const SleepysBrand = lazy(() => import('../Icons/SleepysBrand'))
const StearnsAndFosterBrand = lazy(() => import('../Icons/StearnsAndFosterBrand'))
const TempurPedicBrand = lazy(() => import('../Icons/TempurPedicBrand'))
const TuftAndNeedleBrand = lazy(() => import('../Icons/TuftAndNeedleBrand'))
const TuloBrand = lazy(() => import('../Icons/TuloBrand'))

/** dynamically changes SVG width based on height */
function getWidthBasedOnHeight(startingWidth: number, startingHeight: number, height: number) {
  return Math.round((height / startingHeight) * startingWidth)
}

const getBrandLogo = (manufacturName = '', height = 18) => {
  switch (manufacturName.toLowerCase()) {
    case 'beautyrest': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <BeautyRestBrand width={getWidthBasedOnHeight(150, 34, height)} height={height} />{' '}
        </Suspense>
      )
    }
    case 'intellibed': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <IntellibedBrand fillColor="#000" width={getWidthBasedOnHeight(149, 17, height)} height={height} />{' '}
        </Suspense>
      )
    }
    case 'lull': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <LullBrand width={getWidthBasedOnHeight(149, 90, height)} height={height} />{' '}
        </Suspense>
      )
    }
    case 'purple': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <PurpleBrand width={getWidthBasedOnHeight(123, 39, height)} height={height} />
        </Suspense>
      )
    }
    case 'serta': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <SertaBrand width={getWidthBasedOnHeight(69, 54, height)} height={height} />
        </Suspense>
      )
    }
    case 'sealy': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <SealyBrand width={getWidthBasedOnHeight(71, 60, height)} height={height} />
        </Suspense>
      )
    }
    case "sleepy's": {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <SleepysBrand width={getWidthBasedOnHeight(146, 42, height)} height={height} />
        </Suspense>
      )
    }
    case 'stearns and foster': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <StearnsAndFosterBrand width={getWidthBasedOnHeight(258, 19, height)} height={height} />
        </Suspense>
      )
    }
    case 'tempur-pedic': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <TempurPedicBrand width={getWidthBasedOnHeight(163, 45, height)} height={height} />
        </Suspense>
      )
    }
    case 'tuft and needle': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <TuftAndNeedleBrand width={getWidthBasedOnHeight(190, 30, height)} height={height} />
        </Suspense>
      )
    }
    case 'tulo': {
      return (
        <Suspense fallback={<></>}>
          {' '}
          <TuloBrand width={getWidthBasedOnHeight(190, 30, height)} height={height} />
        </Suspense>
      )
    }

    default:
      return manufacturName
  }
}

export default getBrandLogo

// NOTE: simmons, nectar, Brentwood Home, Kings Down brands need an image or svg :)
// there is probably a lot more and we'll need to eventually get those
