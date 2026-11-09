import { Lineup } from "./Lineup";
import { Lookbook } from "./Lookbook";

/** #collections: the lineup of nine pieces followed by the editorial lookbook. */
export function Collections() {
  return (
    <div id="collections">
      <Lineup />
      <Lookbook />
    </div>
  );
}
