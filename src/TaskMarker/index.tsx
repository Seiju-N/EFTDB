import { Box } from "@mui/material";
import SignatureCanvas from "react-signature-canvas";

export const TaskMarker = () => {
  const imageUrl =
    "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/7/71/StreetsOfTarkov2DMapByJindouz.png/revision/latest";
  return (
    <>
      <img src={imageUrl} />
      <SignatureCanvas
        penColor="green"
        canvasProps={{ width: 500, height: 500 }}
      />
    </>
  );
};
