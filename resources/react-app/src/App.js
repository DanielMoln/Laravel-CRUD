import React, { Component} from 'react';
import { Button, Grid, List, ListItem, ListItemButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [tickets, setTickets] = useState([]);
    const [people, setPeople] = useState([]);
    const [isTicketAdding, setIsTicketAdding] = useState(false);
    const [isTicketRemove, setIsTicketRemove] = useState(false);
    const [isTicketUpdate, setIsTicketUpdate] = useState(false);
    const [isPeopleAdding, setIsPeopleAdding] = useState(false);
    const [isPeopleRemove, setIsPeopleRemove] = useState(false);
    const [isPeopleUpdate, setIsPeopleUpdate] = useState(false);
    const [newTicket, setNewTicket] = useState({
        id: 0,
        prefix: "",
        price: 0,
        releaseDate: new Date(),
        maxUsages: 0
    })
    const [newPerson, setNewPerson] = useState({
        id: 0,
        name: "",
        age: 0,
        ticket_id: 0
    })

    const handleTicketsListing = async () => {
        const response = await axios.get("http://localhost:8000/api/tickets");
        setTickets(response.data);
    }
    const handlePeopleListing = async () => {
        const response = await axios.get("http://localhost:8000/api/people");
        setPeople(response.data);
    }

    const handleTicketCreation = async () => {
        const body = JSON.stringify({
            prefix: newTicket.prefix,
            price: newTicket.price,
            release_date: newTicket.releaseDate.toString(),
            max_usages: newTicket.maxUsages
        });
        const response = await axios.post("http://localhost:8000/api/tickets/create", body, { headers: {  "Content-Type": "application/json" } });
        const data = response.data;
        alert("Sikeresen létrehoztad!")
    }

    const handleTicketUpdate = async () => {
        const body = JSON.stringify({
            id: newTicket.id,
            prefix: newTicket.prefix,
            price: newTicket.price,
            release_date: newTicket.releaseDate.toString(),
            max_usages: newTicket.maxUsages
        });
        const response = await axios.put(`http://localhost:8000/api/tickets/${newTicket.id}`, body, { headers: {  "Content-Type": "application/json" } });
        const data = response.data;
    }

    const handleTicketDeletion = async () => {
        const response = await axios.delete(`http://localhost:8000/api/tickets/${newTicket.id}`, { headers: {  "Content-Type": "application/json" } });
        const data = response.data;
        alert("Sikeresen törölted!")
    }

    const handlePeopleCreation = async () => {
        console.log(newPerson);
        const body = JSON.stringify({
            name: newPerson.name,
            age: newPerson.age,
            ticket_id: newPerson.ticket_id,
        });
        const response = await axios.post("http://localhost:8000/api/people/create", body, { headers: {  "Content-Type": "application/json" } });
        const data = response.data;
        alert("Sikeresen létrehoztad!")
    }

    const handlePeopleUpdate = async () => {
        const body = JSON.stringify({
            id: newPerson.id,
            name: newPerson.name,
            age: newPerson.age,
            ticket_id: newPerson.ticket_id,
        });
        const response = await axios.put(`http://localhost:8000/api/people/${newPerson.id}`, body, { headers: {  "Content-Type": "application/json" } });
        const data = response.data;
        alert("Sikeresen modosítottad!")
    }

    const handlePeopleDeletion = async () => {
        const response = await axios.delete(`http://localhost:8000/api/people/${newPerson.id}`, { headers: {  "Content-Type": "application/json" } });
        const data = response.data;
        alert("Sikeresen törölted!")
    }

    const ticketColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'prefix', headerName: 'Előtag', width: 130 },
        { field: 'price', headerName: 'Ár', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        { field: 'release_date', headerName: 'Kiadás éve', width: 130 },
        { field: 'max_usages', headerName: 'Maximum felhasználhatóság', width: 130 }
    ];
    const peopleColumns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'ID', width: 70 },
        { field: 'age', headerName: 'ID', width: 70, type: 'number'},
        { field: 'ticket_id', headerName: 'ID', width: 70, type: 'number'},
    ];

    useEffect(() => {
        handleTicketsListing();
        handlePeopleListing();
        setIsLoading(false);
    }, [])

    return (<div>
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6} >
                <Typography variant="h3" align="center">Jegyek</Typography>

                <Grid container direction="row" alignItems="center" justifyContent="center" gap={2} sx={{ margin: "20px 0" }} >
                    <Button variant="contained" color="success" onClick={e=>{setIsTicketAdding(true);setIsTicketRemove(false);setIsTicketUpdate(false)}}>Hozzáadás</Button>
                    <Button variant="contained" color="error" onClick={e=>{setIsTicketAdding(false);setIsTicketRemove(true);setIsTicketUpdate(false)}}>Törlés</Button>
                    <Button variant="contained" color="warning" onClick={e=>{setIsTicketAdding(false);setIsTicketRemove(false);setIsTicketUpdate(true)}}>Modosítás</Button>
                </Grid>

                {
                    isTicketAdding && <div style={{margin: "20px 0"}}>
                        <Grid container direction="column" alignItems="center" justifyContent="center" gap={2}>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="text" onChange={e=>newTicket.prefix=e.target.value} label="Előtag" variant="outlined" />
                            </Grid>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="number" onChange={e=>newTicket.price=parseInt(""+e.target.value)} label="Ár" variant="outlined" />
                            </Grid>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="date" onChange={e=>newTicket.releaseDate=e.target.value} label="Kiadási dátum" variant="outlined" />
                            </Grid>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="number" onChange={e=>newTicket.maxUsages=parseInt(""+e.target.value)} label="Maximum felhasználhatóság" variant="outlined" />
                            </Grid>

                            <Grid item sx={{width: "100%"}}>
                                <Button variant="contained" color="success" onClick={() => handleTicketCreation()}>Létrehozás</Button>
                            </Grid>
                        </Grid>

                    </div>
                }
                {
                    isTicketRemove && <div style={{margin: "20px 0"}}>
                        <Grid container direction="column" alignItems="center" justifyContent="center" gap={2}>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="text" onChange={e=>newTicket.id=parseInt(""+e.target.value)} label="Azonosító" variant="outlined" />
                            </Grid>

                            <Grid item sx={{width: "100%"}}>
                                <Button variant="contained" color="error" onClick={() => handleTicketDeletion()}>Törlés</Button>
                            </Grid>
                        </Grid>

                    </div>
                }
                {
                    isTicketUpdate && <div style={{margin: "20px 0"}}>
                        <Grid container direction="column" alignItems="center" justifyContent="center" gap={2}>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="text" onChange={e=>newTicket.id=parseInt(""+e.target.value)} label="Azonosító" variant="outlined" />
                            </Grid>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="text" onChange={e=>newTicket.prefix=e.target.value} label="Előtag" variant="outlined" />
                            </Grid>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="number" onChange={e=>newTicket.price=parseInt(""+e.target.value)} label="Ár" variant="outlined" />
                            </Grid>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="date" onChange={e=>newTicket.releaseDate=e.target.value} label="Kiadási dátum" variant="outlined" />
                            </Grid>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="number" onChange={e=>newTicket.maxUsages=parseInt(""+e.target.value)} label="Maximum felhasználhatóság" variant="outlined" />
                            </Grid>

                            <Grid item sx={{width: "100%"}}>
                                <Button variant="contained" color="success" onClick={() => handleTicketUpdate()}>Modosítás</Button>
                            </Grid>
                        </Grid>

                    </div>
                }
            </Grid>

            <Grid item xs={6}>
                <Typography variant="h3" align="center">Vendégek</Typography>

                <Grid container direction="row" alignItems="center" justifyContent="center" gap={2} sx={{ margin: "20px 0" }} >
                    <Button variant="contained" color="success" onClick={e=>{setIsPeopleAdding(true);setIsPeopleRemove(false);setIsPeopleUpdate(false)}}>Hozzáadás</Button>
                    <Button variant="contained" color="error" onClick={e=>{setIsPeopleAdding(false);setIsPeopleRemove(true);setIsPeopleUpdate(false)}}>Törlés</Button>
                    <Button variant="contained" color="warning" onClick={e=>{setIsPeopleAdding(false);setIsPeopleRemove(false);setIsPeopleUpdate(true)}}>Modosítás</Button>
                </Grid>

                {
                    isPeopleAdding && <div style={{margin: "20px 0"}}>
                        <Grid container direction="column" alignItems="center" justifyContent="center" gap={2}>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="text" onChange={e=>newPerson.name=e.target.value} label="Vendég neve" variant="outlined" />
                            </Grid>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="number" onChange={e=>newPerson.age=parseInt(""+e.target.value)} label="Vendég életkora" variant="outlined" />
                            </Grid>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="number" onChange={e=>newPerson.ticket_id=parseInt(""+e.target.value)} label="Jegy azonosító" variant="outlined" />
                            </Grid>

                            <Grid item sx={{width: "100%"}}>
                                <Button variant="contained" color="success" onClick={() => handlePeopleCreation()}>Létrehozás</Button>
                            </Grid>
                        </Grid>

                    </div>
                }
                {
                    isPeopleRemove && <div style={{margin: "20px 0"}}>
                        <Grid container direction="column" alignItems="center" justifyContent="center" gap={2}>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="text" onChange={e=>newPerson.id=parseInt(""+e.target.value)} label="Azonosító" variant="outlined" />
                            </Grid>

                            <Grid item sx={{width: "100%"}}>
                                <Button variant="contained" color="error" onClick={() => handlePeopleDeletion()}>Törlés</Button>
                            </Grid>
                        </Grid>

                    </div>
                }
                {
                    isPeopleUpdate && <div style={{margin: "20px 0"}}>
                        <Grid container direction="column" alignItems="center" justifyContent="center" gap={2}>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="text" onChange={e=>newPerson.id=parseInt(""+e.target.value)} label="Azonosító" variant="outlined" />
                            </Grid>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="text" onChange={e=>newPerson.name=e.target.value} label="Vendég neve" variant="outlined" />
                            </Grid>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="number" onChange={e=>newPerson.age=parseInt(""+e.target.value)} label="Vendég életkora" variant="outlined" />
                            </Grid>
                            <Grid item sx={{width: "100%"}}>
                                <TextField fullWidth id="outlined-basic" type="number" onChange={e=>newPerson.ticket_id=parseInt(""+e.target.value)} label="Jegy azonosító" variant="outlined" />
                            </Grid>

                            <Grid item sx={{width: "100%"}}>
                                <Button variant="contained" color="success" onClick={() => handlePeopleUpdate()}>Modosítás</Button>
                            </Grid>
                        </Grid>

                    </div>
                }
            </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6} >
                {
                    !isLoading && <DataGrid
                        sx={{ height: 800, width: '100%' }}
                        rows={tickets}
                        columns={ticketColumns}
                        pageSize={30}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                }
            </Grid>
            <Grid item xs={6} >
                {
                    !isLoading && <DataGrid
                        sx={{ height: 800, width: '100%' }}
                        rows={people}
                        columns={peopleColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                }
            </Grid>
        </Grid>
    </div>);
}

export default App;
