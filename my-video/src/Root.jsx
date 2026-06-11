import "./index.css";
import { Composition } from "remotion";
import { OdovoxFilm } from "./Odovox/Film";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        // Render with: npx remotion render OdovoxFilm
        id="OdovoxFilm"
        component={OdovoxFilm}
        durationInFrames={999}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
