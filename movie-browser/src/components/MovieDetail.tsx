import { useParams } from 'react-router-dom';
import { generatePosterUrl } from '../api/client';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { fetchMovie, Status } from './movieDetailSlice';
import { Grid, Paper, Box, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

type MovieDetailParams = {
  id: string;
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.primary,
}));

export const MovieDetail = () => {

  const { id } = useParams<MovieDetailParams>();

  const dispatch = useAppDispatch()

  const movie = useAppSelector(state => state.movieDetail.movie)
  const mainStatus = useAppSelector((state) => state.movieDetail.mainStatus)
  const error = useAppSelector((state) => state.movieDetail.error)

  if (error === null && movie === null) {
    dispatch(fetchMovie(id))
    return (<CircularProgress />)
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '60vw', maxHeight: '90vh' }}>
      <Grid container spacing={10} justifyContent="flex-start" alignItems="flex-start">
        <Grid container item spacing={10} xs={6}>
          <Grid item xs={12}>
            <Item>{mainStatus === Status.done
              ?
              <>
                <Typography variant='h2'>
                  {movie?.title}
                </Typography>
                <Typography variant='subtitle2'>
                  Description
                </Typography>
                <Typography>
                  {movie?.overview}
                </Typography>
              </>
              : <CircularProgress />
            }</Item>
          </Grid>
          <Grid item xs={12}>
            <Item>{mainStatus === Status.done
              ?
              <>
                <Typography variant='h3'>
                  Details
                </Typography>
                <Typography variant='subtitle2'>
                  Release Date
                </Typography>
                <Typography>
                  {movie?.release_date}
                </Typography>
                <Typography variant='subtitle2'>
                  Average vote:
                </Typography>
                <Typography>
                  {movie?.vote_average}/10 ({movie?.vote_count} votes)
                </Typography>
              </>
              : <CircularProgress />
            }</Item>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Item>{mainStatus === Status.done
            ?
            <img
              src={generatePosterUrl(movie?.poster_path || '')}
              alt="Movie Poster"
              style={{
                margin: 'auto',
                display: 'flex',
                maxWidth: '100%',
                height: 'auto'
              }} />
            : <CircularProgress />
          }</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
