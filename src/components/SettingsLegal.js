import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Section from "./Section";

function SettingsLegal(props) {
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Box mt={5}>
        <Container>Legal And About</Container>
      </Box>
    </Section>
  );
}

export default SettingsLegal;
