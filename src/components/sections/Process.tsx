import { NewLanguage } from "./NewLanguage";
import { ThreeWorlds } from "./ThreeWorlds";
import { Competitive } from "./Competitive";
import { KazoDirection } from "./KazoDirection";
import { TechPack } from "./TechPack";
import { RangePricing } from "./RangePricing";
import { BuyLaunch } from "./BuyLaunch";
import { ProductDevelopment } from "./ProductDevelopment";
import { DesignJourney } from "./DesignJourney";
import { Skills } from "./Skills";

/**
 * #process: the thinking behind the collection, in story order:
 * research (forecast) → construction (tech pack) → commerce → the journey that ties it together → skills.
 */
export function Process() {
  return (
    <div id="process">
      <div id="forecasting">
        <NewLanguage />
        <ThreeWorlds />
        <Competitive />
        <KazoDirection />
      </div>
      <TechPack />
      <RangePricing />
      <BuyLaunch />
      <ProductDevelopment />
      <DesignJourney />
      <Skills />
    </div>
  );
}
