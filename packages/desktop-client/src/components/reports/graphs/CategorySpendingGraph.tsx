import * as d from 'date-fns';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack } from 'victory';

import theme from '../chart-theme';
import Container from '../Container';
import Tooltip from '../Tooltip';

import { type CategorySpendingGraphData } from './category-spending-spreadsheet';
import { Area } from './common';

type CategorySpendingGraphProps = {
  start: string;
  end: string;
  graphData: CategorySpendingGraphData;
};
function CategorySpendingGraph({
  start,
  end,
  graphData,
}: CategorySpendingGraphProps) {
  if (!graphData || !graphData.data) {
    return;
  }

  return (
    <Container style={{ height: 600 }}>
      {(width, height, portalHost) => (
        <VictoryChart
          scale={{ x: 'time', y: 'linear' }}
          theme={theme}
          domainPadding={{ x: 0, y: 10 }}
          width={width}
          height={height}
        >
          <Area start={start} end={end} />
          <VictoryStack colorScale="warm">
            {graphData.categories.map(category => (
              <VictoryBar
                key={category.id}
                data={graphData.data[category.id]}
                labelComponent={<Tooltip portalHost={portalHost} />}
                labels={item => item.premadeLabel}
              />
            ))}
          </VictoryStack>
          <VictoryAxis
            style={{ ticks: { stroke: 'red' } }}
            // eslint-disable-next-line rulesdir/typography
            tickFormat={x => d.format(x, "MMM ''yy")}
            tickValues={graphData.tickValues}
            tickCount={Math.max(1, Math.min(5, graphData.tickValues.length))}
            offsetY={50}
            orientation="bottom"
          />
          <VictoryAxis dependentAxis crossAxis={false} invertAxis />
        </VictoryChart>
      )}
    </Container>
  );
}

export default CategorySpendingGraph;
