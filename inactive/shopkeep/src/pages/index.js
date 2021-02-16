import Page from "components/page";
import { Button, Container, Typography } from "@material-ui/core";

export default function Index() {
  return (
    <Page>
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1">
          ShopKeep
        </Typography>
        <Typography variant="h5" component="h2">
          A sane catalogue for Dungeons & Dragons
        </Typography>
        <br />
        <Button variant="contained" color="primary" href="catalogue">
          Open Catalogue
        </Button>
      </Container>
    </Page>
  );
}
