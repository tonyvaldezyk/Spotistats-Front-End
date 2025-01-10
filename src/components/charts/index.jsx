import BarChart from './BarChart';
import LineChart from './LineChart';
import HeatmapChart from './HeatmapChart';
import CurvedLineChart from './CurvedLineChart';
import List from './ListChart';

const Chart = ({
  chartType,
  data,
  xKey,
  yKey,
  xLabel,
  yLabel,
  labels,
  expanded,
  variant = ""
}) => {

  console.log(chartType, data.popularity_per_language)

  if (chartType === "lineChart") return (
    <LineChart 
      data={Object.entries(data?.songsByYear || {}).map(([year, count]) => ({
      year: parseInt(year),
      count: count
      }))} 
      xKey={xKey} yKey={yKey} xLabel={xLabel} yLabel={yLabel}/>
  )
  if (chartType === "barChart") return (
    <BarChart 
      data={Object.entries(data.popularity_per_language).map(([key, value]) => ({
        [xKey]: key || 'Inconnu',
        [yKey]: Math.round(value)
      }))} 
      xKey={xKey} yKey={yKey} xLabel={xLabel} yLabel={yLabel}
    />
  )
  if (chartType === "heatmapChart") return (
    <HeatmapChart data={data.data} xLabel={xLabel} yLabel={yLabel} maxDensity={data.maxDensity}/>
  )
  if (chartType === "curvedLineChart") return (
    <CurvedLineChart 
      data={Object.entries(acousticnessData?.average_acousticness || {}).map(([year, value]) => ({
      year: parseInt(year),
      acousticness: value,
      danceability: danceabilityData?.average_danceability[year] || 0
      }))}
      xKey={xKey} yKey={yKey} xLabel={xLabel} yLabel={yLabel} labels={labels}
  />
  )
  if (chartType === "list") return (
    <List data={data} xKey={xKey}/>
  )
  else return <div>Non</div>
}

export default Chart
