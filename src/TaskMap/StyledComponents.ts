import ReactFlow, {
  Controls,
  MiniMap,
} from "reactflow";
import styled from "styled-components";

export const StyledComponents = () => {
  const darkTheme = {
    bg: "#000",
    primary: "#ff0072",

    nodeBg: "#343435",
    nodeColor: "#f9f9f9",
    nodeBorder: "#888",

    minimapMaskBg: "#343435",

    controlsBg: "#555",
    controlsBgHover: "#676768",
    controlsColor: "#dddddd",
    controlsBorder: "#676768",
  };

  const ReactFlowStyled = styled(ReactFlow)`
    background-color: ${darkTheme.bg};
  `;

  const MiniMapStyled = styled(MiniMap)`
    background-color: ${darkTheme.bg};

    .react-flow__minimap-mask {
      fill: ${darkTheme.minimapMaskBg};
    }

    .react-flow__minimap-node {
      fill: ${darkTheme.nodeBg};
      stroke: none;
    }
  `;

  const ControlsStyled = styled(Controls)`
    button {
      background-color: ${darkTheme.controlsBg};
      color: ${darkTheme.controlsColor};
      border-bottom: 1px solid ${darkTheme.controlsBorder};

      &:hover {
        background-color: ${darkTheme.controlsBgHover};
      }

      path {
        fill: currentColor;
      }
    }
  `;

  return {
    ReactFlowStyled,
    MiniMapStyled,
    ControlsStyled,
  };
}
