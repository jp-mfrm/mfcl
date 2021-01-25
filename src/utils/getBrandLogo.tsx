import React from 'react'
import BeautyRestBrand from '../Icons/BeautyRestBrand'
import IntellibedBrand from '../Icons/IntellibedBrand'
import LullBrand from '../Icons/LullBrand'
import PurpleBrand from '../Icons/PurpleBrand'
import SertaBrand from '../Icons/SertaBrand'
import SealyBrand from '../Icons/SealyBrand'
import SleepysBrand from '../Icons/SleepysBrand'
import StearnsAndFosterBrand from '../Icons/StearnsAndFosterBrand'
import TempurPedicBrand from '../Icons/TempurPedicBrand'
import TuftAndNeedleBrand from '../Icons/TuftAndNeedleBrand'
import TuloBrand from '../Icons/TuloBrand'

/** dynamically changes SVG width based on height */
function getWidthBasedOnHeight(startingWidth: number, startingHeight: number, height: number) {
  return Math.round((height / startingHeight) * startingWidth)
}

const getBrandLogo = (manufacturName = '', height = 18) => {
  switch (manufacturName.toLowerCase()) {
    case 'beautyrest':
      {
        return <BeautyRestBrand width={getWidthBasedOnHeight(150, 34, height)} height={height} />
      }
      break
    case 'intellibed':
      {
        return <IntellibedBrand fillColor="#000" width={getWidthBasedOnHeight(149, 17, height)} height={height} />
      }
      break
    case 'lull':
      {
        return <LullBrand width={getWidthBasedOnHeight(149, 90, height)} height={height} />
      }
      break
    case 'purple':
      {
        return <PurpleBrand width={getWidthBasedOnHeight(123, 39, height)} height={height} />
      }
      break
    case 'serta':
      {
        return <SertaBrand width={getWidthBasedOnHeight(69, 54, height)} height={height} />
      }
      break
    case 'sealy':
      {
        return <SealyBrand width={getWidthBasedOnHeight(71, 60, height)} height={height} />
      }
      break
    case "sleepy's":
      {
        return <SleepysBrand width={getWidthBasedOnHeight(146, 42, height)} height={height} />
      }
      break
    case 'stearns and foster':
      {
        return <StearnsAndFosterBrand width={getWidthBasedOnHeight(258, 19, height)} height={height} />
      }
      break
    case 'tempur-pedic':
      {
        return <TempurPedicBrand width={getWidthBasedOnHeight(163, 45, height)} height={height} />
      }
      break
    case 'tuft and needle':
      {
        return <TuftAndNeedleBrand width={getWidthBasedOnHeight(190, 30, height)} height={height} />
      }
      break
    case 'tulo':
      {
        return <TuloBrand width={getWidthBasedOnHeight(190, 30, height)} height={height} />
      }
      break
    default:
      return manufacturName
  }
}

export default getBrandLogo

// NOTE: simmons, nectar, Brentwood Home, Kings Down brands need an image or svg :)
// there is probably a lot more and we'll need to eventually get those
