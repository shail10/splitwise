import AreaChartContainer from '../components/charts/AreaChart'
import BarChartComponent from '../components/charts/BarChart'

import { GroupData } from '../components/charts/data/GroupData'
import { PersonalData } from '../components/charts/data/PersonalData'

import { AREA, BAR, PERSONAL_DATA, GROUP_DATA } from '../utils/constant'

export const GetChart = ({ chartType, dataType }) => {
  if (chartType === AREA && dataType === PERSONAL_DATA)
    return <AreaChartContainer data={PersonalData()} />
  if (chartType === BAR && dataType === PERSONAL_DATA)
    return <BarChartComponent data={PersonalData()} />
  if (chartType === AREA && dataType === GROUP_DATA)
    return <AreaChartContainer data={GroupData()} />
  if (chartType === BAR && dataType === GROUP_DATA)
    return <BarChartComponent data={GroupData()} />
}
