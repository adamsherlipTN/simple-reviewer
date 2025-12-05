import { Calculator } from '@/components/calculator/Calculator';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SWP Implementation Planner | Estimate Costs & Timelines</title>
        <meta name="description" content="Plan end-to-end SWP implementations including job architecture mapping, enablement, and strategic consulting with accurate cost and timeline estimates." />
      </Helmet>
      <Calculator />
    </>
  );
};

export default Index;
