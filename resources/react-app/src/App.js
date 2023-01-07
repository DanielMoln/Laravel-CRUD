import React, {Component} from 'react';
import {
    Grid,
    Button,
    styled,
    Typography,
} from "@mui/material";

const Break = styled('div')({
    margin: "40px 0"
})

function App() {
  return <React.Fragment>
    <Typography variant="h3">Jegyek</Typography>

    <Grid container direction="row" alignItems="center" justifyContent="center">
        <Grid item>
            <Button>Listázás</Button>
            <Button>Hozzáadás</Button>
            <Button>Frissítés</Button>
            <Button>Törlés</Button>
        </Grid>
    </Grid>

    <Break />

    <Typography variant="h3">Emberek</Typography>

    <Grid container direction="row" alignItems="center" justifyContent="center">
        <Grid item>
            <Button>Listázás</Button>
            <Button>Hozzáadás</Button>
            <Button>Frissítés</Button>
            <Button>Törlés</Button>
        </Grid>
    </Grid>
  </React.Fragment>
}

export default App;
