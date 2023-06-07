import Grid from "@mui/material/Unstable_Grid2";
import React, { useContext } from "react";

import { CustomSkelton } from "@/ItemList/DetailDialog/utils";
import { useQuery } from "@apollo/client";
import { Loading } from "./Loading";
import { ItemPropertiesHeadphone } from "@/graphql/generated";
import { LanguageContext, LanguageDictContext } from "@/App";
import { GET_ITEM_PROPERTIES_HEADPHONE } from "@/query";
import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";
import { normalise } from "@/utils";

type Props = {
  ItemId: string;
};

type QueryType = {
  item: {
    properties: ItemPropertiesHeadphone | null;
  };
};

export const Headphone = ({ ItemId }: Props) => {
  const lang = useContext(LanguageContext);
  const { ITEM_PROPERTIES_HEADPHONE } = useContext(LanguageDictContext);
  const { loading, error, data } = useQuery<QueryType>(
    GET_ITEM_PROPERTIES_HEADPHONE(lang),
    {
      variables: {
        itemId: ItemId,
      },
    }
  );

  if (loading) return <Loading />;
  if (!data || error) return null;
  const properties = data.item.properties;

  const LinearProgressWithLabel = (
    props: LinearProgressProps & {
      value: number;
      minValue?: number;
      maxValue?: number;
      unit?: string;
    }
  ) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={normalise(props.value, props.minValue, props.maxValue)}
          />
        </Box>
        <Box sx={{ minWidth: 54, textAlign: "right" }}>
          <Typography variant="body2" color="text.secondary">
            {`${Math.round(props.value)} ${props.unit || ""}`}
          </Typography>
        </Box>
      </Box>
    );
  };
  const FloatLinearProgressWithLabel = (
    props: LinearProgressProps & {
      value: number;
      minValue?: number;
      maxValue?: number;
      unit?: string;
    }
  ) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={normalise(props.value, props.minValue, props.maxValue)}
          />
        </Box>
        <Box sx={{ minWidth: 54, textAlign: "right" }}>
          <Typography variant="body2" color="text.secondary">
            {`${props.value} ${props.unit || ""}`}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <>
      {properties ? (
        <>
          <Grid container sx={{ minHeight: 80, fontSize: "0.7rem" }}>
            {properties.ambientVolume ? (
              <>
                <Grid xs={4}>{ITEM_PROPERTIES_HEADPHONE.ambientVolume}</Grid>
                <Grid xs={8}>
                  <LinearProgressWithLabel
                    value={properties.ambientVolume}
                    minValue={10}
                    maxValue={-10}
                    unit="dB"
                  />
                </Grid>
              </>
            ) : null}
            {properties.compressorAttack ? (
              <>
                <Grid xs={4}>{ITEM_PROPERTIES_HEADPHONE.compressorAttack}</Grid>
                <Grid xs={8}>
                  <LinearProgressWithLabel
                    value={properties.compressorAttack}
                    minValue={40}
                    maxValue={0}
                    unit="ms"
                  />
                </Grid>
              </>
            ) : null}
            {properties.compressorGain ? (
              <>
                <Grid xs={4}>{ITEM_PROPERTIES_HEADPHONE.compressorGain}</Grid>
                <Grid xs={8}>
                  <LinearProgressWithLabel
                    value={properties.compressorGain}
                    minValue={0}
                    maxValue={10}
                    unit="dB"
                  />
                </Grid>
              </>
            ) : null}
            {properties.compressorRelease ? (
              <>
                <Grid xs={4}>
                  {ITEM_PROPERTIES_HEADPHONE.compressorRelease}
                </Grid>
                <Grid xs={8}>
                  <LinearProgressWithLabel
                    value={properties.compressorRelease}
                    minValue={350}
                    maxValue={100}
                    unit="ms"
                  />
                </Grid>
              </>
            ) : null}
            {properties.compressorThreshold ? (
              <>
                <Grid xs={4}>
                  {ITEM_PROPERTIES_HEADPHONE.compressorThreshold}
                </Grid>
                <Grid xs={8}>
                  <LinearProgressWithLabel
                    value={properties.compressorThreshold}
                    minValue={-40}
                    maxValue={-20}
                    unit="dB"
                  />
                </Grid>
              </>
            ) : null}
            {properties.compressorVolume ? (
              <>
                <Grid xs={4}>{ITEM_PROPERTIES_HEADPHONE.compressorVolume}</Grid>
                <Grid xs={8}>
                  <LinearProgressWithLabel
                    value={properties.compressorVolume}
                    minValue={0}
                    maxValue={-5}
                    unit="dB"
                  />
                </Grid>
              </>
            ) : null}
            {properties.cutoffFrequency ? (
              <>
                <Grid xs={4}>{ITEM_PROPERTIES_HEADPHONE.cutoffFrequency}</Grid>
                <Grid xs={8}>
                  <LinearProgressWithLabel
                    value={properties.cutoffFrequency}
                    minValue={0}
                    maxValue={500}
                    unit="Hz"
                  />
                </Grid>
              </>
            ) : null}
            {properties.distanceModifier ? (
              <>
                <Grid xs={4}>{ITEM_PROPERTIES_HEADPHONE.distanceModifier}</Grid>
                <Grid xs={8}>
                  <FloatLinearProgressWithLabel
                    value={properties.distanceModifier}
                    minValue={0}
                    maxValue={1.5}
                  />
                </Grid>
              </>
            ) : null}
            {properties.distortion ? (
              <>
                <Grid xs={4}>{ITEM_PROPERTIES_HEADPHONE.distortion}</Grid>
                <Grid xs={8}>
                  <FloatLinearProgressWithLabel
                    value={properties.distortion}
                    minValue={0}
                    maxValue={1}
                  />
                </Grid>
              </>
            ) : null}
            {properties.dryVolume ? (
              <>
                <Grid xs={4}>{ITEM_PROPERTIES_HEADPHONE.dryVolume}</Grid>
                <Grid xs={8}>
                  <LinearProgressWithLabel
                    value={properties.dryVolume}
                    minValue={-60}
                    maxValue={10}
                    unit="dB"
                  />
                </Grid>
              </>
            ) : null}
            {properties.highFrequencyGain ? (
              <>
                <Grid xs={4}>
                  {ITEM_PROPERTIES_HEADPHONE.highFrequencyGain}
                </Grid>
                <Grid xs={8}>
                  <FloatLinearProgressWithLabel
                    value={properties.highFrequencyGain}
                    minValue={1}
                    maxValue={1.5}
                  />
                </Grid>
              </>
            ) : null}
            {properties.resonance ? (
              <>
                <Grid xs={4}>{ITEM_PROPERTIES_HEADPHONE.resonance}</Grid>
                <Grid xs={8}>
                  <FloatLinearProgressWithLabel
                    value={properties.resonance}
                    minValue={0}
                    maxValue={5}
                  />
                </Grid>
              </>
            ) : null}
          </Grid>
        </>
      ) : (
        <CustomSkelton />
      )}
    </>
  );
};
