import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import logo1 from "../../assets/logo1.png";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Verma</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={logo1}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Verma</Typography>
        <Typography color={medium}>verma.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        "Verma" is a social media app where users can share posts, including images and thoughts, and chat with friends.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
