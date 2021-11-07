import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { fetchMovies, Status } from "./homepageSlice";
import { TextField, Autocomplete, Button, ListItem, Typography } from '@mui/material';

export const Homepage = () => {

  const dispatch = useAppDispatch()

  const movies = useAppSelector(state => state.homepage.results)
  const status = useAppSelector((state) => state.homepage.status)
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div style={{ position: 'relative' }}>
      <Typography variant='h2'>
        Search for a movie!
      </Typography>
      <Autocomplete
        sx={{
          width: "50vw"
        }}
        freeSolo
        loading={status === Status.loading}
        options={movies}
        getOptionLabel={(option) => option.title}
        renderOption={
          (props, option) =>
            <ListItem key={option.id} {...props}>
              <Button style={{ justifyContent: "flex-start" }} fullWidth={true} href={`/movie/${option.id}`}>{option.title} ({option.release_date.slice(0, 4)})</Button>
            </ListItem>
        }
        inputValue={searchTerm}
        onInputChange={(_, event) => {
          setSearchTerm(event)
          dispatch(fetchMovies(event))
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </div>
  );
}